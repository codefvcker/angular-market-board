import { Observable } from 'rxjs';
import { TrainingGeoService } from './../services/training-geo.service';
import {
  Component,
  OnInit,
  InjectionToken,
  Inject,
  inject,
} from '@angular/core';
import { map } from 'rxjs/operators';

const MY_NAVIGATOR = new InjectionToken<Navigator>('try to do nav token', {
  providedIn: 'root',
  factory: () => navigator,
});

const myInjectToken = new InjectionToken<Geolocation>('dish', {
  factory: () => inject(MY_NAVIGATOR).geolocation,
});
const mySecondInjToken = new InjectionToken<boolean>('idk', {
  factory: () => !!inject(myInjectToken),
});

const myFirstInjTokenAsBool = new InjectionToken<string>('check it', {
  factory: () => inject(mySecondInjToken).toString().toUpperCase(),
});

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  constructor(private geo: TrainingGeoService) {}

  public position$: Observable<number>;
  public new$: Observable<number>;

  ngOnInit(): void {
    this.position$ = this.geo.getSeconds();
    this.new$ = this.geo.getSeconds().pipe(map((item) => item * 2));
  }
}
