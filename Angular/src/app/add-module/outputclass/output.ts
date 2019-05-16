import { Relationship } from "./relationship";

export class Output {
    constructor(private operationType: string,
        private sourceNode: string,
        private sourceNodeProperty: string,
        private terminalNode: string,
        private terminalNodeProperties: string,
        private relationship: Relationship[]) {
        this.operationType = operationType;
        this.sourceNode = sourceNode;
        this.sourceNodeProperty = sourceNodeProperty;
        this.terminalNode = terminalNode;
        this.terminalNodeProperties = terminalNodeProperties;
        this.relationship = relationship;
    }
}
