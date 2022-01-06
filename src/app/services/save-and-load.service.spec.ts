import { TestBed } from '@angular/core/testing';
import { IpcService } from './ipc.service';

import { SaveAndLoadService } from './save-and-load.service';

describe('SaveAndLoadService', () => {
  let service: SaveAndLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpcService]
    });
    service = TestBed.inject(SaveAndLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
