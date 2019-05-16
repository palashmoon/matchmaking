export class Domain {
    constructor(public name: string, public id: number) {}
  }
export class DomainResponse {
    domains: Domain[];
}
