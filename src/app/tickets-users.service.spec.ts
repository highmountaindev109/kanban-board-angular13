import { TestBed } from '@angular/core/testing';

import { TicketsUsersService } from './tickets-users.service';

describe('TicketsUsersService', () => {
  let service: TicketsUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 
