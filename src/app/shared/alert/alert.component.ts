import { Subscription } from 'rxjs';
import { AlertService } from './../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { TAlert } from '../interfaces/alert.interface';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public text: string;
  public type: TAlert;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.getType();
  }

  show() {
    this.alertService.info('my text');
  }

  getType() {
    this.subscription.add(
      this.alertService.alert$.subscribe((data) => {
        this.type = data.type;
        this.text = data.text;
      })
    );
  }
}
