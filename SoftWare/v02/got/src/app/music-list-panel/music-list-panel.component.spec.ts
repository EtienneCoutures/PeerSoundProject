import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicListPanelComponent } from './music-list-panel.component';

describe('MusicListPanelComponent', () => {
  let component: MusicListPanelComponent;
  let fixture: ComponentFixture<MusicListPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicListPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
