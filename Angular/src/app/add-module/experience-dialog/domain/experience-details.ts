export class ExperienceDetails {
    constructor(private organisation: string,
        private role: string,
        private fromDate: string,
        private fromMonth: string,
        private fromYear: string,
        private toDate: string,
        private toMonth: string,
        private toYear: string) {
        this.organisation = organisation;
        this.role = role;
        this.fromDate = fromDate;
        this.fromMonth = fromMonth;
        this.fromYear = fromYear;
        this.toDate = toDate;
        this.toMonth = toMonth;
        this.toYear = toYear;
    }
}
