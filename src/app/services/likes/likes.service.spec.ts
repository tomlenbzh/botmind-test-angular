import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LikesService } from './likes.service';

describe('LikesService', () => {
  let service: LikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(LikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
