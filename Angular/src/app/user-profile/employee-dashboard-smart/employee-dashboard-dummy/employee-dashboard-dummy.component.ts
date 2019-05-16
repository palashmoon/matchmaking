import { BasicInfoComponent } from './../../../info/basic-info/basic-info.component';
import { BasicInfoService } from './../../../info/basic-info.service';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { EducationChicklets } from 'src/app/add-module/education-dialog/domain/educationchicklets';
import { EducationSection } from 'src/app/add-module/education-dialog/domain/educationsection';
import { DownstreamBackendService } from '../../downstream-backend.service';
import { SkillChicklets } from 'src/app/add-module/skill-dialog/domain/skillchicklets';
import { SkillSection } from 'src/app/add-module/skill-dialog/domain/skillsection';
import { ProjectChicklets } from 'src/app/add-module/project-dialog/domain/projectchicklets';
import { ProjectSection } from 'src/app/add-module/project-dialog/domain/projectsection';
import { CertificateChicklets } from 'src/app/add-module/certificate-dialog/domain/certificatechicklets';
import { CertificateSection } from 'src/app/add-module/certificate-dialog/domain/certificatesection';
import { ExperienceSection } from 'src/app/add-module/experience-dialog/domain/section';
import { Qualification } from 'src/app/add-module/education-dialog/domain/qualification';
import { Institution } from 'src/app/add-module/education-dialog/domain/institution';
import { Chicklets } from 'src/app/add-module/experience-dialog/domain/chicklets';
import { LocationChicklets } from 'src/app/add-module/location-dialog/domain/chicklets';
import { CurrentLocation } from 'src/app/add-module/location-dialog/domain/currentlocation';
import { LocationSection } from 'src/app/add-module/location-dialog/domain/section';
import { PastLocation } from 'src/app/add-module/location-dialog/domain/pastlocation';
import {MatDialogConfig} from '@angular/material/dialog';
import { RefreshService } from 'src/app/add-module/service/refresh.service';
import { MatDialog } from '@angular/material/dialog';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ResumeComponent } from '../resume/resume.component';
import { EditSkillDialogComponent } from 'src/app/add-module/edit-skill-dialog/edit-skill-dialog.component';
import { SharedService } from 'src/app/add-module/service/shared.service';
import { EditEducationDialogComponent } from 'src/app/add-module/edit-education-dialog/edit-education-dialog.component';
import { EditExperienceDialogComponent } from 'src/app/add-module/edit-experience-dialog/edit-experience-dialog.component';
import { EditLocationDialogComponent } from 'src/app/add-module/edit-location-dialog/edit-location-dialog.component';
import { EditProjectDialogComponent } from 'src/app/add-module/edit-project-dialog/edit-project-dialog.component';
import { EditCertificateDialogComponent } from 'src/app/add-module/edit-certificate-dialog/edit-certificate-dialog.component';


