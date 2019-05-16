import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  @Output() refresh: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
  refreshProfile() {
    this.refresh.emit(true);
  }
}
