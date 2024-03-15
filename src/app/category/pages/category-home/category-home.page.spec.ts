import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryHomePage } from './category-home.page';

describe('CategoryHomePage', () => {
  let component: CategoryHomePage;
  let fixture: ComponentFixture<CategoryHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CategoryHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
