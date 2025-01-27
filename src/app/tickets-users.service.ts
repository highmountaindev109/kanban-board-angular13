import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tickets } from './interfaces/tickets.interface';
import { Users } from './interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketsUsersService {
  private baseUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';

  constructor(private http: HttpClient) { }

  getTicketsUsers(): Observable<{ tickets: Tickets[], users: Users[] }> {
    return this.http.get<{ tickets: Tickets[], users: Users[] }>(`${this.baseUrl}`);
  }
}
