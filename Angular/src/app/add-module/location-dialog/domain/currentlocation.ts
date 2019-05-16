export class CurrentLocation {
    constructor(private currentLocationId: string,
                private cityName: string,
                private stateName: string,
                private pincode: string) {
        this.currentLocationId = currentLocationId;
        this.cityName = cityName;
        this.stateName = stateName;
        this.pincode = pincode;
    }
}
