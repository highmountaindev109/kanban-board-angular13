import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardcardComponent } from './boardcard.component';

describe('BoardcardComponent', () => {
  let component: BoardcardComponent;
  let fixture: ComponentFixture<BoardcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
