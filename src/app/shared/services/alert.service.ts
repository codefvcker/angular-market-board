import { IAlert } from './../interfaces/alert.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AlertService {
  public alert$: Subject<IAlert> = new Subject();
  constructor() {}

  danger(text: string) {
    return this.alert$.next({ type: 'danger', text });
  }

  warning(text: string) {
    return this.alert$.next({ type: 'warning', text });
  }

  success(text: string) {
    return this.alert$.next({ type: 'success', text });
  }

  info(text: string) {
    return this.alert$.next({ type: 'info', text });
  }
}
