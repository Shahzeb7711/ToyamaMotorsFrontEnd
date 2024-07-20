import { DragDirective } from './drag.directive';
import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

describe('DragDirective', () => {
  let directive: DragDirective;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DragDirective,
        { provide: ElementRef, useValue: new ElementRef(null) },
        { provide: DomSanitizer, useValue: jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustUrl']) }
      ]
    });

    directive = TestBed.inject(DragDirective);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});