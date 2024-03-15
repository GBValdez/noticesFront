import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticeEditPage } from './notice-edit.page';

describe('NoticeEditPage', () => {
  let component: NoticeEditPage;
  let fixture: ComponentFixture<NoticeEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoticeEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
