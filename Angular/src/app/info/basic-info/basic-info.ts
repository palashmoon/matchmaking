export class BasicInfo {
    constructor(private gender: string,
        private dob: string,
        private contactNo: string,
        private linkedinUrl: string,
        private githubUrl: string) {
        this.gender = gender;
        this.dob = dob;
        this.contactNo = contactNo;
        this.linkedinUrl = linkedinUrl;
        this.githubUrl = githubUrl;
    }
}
