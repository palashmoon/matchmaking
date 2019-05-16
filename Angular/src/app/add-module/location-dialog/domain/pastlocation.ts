export class PastLocation {
    constructor(private pastLocationId: string,
                private cityName: string,
                private stateName: string,
                private pincode: string) {
                    this.pastLocationId = pastLocationId;
                    this.cityName = cityName;
                    this.stateName = stateName;
                    this.pincode = pincode;
                }
}
