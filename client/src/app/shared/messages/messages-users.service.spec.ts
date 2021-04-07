import { TestBed } from '@angular/core/testing';

import { MessagesUsersService } from './messages-users.service';

describe('MessagesUsersService', () => {
  let service: MessagesUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
