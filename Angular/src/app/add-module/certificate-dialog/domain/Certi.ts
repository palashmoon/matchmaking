export class Certi {
    constructor(public name: string, public id: number) {}
  }
export class CertificateResponse {
    certifications: Certi[];
}
