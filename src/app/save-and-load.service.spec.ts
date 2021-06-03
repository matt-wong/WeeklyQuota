import { TestBed } from '@angular/core/testing';

import { SaveAndLoadService } from './save-and-load.service';

describe('SaveAndLoadService', () => {
  let service: SaveAndLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveAndLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
