import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardmainComponent } from './boardmain.component';

describe('BoardmainComponent', () => {
  let component: BoardmainComponent;
  let fixture: ComponentFixture<BoardmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardmainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
