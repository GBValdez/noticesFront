import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticeCreatePage } from './notice-create.page';

describe('NoticeCreatePage', () => {
  let component: NoticeCreatePage;
  let fixture: ComponentFixture<NoticeCreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoticeCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
