export class Currentcities {
    constructor(public name: string, public id: number) {}
  }
export class CurrentCityResponse {
    locations: Currentcities[];
}
