import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Observable, ObservedValueOf, of, forkJoin } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Tickets } from '../interfaces/tickets.interface';
import { Users } from '../interfaces/users.interface';
import { TicketsUsersService } from '../tickets-users.service';
import { TicketsSelection } from '../store/actions/tickets.actions';
import { TicketsSelectionState } from '../store/reducers/tickets.reducer';
import { UsersSelection } from '../store/actions/users.actions';
import { UsersSelectionState } from '../store/reducers/users.reducer';
import { SelectionState } from '../store/reducers/groupBy.reducer';
import { SelectionOrderByState } from '../store/reducers/orderBy.reducer';

@Component({
  selector: 'app-boardmain',
  templateUrl: './boardmain.component.html',
  styleUrls: ['./boardmain.component.css']
})
export class BoardmainComponent implements OnInit {
  tickets: Tickets[] = [];
  users: Users[] = [];

  // ****************************************************
  ticketsData$: Observable<Tickets[]>;
  ticketsValue: { ticketsData: Tickets[] } | null = null;

  usersData$: Observable<Users[]>;
  usersValue: { usersData: Users[] } | null = null;
  // ****************************************************

  // ----------------------------------------------------
  selectedData$: Observable<string>;
  selectedValue: { selectedData: string } | null = null;

  selectedOrderByData$: Observable<string>;
  selectedOrderByValue: { selectedOrderByData: string } | null = null;
  // ----------------------------------------------------

  groupValues: (string | number)[] = [];

  constructor(private ticketsusersService: TicketsUsersService, private store: Store<TicketsSelectionState>, private store2: Store<SelectionState>, private store3: Store<UsersSelectionState>, private store4: Store<SelectionOrderByState>) {
    // ********************************************
    this.ticketsData$ = this.store.pipe(
      select(state => {
        return state.ticketsData;
      })
    );

    this.usersData$ = this.store3.pipe(
      select(state => {
        return state.usersData;
      })
    );
    // ********************************************

    // ---------------------------------------------
    this.selectedData$ = this.store2.pipe(
      select(state => {
        return state.selectedData;
      })
    );

    this.selectedOrderByData$ = this.store4.pipe(
      select(state => {
        return state.selectedOrderByData;
      })
    );
    // ---------------------------------------------
  }

  ngOnInit(): void {
    this.ticketsusersService.getTicketsUsers().subscribe((response) => {
      // Getting Tickets and Users data from Third-party and save it to localstorage individually
      this.tickets = response.tickets;
      this.users = response.users;

      this.store.dispatch(TicketsSelection({ ticketsData: this.tickets.map(ticket => ticket) }));
      this.store.dispatch(UsersSelection({ usersData: this.users.map(user => user) }));

      // ************************************************
      this.ticketsData$.subscribe(priority => {
        this.ticketsValue = Array.isArray(priority)
          ? { ticketsData: priority }
          : priority || { ticketsData: [] };
      });

      this.usersData$.subscribe(priority => {
        this.usersValue = Array.isArray(priority) ? { usersData: priority } : priority || { usersData: [] };
      });
      // ************************************************

      // ------------------------------------------------
      this.selectedData$.subscribe(priority => {
        this.selectedValue = (typeof priority === 'string')
          ? { selectedData: priority }
          : priority || { selectedData: 'status' };

        this.groupTickets();
      });

      this.selectedOrderByData$.subscribe(priority => {
        this.selectedOrderByValue = (typeof priority === 'string')
          ? { selectedOrderByData: priority }
          : priority || { selectedOrderByData: 'status' };
      });
      // ------------------------------------------------
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticketsValue?.ticketsData']) {
      this.groupTickets();
    }
  }

  // Getting groupValues
  groupTickets(): void {
    if (this.selectedValue && this.selectedValue.selectedData) {
      const sortKey = this.selectedValue.selectedData;

      const tickets = this.ticketsValue?.ticketsData;

      let combinedUniqueValues: (string | number)[] = [];  // Correctly type it as an array of strings or numbers

      if (sortKey === "status") {
        const uniqueStatuses1 = [...new Set(tickets?.map(ticket => ticket.status))];

        combinedUniqueValues = [...combinedUniqueValues, ...uniqueStatuses1];  // Merge arrays
      }

      if (sortKey === 'user') {
        // Create an array of observables for each ticket's user
        const userObservables = tickets?.map(ticket => this.getUserNameById(ticket.userId));

        if (userObservables) {
          // Use forkJoin to wait for all observables to complete
          forkJoin(userObservables).subscribe((users) => {
            // Once all users are fetched, get unique user names
            const uniqueUserNames2 = [...new Set(users.map(user => user ? user.name : 'Unknown User'))];

            combinedUniqueValues = [...combinedUniqueValues, ...uniqueUserNames2];  // Merge unique user names into the array
            // Deduplicate and set as final unique values
            combinedUniqueValues = [...new Set(combinedUniqueValues)];

            // Now assign the final array to groupValues
            this.groupValues = combinedUniqueValues;  // This is valid as combinedUniqueValues is an array
          });
        }
      }

      if (sortKey === "priority") {
        const uniqueStatuses3 = [...new Set(tickets?.map(ticket => ticket.priority))];

        combinedUniqueValues = [...combinedUniqueValues, ...uniqueStatuses3];  // Merge arrays
      }

      // Deduplicate the combined array
      combinedUniqueValues = [...new Set(combinedUniqueValues)];

      // Assign it to groupValues (after deduplication)
      this.groupValues = combinedUniqueValues;  // Ensure this assignment is done at the end
    }
  }

  getUserNameById(userid: string): Observable<Users | undefined> {
    const user = this.usersValue?.usersData.find(user => user.id === userid);

    return of(user);
  }

  // Grouping Tickets
  getTicketsByGroup(groupValue: string | number = ''): Tickets[] {
    let tickets = this.ticketsValue?.ticketsData || [];

    if (this.selectedValue && this.selectedValue.selectedData) {
      const sortKey = this.selectedValue.selectedData;

      if (sortKey === 'status') {
        tickets = tickets.filter(ticket => ticket.status === groupValue);
      }

      if (sortKey === 'user') {
        // Create an array of observables for user names by id
        const userObservables = tickets.map(ticket => this.getUserNameById(ticket.userId));

        // Use forkJoin to resolve all the observables
        forkJoin(userObservables).subscribe(userNames => {
          // Now filter tickets based on user name
          tickets = tickets.filter((ticket, index) => userNames[index]?.name === groupValue);
        });
      }

      if (sortKey === 'priority') {
        tickets = tickets.filter(ticket => ticket.priority === groupValue);
      }
    }

    return tickets; // NOTE: This will still be empty or unfiltered until forkJoin completes
  }
}
