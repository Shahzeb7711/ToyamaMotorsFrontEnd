import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowActivatedDeatilsComponent } from './show-activated-deatils.component';

describe('ShowActivatedDeatilsComponent', () => {
  let component: ShowActivatedDeatilsComponent;
  let fixture: ComponentFixture<ShowActivatedDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowActivatedDeatilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowActivatedDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
