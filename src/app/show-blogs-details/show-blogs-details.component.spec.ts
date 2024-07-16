import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBlogsDetailsComponent } from './show-blogs-details.component';

describe('ShowBlogsDetailsComponent', () => {
  let component: ShowBlogsDetailsComponent;
  let fixture: ComponentFixture<ShowBlogsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBlogsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBlogsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
