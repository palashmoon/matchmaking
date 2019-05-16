import { Relationship } from './relationship';
export class Output {
    constructor(private operationType: string,
        private sourceNode: string,
        private sourceProperty: string,
        private terminalNode: string,
        private terminalProperties: string,
        private relation: Relationship) {
        this.operationType = operationType;
        this.sourceNode = sourceNode;
        this.sourceProperty = sourceProperty;
        this.terminalNode = terminalNode;
        this.terminalProperties = terminalProperties;
        this.relation = relation;
    }
}
