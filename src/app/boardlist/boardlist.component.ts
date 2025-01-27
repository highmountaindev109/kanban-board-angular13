import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Tickets } from '../interfaces/tickets.interface';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SelectionOrderByState } from '../store/reducers/orderBy.reducer';

@Component({
  selector: 'app-boardlist',
  templateUrl: './boardlist.component.html',
  styleUrls: ['./boardlist.component.css']
})
export class BoardlistComponent implements OnInit {
  @Input() tickets: Tickets[] = [];
  @Input() groupValue: string | number = '';

  selectedOrderByData$: Observable<string>;
  selectedOrderByValue: { selectedOrderByData: string } | null = null;

  constructor(private store2: Store<SelectionOrderByState>) {
    this.selectedOrderByData$ = this.store2.pipe(
      select(state => {
        return state.selectedOrderByData;
      })
    );
  }

  ngOnInit(): void {
    this.selectedOrderByData$.subscribe(priority => {
      this.selectedOrderByValue = (typeof priority === 'string')
        ? { selectedOrderByData: priority }
        : priority || { selectedOrderByData: 'status' };

      this.sortTickets();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tickets']) {
      this.sortTickets();  
    }
  }

  // Sorting Tickets which was already Grouped by parent component
  sortTickets(): void {
    if (this.selectedOrderByValue && this.selectedOrderByValue.selectedOrderByData) {
      const sortKey = this.selectedOrderByValue.selectedOrderByData;

      const sortedTickets = [...this.tickets];

      if (sortKey === "priority") {
        sortedTickets.sort((a, b) => b.priority - a.priority);
      }

      if (sortKey === "title") {
        sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
      }

      this.tickets = sortedTickets;
    }
  }
}
