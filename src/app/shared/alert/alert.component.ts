import { Subscription } from 'rxjs';
import { AlertService } from './../services/alert.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TAlert } from '../interfaces/alert.interface';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 4000;
  private subscription: Subscription = new Subscription();
  public text: string;
  public type: TAlert;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.getType();
  }

  getType() {
    this.subscription.add(
      this.alertService.alert$.subscribe((data) => {
        this.type = data.type;
        this.text = data.text;

        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          this.text=''
        }, this.delay)
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
