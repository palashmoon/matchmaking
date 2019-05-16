export class Certificate {
    constructor(private certificateName: string,
        private certificateAuthority: string,
        private licenseNumber: string,
        private fromDate: string,
        private toDate: string) {
        this.certificateName = certificateName;
        this.certificateAuthority = certificateAuthority;
        this.licenseNumber = licenseNumber;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }
}
