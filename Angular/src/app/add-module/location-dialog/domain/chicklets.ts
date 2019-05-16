import { CurrentLocation } from './currentlocation';
import { PastLocation } from './pastlocation';

export class LocationChicklets {
    constructor(private currentLocation: CurrentLocation,
        private pastLocation: PastLocation[]) {
        this.currentLocation = currentLocation;
        this.pastLocation = pastLocation;
    }
}
