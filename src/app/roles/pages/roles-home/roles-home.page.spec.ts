import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesHomePage } from './roles-home.page';

describe('RolesHomePage', () => {
  let component: RolesHomePage;
  let fixture: ComponentFixture<RolesHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RolesHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
