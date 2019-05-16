import { ProjectChicklets } from './projectchicklets';

export class ProjectSection {
    constructor(private sectionId: string,
        private userId: string,
        private operationType: string,
        private chicklets: ProjectChicklets[]) {
        this.sectionId = sectionId;
        this.userId = userId;
        this.operationType = operationType;
        this.chicklets = chicklets;
    }
}
