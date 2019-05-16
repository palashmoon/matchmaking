var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
import { EditSkillDialogComponent } from 'src/app/add-module/edit-skill-dialog/edit-skill-dialog.component';
import { DownstreamService } from 'src/app/add-module/service/downstream.service';
var EmployeeDashboardDummyComponent = /** @class */ (function () {
    function EmployeeDashboardDummyComponent(breakpointObserver, dialog, downstream, tokenstorageservice, downstreamBackendService) {
        this.breakpointObserver = breakpointObserver;
        this.dialog = dialog;
        this.downstream = downstream;
        this.tokenstorageservice = tokenstorageservice;
        this.downstreamBackendService = downstreamBackendService;
        this.basicLength = 0;
        this.temp1 = 100 / 8;
        this.temp = 0;
        this.isLoggedIn = false;
        this.isCollapsed = false;
    }
    EmployeeDashboardDummyComponent.prototype.ngOnInit = function () {
        if (this.tokenstorageservice.getToken()) {
            this.isLoggedIn = true;
        }
    };
    EmployeeDashboardDummyComponent.prototype.setEmployees = function (employees) {
        var _this = this;
        this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(function (_a) {
            var matches = _a.matches;
            var cards = [];
            var educationInfo;
            var skillsInfo;
            var projectInfo;
            var locationInfo;
            var certificateInfo;
            var experienceInfo;
            var i = 0;
            console.log(employees);
            _this.basicInfo = { 'title': 'Basic Information', 'contents': {
                    'employeeName': employees.name,
                    'email': employees.email
                } };
            _this.basicLength = 1;
            if (employees.educations != null && employees.educations.length !== 0) {
                var j = 0;
                educationInfo = {
                    'title': 'Education',
                    'contents': []
                };
                var contents = [];
                for (var _i = 0, _b = employees.educations; _i < _b.length; _i++) {
                    var education = _b[_i];
                    contents[j] = {
                        'qualification': education.qualification.title,
                        'summary': education.summary,
                        'institution': education.institution.institutionName,
                        'institutionId': education.institution.institutionId,
                        'startDate': education.institution.startDate,
                        'endDate': education.institution.endDate,
                        'id': education.qualification.qualificationId
                    };
                    j++;
                }
                educationInfo.contents = contents;
                cards[i] = educationInfo;
                i++;
            }
            if (employees.skills != null && employees.skills.length !== 0) {
                var j = 0;
                skillsInfo = {
                    'title': 'Skills',
                    'contents': []
                };
                var contents = [];
                for (var _c = 0, _d = employees.skills; _c < _d.length; _c++) {
                    var skill = _d[_c];
                    contents[j] = {
                        'skillName': skill.skillName,
                        'skillLevel': skill.skillLevel,
                        'skill': skill
                    };
                    j++;
                }
                skillsInfo.contents = contents;
                cards[i] = skillsInfo;
                i++;
            }
            if (employees.projects != null && employees.projects.length !== 0) {
                var j = 0;
                projectInfo = {
                    'title': 'Project',
                    'contents': []
                };
                var contents = [];
                for (var _e = 0, _f = employees.projects; _e < _f.length; _e++) {
                    var projects = _f[_e];
                    contents[j] = {
                        'title': projects.title,
                        'fromDate': projects.fromDate,
                        'toDate': projects.toDate,
                        'projectUrl': projects.projectUrl,
                        'role': projects.role,
                        'technologiesUsed': projects.technologiesUsed,
                        'description': projects.description,
                        'project': projects
                    };
                    j++;
                }
                projectInfo.contents = contents;
                cards[i] = projectInfo;
                i++;
            }
            if (employees.location != null && employees.location.length !== 0) {
                var j = 0;
                locationInfo = {
                    'title': 'Location',
                    'contents': [{
                            'currentLocationId': employees.location.currentLocation.currentLocationId,
                            'currentCityName': employees.location.currentLocation.cityName,
                            'currentStateName': employees.location.currentLocation.stateName,
                            'currentPinCode': employees.location.currentLocation.pinCode,
                            'pastLocation': employees.location.pastLocation
                        }]
                };
                cards[i] = locationInfo;
                i++;
            }
            if (employees.certificates != null && employees.certificates.length !== 0) {
                var j = 0;
                certificateInfo = {
                    'title': 'Certificate',
                    'contents': []
                };
                var contents = [];
                for (var _g = 0, _h = employees.certificates; _g < _h.length; _g++) {
                    var certificates = _h[_g];
                    contents[j] = {
                        'certificateName': certificates.certificateName,
                        'certificateAuthority': certificates.certificateAuthority,
                        'licenseNumber': certificates.licenseNumber,
                        'fromDate': certificates.fromDate,
                        'toDate': certificates.toDate,
                        'certificate': certificates
                    };
                    j++;
                }
                certificateInfo.contents = contents;
                cards[i] = certificateInfo;
                i++;
                console.log(cards[i]);
            }
            if (employees.experiences != null && employees.experiences.length !== 0) {
                var j = 0;
                experienceInfo = {
                    'title': 'Experience',
                    'contents': []
                };
                var contents = [];
                for (var _j = 0, _k = employees.experiences; _j < _k.length; _j++) {
                    var experiences = _k[_j];
                    contents[j] = {
                        'organisation': experiences.organisation,
                        'role': experiences.role,
                        'fromDate': experiences.fromDate,
                        'toDate': experiences.toDate,
                        'fromMonth': experiences.fromMonth,
                        'toMonth': experiences.toMonth,
                        'fromYear': experiences.fromYear,
                        'toYear': experiences.toYear,
                        'experience': experiences
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
            _this.temp = ((i + 1) * 100 / 8);
            if (matches) {
                for (var index in cards) {
                    if (cards[index].title === 'Education') {
                        var educ = cards[index].contents;
                        var count = 0;
                        // tslint:disable-next-line:forin
                        for (var x in educ) {
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
                    }
                    else if (cards[index].title === 'Skills') {
                        var skillArr = cards[index].contents;
                        var count = 0;
                        // tslint:disable-next-line:forin
                        for (var x in skillArr) {
                            if (skillArr[x].skillName != null) {
                                count++;
                            }
                            if (skillArr[x].skillLevel != null) {
                                count++;
                            }
                        }
                        cards[index].rows = 4 + count;
                        cards[index].cols = 2;
                    }
                    else if (cards[index].title === 'Project') {
                        var projectArr = cards[index].contents;
                        var count = 0;
                        // tslint:disable-next-line:forin
                        for (var x in projectArr) {
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
                            if (projectArr[x].fromDate != null || projectArr[x].toDate != null) {
                                count++;
                            }
                        }
                        cards[index].rows = 4 + count;
                        cards[index].cols = 2;
                    }
                    else if (cards[index].title === 'Certificate') {
                        var certificateArr = cards[index].contents;
                        var count = 0;
                        // tslint:disable-next-line:forin
                        for (var x in certificateArr) {
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
                    }
                    else if (cards[index].title === 'Location') {
                        var locationArr = cards[index].contents;
                        var count = 0;
                        // tslint:disable-next-line:forin
                        for (var x in locationArr) {
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
                    }
                    else if (cards[index].title === 'Experience') {
                        var experienceArr = cards[index].contents;
                        var count = 0;
                        // tslint:disable-next-line:forin
                        for (var x in experienceArr) {
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
            for (var index in cards) {
                if (cards[index].title === 'Education') {
                    var educ = cards[index].contents;
                    var count = 0;
                    // tslint:disable-next-line:forin
                    for (var x in educ) {
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
                }
                else if (cards[index].title === 'Skills') {
                    var skillArr = cards[index].contents;
                    var count = 0;
                    // tslint:disable-next-line:forin
                    for (var x in skillArr) {
                        if (skillArr[x].skillName != null) {
                            count++;
                        }
                        if (skillArr[x].skillLevel != null) {
                            count++;
                        }
                    }
                    cards[index].rows = 4 + count;
                    cards[index].cols = 1;
                }
                else if (cards[index].title === 'Project') {
                    var projectArr = cards[index].contents;
                    var count = 0;
                    // tslint:disable-next-line:forin
                    for (var x in projectArr) {
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
                        if (projectArr[x].fromDate != null || projectArr[x].toDate != null) {
                            count++;
                        }
                    }
                    cards[index].rows = 4 + count;
                    cards[index].cols = 1;
                }
                else if (cards[index].title === 'Certificate') {
                    var certificateArr = cards[index].contents;
                    var count = 0;
                    // tslint:disable-next-line:forin
                    for (var x in certificateArr) {
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
                }
                else if (cards[index].title === 'Location') {
                    var locationArr = cards[index].contents;
                    var count = 0;
                    // tslint:disable-next-line:forin
                    for (var x in locationArr) {
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
                }
                else if (cards[index].title === 'Experience') {
                    var experienceArr = cards[index].contents;
                    var count = 0;
                    // tslint:disable-next-line:forin
                    for (var x in experienceArr) {
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
        }));
    };
    EmployeeDashboardDummyComponent.prototype.hasProp = function (o, name) {
        return o.hasOwnProperty(name);
    };
    EmployeeDashboardDummyComponent.prototype.isTitle = function (title, check) {
        return title === check;
    };
    EmployeeDashboardDummyComponent.prototype.logout = function () {
        this.tokenstorageservice.signOut();
        window.location.reload();
    };
    EmployeeDashboardDummyComponent.prototype.onDelete = function (content, title) {
        if (title === 'Education') {
            var qualification = new Qualification(content.id, content.qualification);
            var institution = new Institution(content.institutionId, content.institution, content.startDate, content.endDate);
            var educationChicklets = new EducationChicklets(qualification, institution, content.summary);
            var chicklets = new Array();
            chicklets.push(educationChicklets);
            var educationSection = new EducationSection('Education', this.tokenstorageservice.getEmail(), 'delete', chicklets);
            console.log(educationSection);
            this.downstreamBackendService.deleteEducationDetails(educationSection)
                .subscribe(function (data) {
                console.log(data);
                location.reload();
            });
        }
        else if (title === 'Skills') {
            var skillChicklet = new SkillChicklets(content.skill);
            var chicklets = [skillChicklet];
            var skillSection = new SkillSection('Skills', this.tokenstorageservice.getEmail(), 'delete', chicklets);
            this.downstreamBackendService.deleteSkillsDetails(skillSection)
                .subscribe(function (data) {
                console.log(data);
                location.reload();
            });
        }
        else if (title === 'Project') {
            var projectChicklet = new ProjectChicklets(content.project);
            var chicklets = [projectChicklet];
            var projectSection = new ProjectSection('Project', this.tokenstorageservice.getEmail(), 'delete', chicklets);
            this.downstreamBackendService.deleteProjectDetails(projectSection)
                .subscribe(function (data) {
                console.log(data);
                location.reload();
            });
        }
        else if (title === 'Certificate') {
            var certificateChicklet = new CertificateChicklets(content.certificate);
            var chicklets = [certificateChicklet];
            var certificateSection = new CertificateSection('Certificate', this.tokenstorageservice.getEmail(), 'delete', chicklets);
            this.downstreamBackendService.deleteCerificateDetails(certificateSection)
                .subscribe(function (data) {
                console.log(data);
                location.reload();
            });
        }
        else if (title === 'Experience') {
            var experienceChicklet = new Chicklets(content.experience);
            var chicklets = Array();
            chicklets.push(experienceChicklet);
            var experienceSection = new ExperienceSection('Experience', this.tokenstorageservice.getEmail(), 'delete', chicklets);
            this.downstreamBackendService.deleteExperienceDetails(experienceSection)
                .subscribe(function (data) {
                console.log(data);
                location.reload();
            });
        }
    };
    EmployeeDashboardDummyComponent.prototype.onDeleteCurrentLocation = function (content) {
        var currentLocation = new CurrentLocation(content.currentLocationId, content.currentcontent.currentCityName, content.currentStateName, content.currentPinCode);
        var locationChicklet = new LocationChicklets(currentLocation, null);
        var chicklets = Array();
        chicklets.push(locationChicklet);
        var locationSection = new LocationSection('Location', this.tokenstorageservice.getEmail(), 'delete', chicklets);
        this.downstreamBackendService.deleteLocationDetails(locationSection)
            .subscribe(function (data) {
            console.log(data);
            location.reload();
        });
    };
    EmployeeDashboardDummyComponent.prototype.onDeletePastLocation = function (pastLocation) {
        var deleteLocation = Array();
        var locationData = new PastLocation(pastLocation.pastLocationId, pastLocation.cityName, pastLocation.stateName, pastLocation.pinCode);
        deleteLocation.push(locationData);
        var locationChicklet = new LocationChicklets(null, deleteLocation);
        var chicklets = Array();
        chicklets.push(locationChicklet);
        var locationSection = new LocationSection('Location', this.tokenstorageservice.getEmail(), 'delete', chicklets);
        this.downstreamBackendService.deleteLocationDetails(locationSection)
            .subscribe(function (data) {
            console.log(data);
            location.reload();
        });
    };
    EmployeeDashboardDummyComponent.prototype.onUpdate = function (content, title) {
        if (title === 'Education') {
            var qualification = new Qualification(content.id, content.qualification);
            var institution = new Institution(content.institutionId, content.institution, content.startDate, content.endDate);
            var educationChicklets = new EducationChicklets(qualification, institution, content.summary);
            var chicklets = new Array();
            chicklets.push(educationChicklets);
            var educationSection = new EducationSection('Education', this.tokenstorageservice.getEmail(), 'update', chicklets);
            console.log(educationSection);
            this.downstreamBackendService.updateEducationDetails(educationSection)
                .subscribe(function (data) {
                console.log(data);
                location.reload();
            });
        }
        else if (title === 'Skills') {
            var skillChicklet = new SkillChicklets(content.skill);
            var chicklets = [skillChicklet];
            var skillSection = new SkillSection('Skills', this.tokenstorageservice.getEmail(), 'update', chicklets);
            this.downstreamBackendService.updateSkillsDetails(skillSection)
                .subscribe(function (data) {
                console.log(data);
                location.reload();
            });
        }
        else if (title === 'Project') {
            var projectChicklet = new ProjectChicklets(content.project);
            var chicklets = [projectChicklet];
            var projectSection = new ProjectSection('Project', this.tokenstorageservice.getEmail(), 'update', chicklets);
            this.downstreamBackendService.updateProjectDetails(projectSection)
                .subscribe(function (data) {
                console.log(data);
                location.reload();
            });
        }
        else if (title === 'Certificate') {
            var certificateChicklet = new CertificateChicklets(content.certificate);
            var chicklets = [certificateChicklet];
            var certificateSection = new CertificateSection('Certificate', this.tokenstorageservice.getEmail(), 'update', chicklets);
            this.downstreamBackendService.updateCerificateDetails(certificateSection)
                .subscribe(function (data) {
                console.log(data);
                location.reload();
            });
        }
        else if (title === 'Experience') {
            var experienceChicklet = new Chicklets(content.experience);
            var chicklets = Array();
            chicklets.push(experienceChicklet);
            var experienceSection = new ExperienceSection('Experience', this.tokenstorageservice.getEmail(), 'update', chicklets);
            this.downstreamBackendService.updateExperienceDetails(experienceSection)
                .subscribe(function (data) {
                console.log(data);
                location.reload();
            });
        }
    };
    EmployeeDashboardDummyComponent.prototype.onUpdateCurrentLocation = function (content) {
        var currentLocation = new CurrentLocation(content.currentLocationId, content.currentcontent.currentCityName, content.currentStateName, content.currentPinCode);
        var locationChicklet = new LocationChicklets(currentLocation, null);
        var chicklets = Array();
        chicklets.push(locationChicklet);
        var locationSection = new LocationSection('Location', this.tokenstorageservice.getEmail(), 'update', chicklets);
        this.downstreamBackendService.updateLocationDetails(locationSection)
            .subscribe(function (data) {
            console.log(data);
            location.reload();
        });
    };
    EmployeeDashboardDummyComponent.prototype.onUpdatePastLocation = function (pastLocation) {
        var deleteLocation = Array();
        var locationData = new PastLocation(pastLocation.pastLocationId, pastLocation.cityName, pastLocation.stateName, pastLocation.pinCode);
        deleteLocation.push(locationData);
        var locationChicklet = new LocationChicklets(null, deleteLocation);
        var chicklets = Array();
        chicklets.push(locationChicklet);
        var locationSection = new LocationSection('Location', this.tokenstorageservice.getEmail(), 'update', chicklets);
        this.downstreamBackendService.updateLocationDetails(locationSection)
            .subscribe(function (data) {
            console.log(data);
            location.reload();
        });
    };
    EmployeeDashboardDummyComponent.prototype.editskilldialog = function (content) {
        var dialogConfig = new MatDialogConfig();
        this.downstream.subject.next(content);
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '50%';
        this.dialog.open(EditSkillDialogComponent, dialogConfig);
    };
    EmployeeDashboardDummyComponent = __decorate([
        Component({
            selector: 'app-employee-dashboard-dummy',
            templateUrl: './employee-dashboard-dummy.component.html',
            styleUrls: ['./employee-dashboard-dummy.component.css'],
        }),
        __metadata("design:paramtypes", [BreakpointObserver, MatDialog, DownstreamService,
            TokenStorageService, DownstreamBackendService])
    ], EmployeeDashboardDummyComponent);
    return EmployeeDashboardDummyComponent;
}());
export { EmployeeDashboardDummyComponent };
//# sourceMappingURL=employee-dashboard-dummy.component.js.map