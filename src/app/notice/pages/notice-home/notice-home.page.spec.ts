import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticeHomePage } from './notice-home.page';

describe('NoticeHomePage', () => {
  let component: NoticeHomePage;
  let fixture: ComponentFixture<NoticeHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoticeHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
