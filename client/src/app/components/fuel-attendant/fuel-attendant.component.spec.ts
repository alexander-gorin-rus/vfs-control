import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelAttendantComponent } from './fuel-attendant.component';

describe('FuelAttendantComponent', () => {
  let component: FuelAttendantComponent;
  let fixture: ComponentFixture<FuelAttendantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuelAttendantComponent]
    });
    fixture = TestBed.createComponent(FuelAttendantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
