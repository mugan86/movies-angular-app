import { MoviesEffects } from './movies.effects';

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MoviesEffects', () => {
  let actions$: Observable<any>;
  let effects: MoviesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(MoviesEffects);
  });

  it('Se crea correctamente', () => {
    expect(effects).toBeTruthy();
  });
});
