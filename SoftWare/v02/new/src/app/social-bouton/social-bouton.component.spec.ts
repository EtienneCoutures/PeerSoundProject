import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialBoutonComponent } from './social-bouton.component';

describe('SocialBoutonComponent', () => {
  let component: SocialBoutonComponent;
  let fixture: ComponentFixture<SocialBoutonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialBoutonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialBoutonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
