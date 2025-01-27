import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updategroupBySelection } from '../store/actions/groupBy.actions';
import { updateorderBySelection } from '../store/actions/orderBy.actions';
import { SelectionState } from '../store/reducers/groupBy.reducer'; // Import the interface for selection state
import { SelectionOrderByState } from '../store/reducers/orderBy.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() selectedValue: { selectedData: string } | null = null;
  @Input() selectedOrderByValue: { selectedOrderByData: string } | null = null;

  constructor(private store: Store<SelectionState>, private store2: Store<SelectionOrderByState>) { }
  
  ngOnInit(): void {
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Handle changes in the select dropdown
  onSelectGroupByChange(event: Event): void {
    const selectedData = (event.target as HTMLSelectElement).value;
    this.store.dispatch(updategroupBySelection({ selectedData }));
  }

  onSelectOrderByChange(event: Event): void {
    const selectedOrderByData = (event.target as HTMLSelectElement).value;
    this.store.dispatch(updateorderBySelection({ selectedOrderByData }));
  }
}
