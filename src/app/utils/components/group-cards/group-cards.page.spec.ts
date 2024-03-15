import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupCardsPage } from './group-cards.page';

describe('GroupCardsPage', () => {
  let component: GroupCardsPage;
  let fixture: ComponentFixture<GroupCardsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GroupCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
