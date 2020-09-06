import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchDashboardComponent } from './launch-dashboard.component';

describe('LaunchDashboardComponent', () => {
  let component: LaunchDashboardComponent;
  let fixture: ComponentFixture<LaunchDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaunchDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
