export class Authority {
    constructor(public name: string, public id: number) {}
  }
export class AuthorityResponse {
    organizations: Authority[];
}
