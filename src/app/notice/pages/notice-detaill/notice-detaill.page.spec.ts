import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticeDetaillPage } from './notice-detaill.page';

describe('NoticeDetaillPage', () => {
  let component: NoticeDetaillPage;
  let fixture: ComponentFixture<NoticeDetaillPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoticeDetaillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
