import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendActivationMailComponent } from './send-activation-mail.component';

describe('SendActivationMailComponent', () => {
  let component: SendActivationMailComponent;
  let fixture: ComponentFixture<SendActivationMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendActivationMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendActivationMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
