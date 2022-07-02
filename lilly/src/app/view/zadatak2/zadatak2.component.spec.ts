import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zadatak2Component } from './zadatak2.component';

describe('Zadatak2Component', () => {
  let component: Zadatak2Component;
  let fixture: ComponentFixture<Zadatak2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zadatak2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Zadatak2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
