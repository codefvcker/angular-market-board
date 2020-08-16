import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VipSectionComponent } from './vip-section.component';

describe('VipSectionComponent', () => {
  let component: VipSectionComponent;
  let fixture: ComponentFixture<VipSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
