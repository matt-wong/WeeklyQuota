import { TestBed } from '@angular/core/testing';

import { IpcService } from './ipc.service';

describe('IpcService', () => {
  let service: IpcService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpcService]
    });
    service = TestBed.inject(IpcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //TODO: Matt! Make some tests, idiot!
});
