import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class QueryData {
  constructor(private userId: string,
            private query: string,
            private timeStamp: Timestamp<any>) {
      this.userId = userId;
      this.query = query;
      this.timeStamp = timeStamp;
  }
}
