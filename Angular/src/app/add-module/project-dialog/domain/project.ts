import {Skill} from './skill';

export class Project {
  constructor(private title: string,
            private fromDate: string,
            private toDate: string,
            private projectUrl: string,
            private domain: string,
            private role: string,
            private company: string,
            private client: string,
            private technologiesUsed: Skill[],
            private description: string) {
      this.title = title;
      this.fromDate = fromDate;
      this.toDate = toDate;
      this.projectUrl = projectUrl;
      this.domain = domain;
      this.role = role;
      this.company = company;
      this.client = client;
      this.technologiesUsed = technologiesUsed;
      this.description = description;
  }
}
