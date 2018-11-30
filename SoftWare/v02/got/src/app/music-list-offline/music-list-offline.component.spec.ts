import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicListOfflineComponent } from './music-list-offline.component';

describe('MusicListOfflineComponent', () => {
  let component: MusicListOfflineComponent;
  let fixture: ComponentFixture<MusicListOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicListOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicListOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
