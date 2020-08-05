import { Observable } from 'rxjs';
import { Injectable, InjectionToken, inject, Inject } from '@angular/core';
import { NAVIGATOR } from '@ng-web-apis/common';
import { Position } from '@angular/compiler';

// Token for getting Geolocation object
export const GEOLOCATION = new InjectionToken<Geolocation>(
  'An obstraction over window.navigator.geo obj',
  {
    factory: () => inject(NAVIGATOR).geolocation,
  }
);

export const GEOLOCATION_SUPPORT = new InjectionToken<boolean>(
  'Is Geolocation API supported?',
  {
    factory: () => !!inject(GEOLOCATION),
  }
);

export const POSITION_OPTIONS = new InjectionToken<PositionOptions>(
  'Token for an additional position options',
  {
    factory: () => ({}),
  }
);

@Injectable()
export class TrainingGeoService {
  constructor() {}

  getSeconds(): Observable<number> {
    return new Observable<number>((observer) => {
      let count = 0;

      setInterval(() => {
        observer.next(count++);
      }, 1000);
    });
  }
}
