import { CertificateChicklets } from './certificatechicklets';

export class CertificateSection {
    constructor(private sectionId: string,
        private userId: string,
        private operationType: string,
        private chicklets: CertificateChicklets[]) {
        this.sectionId = sectionId;
        this.userId = userId;
        this.operationType = operationType;
        this.chicklets = chicklets;
    }
}