@Component({
  selector: 'app-employee-dashboard-dummy',
  templateUrl: './employee-dashboard-dummy.component.html',
  styleUrls: ['./employee-dashboard-dummy.component.css']
})
export class EmployeeDashboardDummyComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */

  cards;
  keys;
  basicLength = 0;
  temp1 = 100 / 8;
  temp = 0;
  isLoggedIn = false;
  basicInfo;
  isPhotoSelected: Boolean = false;
  receivedFile: string;
  educationLength: number;
  public isCollapsed = false;
  constructor(private breakpointObserver: BreakpointObserver,
              private tokenstorageservice: TokenStorageService,
              private downstreamBackendService: DownstreamBackendService,
              private refreshService: RefreshService,
              private uploadService: BasicInfoService,
              private shared: SharedService,
              public dialog: MatDialog) {}


  ngOnInit() {
    if (this.tokenstorageservice.getToken()) {
      this.isLoggedIn = true;
    }
    this.refreshService.refresh.subscribe(result => {
      if (result) {
        this.refresh();
      }
    });

    //   this.uploadService.fileExists(this.tokenstorageservice.getEmail()).subscribe(data => {
    //     this.isPhotoSelected = data;
    //   });

    //   this.uploadService.downloadFile(this.tokenstorageservice.getEmail()).subscribe(data => {
    //     let binary = '';
    // const bytes = new Uint8Array( data );
    // const len = bytes.byteLength;
    // for (let i = 0; i < len; i++) {
    //     binary += String.fromCharCode( bytes[ i ] );
    // this.receivedFile = window.btoa(binary);
    // }
    //   });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BasicInfoComponent, {
      width: '590px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.uploadService
        .fileExists(this.tokenstorageservice.getEmail())
        .subscribe(data => {
          this.isPhotoSelected = data;
        });

      this.uploadService
        .downloadFile(this.tokenstorageservice.getEmail())
        .subscribe(data => {
          let binary = '';
          const bytes = new Uint8Array(data);
          const len = bytes.byteLength;
          for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          this.receivedFile = window.btoa(binary);
        });
    });
  }
  refresh() {
    console.log(`refreshed`);
    this.downstreamBackendService
      .getEmployee(this.tokenstorageservice.getEmail())
      .subscribe(data => {
        this.setEmployees(data);
      });
  }
  setEmployees(employees: any) {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        const cards = [];
        let educationInfo;
        let skillsInfo;
        let projectInfo;
        let locationInfo;
        let certificateInfo;
        let experienceInfo;
        let i = 0;
        console.log(employees);

        this.basicInfo = {
          title: 'Basic Information',
          contents: {
            employeeName: employees.name,
            email: employees.email
          }
        };
        this.basicLength = 1;

        if (employees.educations != null && employees.educations.length !== 0) {
          let j = 0;
          educationInfo = {
            title: 'Education',
            contents: []
          };
          const contents = [];
          console.log('education out: ' + employees.educations);
          for (const education of employees.educations) {
            contents[j] = {
              qualification: education.qualification.title,
              summary: education.summary,
              institution: education.institution.institutionName,
              institutionId: education.institution.institutionId,
              startDate: education.institution.startDate,
              endDate: education.institution.endDate,
              id: education.qualification.qualificationId
            };

            j++;
          }
          educationInfo.contents = contents;
          cards[i] = educationInfo;
          i++;
        }

        if (employees.skills != null && employees.skills.length !== 0) {
          let j = 0;
          skillsInfo = {
            title: 'Skills',
            contents: []
          };
          const contents = [];
          for (const skill of employees.skills) {
            contents[j] = {
              skillName: skill.skillName,
              skillLevel: skill.skillLevel,
              skill: skill
            };

            j++;
          }
          skillsInfo.contents = contents;
          cards[i] = skillsInfo;
          i++;
        }
        if (employees.projects != null && employees.projects.length !== 0) {
          let j = 0;
          projectInfo = {
            title: 'Project',
            contents: []
          };
          const contents = [];
          for (const projects of employees.projects) {
            contents[j] = {
              title: projects.title,
              fromDate: projects.fromDate,
              toDate: projects.toDate,
              projectUrl: projects.projectUrl,
              role: projects.role,
              technologiesUsed: projects.technologiesUsed,
              description: projects.description,
              project: projects
            };

            j++;
          }
          projectInfo.contents = contents;
          cards[i] = projectInfo;
          i++;
        }
        if (employees.location != null && employees.location.currentLocation != null && employees.location.length !== 0) {
          const j = 0;
          console.log('data %o', employees.location);
          locationInfo = {
            title: 'Location',
            contents: [
              {
                currentLocationId:
                  employees.location.currentLocation.currentLocationId,
                currentCityName: employees.location.currentLocation.cityName,
                currentStateName: employees.location.currentLocation.stateName,
                currentPinCode: employees.location.currentLocation.pinCode,
                pastLocation: employees.location.pastLocation
              }
            ]
          };
          cards[i] = locationInfo;
          i++;
        }
        if (
          employees.certificates != null &&
          employees.certificates.length !== 0
        ) {
          let j = 0;
          certificateInfo = {
            title: 'Certificate',
            contents: []
          };
          const contents = [];
          for (const certificates of employees.certificates) {
            contents[j] = {
              certificateName: certificates.certificateName,
              certificateAuthority: certificates.certificateAuthority,
              licenseNumber: certificates.licenseNumber,
              fromDate: certificates.fromDate,
              toDate: certificates.toDate,
              certificate: certificates
            };

            j++;
          }
          certificateInfo.contents = contents;
          cards[i] = certificateInfo;
          i++;
          console.log(cards[i]);
        }
        if (
          employees.experiences != null &&
          employees.experiences.length !== 0
        ) {
          let j = 0;
          experienceInfo = {
            title: 'Experience',
            contents: []
          };
          const contents = [];
          for (const experiences of employees.experiences) {
            contents[j] = {
              organisation: experiences.organisation,
              role: experiences.role,
              fromDate: experiences.fromDate,
              toDate: experiences.toDate,
              fromMonth: experiences.fromMonth,
              toMonth: experiences.toMonth,
              fromYear: experiences.fromYear,
              toYear: experiences.toYear,
              experience: experiences
            };

            j++;
          }
          experienceInfo.contents = contents;
          cards[i] = experienceInfo;
          i++;
          console.log(cards[i]);
        }
        // if(this.temp==0)
        // this.temp=this.temp1;
        // else
        this.temp = ((i + 1) * 100) / 8;

        if (matches) {
          for (const index in cards) {
            if (cards[index].title === 'Education') {
              const educ = cards[index].contents;
              let count = 0;
              // tslint:disable-next-line:forin
              for (const x in educ) {
                if (educ[x].qualification != null) {
                  count++;
                }
                if (educ[x].institution != null) {
                  count++;
                }
                if (educ[x].startDate != null && educ[x].endDate != null) {
                  count++;
                }
              }
              cards[index].rows = 4 + count;
              cards[index].cols = 2;
            } else if (cards[index].title === 'Skills') {
              const skillArr = cards[index].contents;
              let count = 0;
              // tslint:disable-next-line:forin
              for (const x in skillArr) {
                if (skillArr[x].skillName != null) {
                  count++;
                }
                if (skillArr[x].skillLevel != null) {
                  count++;
                }
              }
              cards[index].rows = 4 + count;
              cards[index].cols = 2;
            } else if (cards[index].title === 'Project') {
              const projectArr = cards[index].contents;
              let count = 0;
              // tslint:disable-next-line:forin
              for (const x in projectArr) {
                if (projectArr[x].title != null) {
                  count++;
                }
                if (projectArr[x].role != null) {
                  count++;
                }
                if (projectArr[x].projectUrl != null) {
                  count++;
                }
                if (projectArr[x].description != null) {
                  count = count + 3;
                }
                if (
                  projectArr[x].fromDate != null ||
                  projectArr[x].toDate != null
                ) {
                  count++;
                }
              }
              cards[index].rows = 4 + count;
              cards[index].cols = 2;
            } else if (cards[index].title === 'Certificate') {
              const certificateArr = cards[index].contents;
              let count = 0;
              // tslint:disable-next-line:forin
              for (const x in certificateArr) {
                if (certificateArr[x].certificateName != null) {
                  count++;
                }
                if (certificateArr[x].certificateAuthority != null) {
                  count++;
                }
                if (certificateArr[x].licenseNumber != null) {
                  count++;
                }
                if (certificateArr[x].fromDate != null) {
                  count++;
                }
              }
              cards[index].rows = 3 + count;
              cards[index].cols = 2;
            } else if (cards[index].title === 'Location') {
              const locationArr = cards[index].contents;
              let count = 0;
              // tslint:disable-next-line:forin
              for (const x in locationArr) {
                if (locationArr[x].currentCityName != null) {
                  count++;
                }
                if (locationArr[x].currentStateName != null) {
                  count++;
                }
                if (locationArr[x].pastLocation != null) {
                  count = count + locationArr[x].pastLocation.length;
                }
              }
              cards[index].rows = 4 + count;
              cards[index].cols = 2;
            } else if (cards[index].title === 'Experience') {
              const experienceArr = cards[index].contents;
              let count = 0;
              // tslint:disable-next-line:forin
              for (const x in experienceArr) {
                if (experienceArr[x].organisation != null) {
                  count++;
                }
                if (experienceArr[x].role != null) {
                  count++;
                }
                if (experienceArr[x].fromDate != null) {
                  count++;
                }
              }
              cards[index].rows = 4 + count;
              cards[index].cols = 2;
            }
          }
          return cards;
        }

        for (const index in cards) {
          if (cards[index].title === 'Education') {
            const educ = cards[index].contents;
            let count = 0;
            // tslint:disable-next-line:forin
            for (const x in educ) {
              if (educ[x].qualification != null) {
                count++;
              }
              if (educ[x].institution != null) {
                count++;
              }
              if (educ[x].startDate != null && educ[x].endDate != null) {
                count++;
              }
            }
            cards[index].rows = 4 + count;
            cards[index].cols = 1;
          } else if (cards[index].title === 'Skills') {
            const skillArr = cards[index].contents;
            let count = 0;
            // tslint:disable-next-line:forin
            for (const x in skillArr) {
              if (skillArr[x].skillName != null) {
                count++;
              }
              if (skillArr[x].skillLevel != null) {
                count++;
              }
            }
            cards[index].rows = 5 + count;
            cards[index].cols = 1;
          } else if (cards[index].title === 'Project') {
            const projectArr = cards[index].contents;
            let count = 0;
            // tslint:disable-next-line:forin
            for (const x in projectArr) {
              if (projectArr[x].title != null) {
                count++;
              }
              if (projectArr[x].role != null) {
                count++;
              }
              if (projectArr[x].projectUrl != null) {
                count++;
              }
              if (projectArr[x].description != null) {
                count = count + 2;
              }
              if (
                projectArr[x].fromDate != null ||
                projectArr[x].toDate != null
              ) {
                count++;
              }
            }
            cards[index].rows = 4 + count;
            cards[index].cols = 1;
          } else if (cards[index].title === 'Certificate') {
            const certificateArr = cards[index].contents;
            let count = 0;
            // tslint:disable-next-line:forin
            for (const x in certificateArr) {
              if (certificateArr[x].certificateName != null) {
                count++;
              }
              if (certificateArr[x].certificateAuthority != null) {
                count++;
              }
              if (certificateArr[x].licenseNumber != null) {
                count++;
              }
              if (certificateArr[x].fromDate != null) {
                count++;
              }
            }
            cards[index].rows = 3 + count;
            cards[index].cols = 1;
          } else if (cards[index].title === 'Location') {
            const locationArr = cards[index].contents;
            let count = 0;
            // tslint:disable-next-line:forin
            for (const x in locationArr) {
              if (locationArr[x].currentCityName != null) {
                count++;
              }
              if (locationArr[x].currentStateName != null) {
                count++;
              }
              if (locationArr[x].pastLocation != null) {
                count = count + locationArr[x].pastLocation.length;
              }
            }
            cards[index].rows = 4 + count;
            cards[index].cols = 1;
          } else if (cards[index].title === 'Experience') {
            const experienceArr = cards[index].contents;
            let count = 0;
            // tslint:disable-next-line:forin
            for (const x in experienceArr) {
              if (experienceArr[x].organisation != null) {
                count++;
              }
              if (experienceArr[x].role != null) {
                count++;
              }
              if (experienceArr[x].fromDate != null) {
                count++;
              }
            }
            cards[index].rows = 4 + count;
            cards[index].cols = 1;
          }
        }
        return cards;
      })
    );
  }

  hasProp(o, name) {
    return o.hasOwnProperty(name);
  }

  isTitle(title, check) {
    return title === check;
  }

  logout() {
    this.tokenstorageservice.signOut();
    window.location.reload();
  }

  onDelete(content, title) {
    if (title === 'Education') {
      const qualification = new Qualification(
        content.id,
        content.qualification
      );
      const institution = new Institution(
        content.institutionId,
        content.institution,
        content.startDate,
        content.endDate
      );
      const educationChicklets = new EducationChicklets(
        qualification,
        institution,
        content.summary
      );
      const chicklets = new Array<EducationChicklets>();
      chicklets.push(educationChicklets);
      const educationSection = new EducationSection(
        'Education',
        this.tokenstorageservice.getEmail(),
        'delete',
        chicklets
      );
      console.log(educationSection);
      this.downstreamBackendService
        .deleteEducationDetails(educationSection)
        .subscribe(data => {
          console.log(data);
          this.refresh();
        });
    } else if (title === 'Skills') {
      const skillChicklet = new SkillChicklets(content.skill);
      const chicklets = [skillChicklet];
      const skillSection = new SkillSection(
        'Skills',
        this.tokenstorageservice.getEmail(),
        'delete',
        chicklets
      );
      this.downstreamBackendService
        .deleteSkillsDetails(skillSection)
        .subscribe(data => {
          console.log(data);
          this.refresh();
        });
    } else if (title === 'Project') {
      const projectChicklet = new ProjectChicklets(content.project);
      const chicklets = [projectChicklet];
      console.log('delete project %o', chicklets);
      const projectSection = new ProjectSection(
        'Project',
        this.tokenstorageservice.getEmail(),
        'delete',
        chicklets
      );

      this.downstreamBackendService
        .deleteProjectDetails(projectSection)
        .subscribe(data => {
          console.log(data);
          this.refresh();
        });
    } else if (title === 'Certificate') {
      const certificateChicklet = new CertificateChicklets(content.certificate);
      const chicklets = [certificateChicklet];
      const certificateSection = new CertificateSection(
        'Certificate',
        this.tokenstorageservice.getEmail(),
        'delete',
        chicklets
      );
      this.downstreamBackendService
        .deleteCerificateDetails(certificateSection)
        .subscribe(data => {
          console.log(data);
          this.refresh();
        });
    } else if (title === 'Experience') {
      const experienceChicklet = new Chicklets(content.experience);
      const chicklets = Array<Chicklets>();
      chicklets.push(experienceChicklet);

      const experienceSection = new ExperienceSection(
        'Experience',
        this.tokenstorageservice.getEmail(),
        'delete',
        chicklets
      );
      this.downstreamBackendService
        .deleteExperienceDetails(experienceSection)
        .subscribe(data => {
          console.log(data);
          this.refresh();
        });
    }
  }

  onDeleteCurrentLocation(content) {
    const currentLocation = new CurrentLocation(
      content.currentLocationId,
      content.currentCityName,
      content.currentStateName,
      content.currentPinCode
    );
    console.log('current location %o',content);
    const locationChicklet = new LocationChicklets(currentLocation, null);
    const chicklets = Array<LocationChicklets>();
    chicklets.push(locationChicklet);

    const locationSection = new LocationSection(
      'Location',
      this.tokenstorageservice.getEmail(),
      'delete',
      chicklets
    );
    // this.downstreamBackendService
    //   .deleteLocationDetails(locationSection)
    //   .subscribe(data => {
    //     console.log(data);
    //     this.refresh();
    //   });
  }

  onDeletePastLocation(pastLocation) {
    const deleteLocation = Array<PastLocation>();
    const locationData = new PastLocation(
      pastLocation.pastLocationId,
      pastLocation.cityName,
      pastLocation.stateName,
      pastLocation.pinCode
    );
    deleteLocation.push(locationData);
    const locationChicklet = new LocationChicklets(null, deleteLocation);
    const chicklets = Array<LocationChicklets>();
    chicklets.push(locationChicklet);

    const locationSection = new LocationSection(
      'Location',
      this.tokenstorageservice.getEmail(),
      'delete',
      chicklets
    );
    this.downstreamBackendService
      .deleteLocationDetails(locationSection)
      .subscribe(data => {
        console.log(data);
        this.refresh();
      });
  }

  view() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    this.dialog.open(PortfolioComponent, dialogConfig);
  }

  resume() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.height = '70%';
    this.dialog.open(ResumeComponent, dialogConfig);
  }

  editskilldialog(content) {
    const dialogConfig = new MatDialogConfig();
    console.log('sending data ..', content);
    this.shared.subject.next(content);
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    this.dialog.open(EditSkillDialogComponent, dialogConfig);
  }

  editeducationdialog(content) {
    const dialogConfig = new MatDialogConfig();
    this.shared.subject.next(content);
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    this.dialog.open(EditEducationDialogComponent, dialogConfig);
  }

  editexperiencedialog(content) {
    const dialogConfig = new MatDialogConfig();
    this.shared.subject.next(content);
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    this.dialog.open(EditExperienceDialogComponent, dialogConfig);
  }

  editlocationdialog(content) {
    const dialogConfig = new MatDialogConfig();
    this.shared.subject.next(content);
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    this.dialog.open(EditLocationDialogComponent, dialogConfig);
  }

  editprojectdialog(content) {
    const dialogConfig = new MatDialogConfig();
    this.shared.subject.next(content);
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    this.dialog.open(EditProjectDialogComponent, dialogConfig);
  }

  editcertificatedialog(content) {
    const dialogConfig = new MatDialogConfig();
    this.shared.subject.next(content);
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    this.dialog.open(EditCertificateDialogComponent, dialogConfig);
  }
}
