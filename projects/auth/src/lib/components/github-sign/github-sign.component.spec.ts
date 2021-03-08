import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubSignComponent } from './github-sign.component';

describe('GithubSignComponent', () => {
  let component: GithubSignComponent;
  let fixture: ComponentFixture<GithubSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubSignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
