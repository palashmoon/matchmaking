export class Institution {
    constructor(private institutionId: string,
        private institutionName: string,
        private startDate: string,
        private endDate: string) {
        this.institutionId = institutionId;
        this.institutionName = institutionName;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
