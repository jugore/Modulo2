import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserPageComponent } from './updateuser-page.component';

describe('UpdateuserPageComponent', () => {
  let component: UpdateuserPageComponent;
  let fixture: ComponentFixture<UpdateuserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateuserPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateuserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
