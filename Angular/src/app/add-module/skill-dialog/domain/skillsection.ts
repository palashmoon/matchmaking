import { SkillChicklets } from './skillchicklets';


export class SkillSection {
    constructor(private sectionId: string,
        private userId: string,
        private operationType: string,
        private chicklets: SkillChicklets[]) {
        this.sectionId = sectionId;
        this.userId = userId;
        this.operationType = operationType;
        this.chicklets = chicklets;
    }
}
