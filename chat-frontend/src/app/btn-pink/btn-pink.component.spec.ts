import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPinkComponent } from './btn-pink.component';

describe('BtnPinkComponent', () => {
  let component: BtnPinkComponent;
  let fixture: ComponentFixture<BtnPinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnPinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnPinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
