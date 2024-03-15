import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesCreatePage } from './roles-create.page';

describe('RolesCreatePage', () => {
  let component: RolesCreatePage;
  let fixture: ComponentFixture<RolesCreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RolesCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
