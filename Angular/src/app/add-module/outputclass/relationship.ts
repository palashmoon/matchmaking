export class Relationship {
    constructor(private relationshipProperty: string,
        private relationType: string) {
        this.relationshipProperty = relationshipProperty;
        this.relationType = relationType;
    }
}
