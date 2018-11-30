import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineFeaturesLogComponent } from './offline-features-log.component';

describe('OfflineFeaturesLogComponent', () => {
  let component: OfflineFeaturesLogComponent;
  let fixture: ComponentFixture<OfflineFeaturesLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineFeaturesLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineFeaturesLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
