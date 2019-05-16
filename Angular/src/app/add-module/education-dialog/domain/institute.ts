export class Institute {
    constructor(public id: number, public name: string) {}
  }
export class InstituteResponse {
    educations: Institute[];
}
