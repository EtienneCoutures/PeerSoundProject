import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPlaylistComponent } from './info-playlist.component';

describe('InfoPlaylistComponent', () => {
  let component: InfoPlaylistComponent;
  let fixture: ComponentFixture<InfoPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
