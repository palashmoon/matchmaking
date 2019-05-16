import { Chicklets } from './chicklets';
export class InterestsSection {
    constructor(private sectionId: string,
        private userId: string,
        private operationType: string,
        private chicklets: Chicklets[]) {
        this.sectionId = sectionId;
        this.userId = userId;
        this.operationType = operationType;
        this.chicklets = chicklets;
    }
}
