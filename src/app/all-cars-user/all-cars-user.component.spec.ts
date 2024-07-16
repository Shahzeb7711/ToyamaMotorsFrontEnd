import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCarsUserComponent } from './all-cars-user.component';

describe('AllCarsUserComponent', () => {
  let component: AllCarsUserComponent;
  let fixture: ComponentFixture<AllCarsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCarsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCarsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
