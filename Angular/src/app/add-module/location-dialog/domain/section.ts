import { LocationChicklets } from './chicklets';

export class LocationSection {
    constructor(private sectionId: string,
        private userId: string,
        private operationType: string,
        private chicklets: LocationChicklets[]) {
        this.sectionId = sectionId;
        this.userId = userId;
        this.operationType = operationType;
        this.chicklets = chicklets;
    }
}
