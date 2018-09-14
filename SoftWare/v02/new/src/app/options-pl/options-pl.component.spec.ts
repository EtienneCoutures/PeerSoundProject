import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsPlComponent } from './options-pl.component';

describe('OptionsPlComponent', () => {
  let component: OptionsPlComponent;
  let fixture: ComponentFixture<OptionsPlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsPlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsPlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
