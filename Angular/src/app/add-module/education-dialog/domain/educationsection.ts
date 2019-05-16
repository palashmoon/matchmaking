import { EducationChicklets } from './educationchicklets';

export class EducationSection {
    constructor(private sectionId: string,
        private userId: string,
        private operationType: string,
        private chicklets: EducationChicklets[]) {
        this.sectionId = sectionId;
        this.userId = userId;
        this.operationType = operationType;
        this.chicklets = chicklets;
    }
}