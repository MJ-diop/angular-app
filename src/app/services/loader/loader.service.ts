import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading = new BehaviorSubject<Boolean>(false);
  public readonly loading$ = this.loading.asObservable();

  constructor() {}

  show() {
    this.loading.next(true);
  }
  hide() {
    this.loading.next(false);
  }
}
