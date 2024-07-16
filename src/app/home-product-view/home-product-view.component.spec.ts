import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductViewComponent } from './home-product-view.component';

describe('HomeProductViewComponent', () => {
  let component: HomeProductViewComponent;
  let fixture: ComponentFixture<HomeProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeProductViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
