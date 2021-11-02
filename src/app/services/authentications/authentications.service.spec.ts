import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AccountType } from 'src/app/enums/account-type.enum';
import { Gender } from 'src/app/enums/gender.enum';

import { AuthenticationsService } from './authentications.service';

describe('AuthenticationsService', () => {
  let service: AuthenticationsService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

export class MockAuthService {
  currentUserValue = {
    user: {
      id: '',
      email: '',
      username: 'Mouhamed',
      token: 'abcdef',
      account_type: AccountType.Customer,
      gender: Gender.M,
      address: {
        state: '',
        zipcode: '',
        country: '',
        street: '',
      },
    },
  };
}
