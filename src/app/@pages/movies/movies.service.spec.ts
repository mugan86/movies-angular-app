import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Servicio: "MoviesService" iniciado', () => {
    expect(service).toBeTruthy();
  });

  it('Obtener lista de películas correctamente', () => {
    const mockMovies = [
      {
        title: 'Uncharted',
        poster:
          'https://www.themoviedb.org/t/p/w1280/8FiWi61YRbkN95xmH668iq5sCo1.jpg',
        genre: ['Adventure'],
        actors: [2, 1],
        year: 2022,
        duration: 190,
        imdbRating: 8.9,
        id: 11,
      },
      {
        title: 'Los Simpson',
        poster:
          'https://www.themoviedb.org/t/p/w1280/u8BMLmwoc7YPHKSWawOOqC1c8lJ.jpg',
        genre: ['Comedy'],
        actors: [1, 3, 5, 7],
        year: 2000,
        duration: 70,
        imdbRating: 9.8,
        id: 12,
      },
    ];

    service.list().subscribe((result) => {
      const status = result.status;
      const movies = result.movies;
      expect(status).toBeTruthy();
      expect(movies.length).toEqual(2);
      expect(movies[0].title).toEqual('Uncharted');
      expect(movies[0].id).toEqual(11);
    });

    const req = httpMock.expectOne('http://localhost:3000/movies');

    expect(req.request.method).toEqual('GET');

    req.flush(mockMovies);
  });
});
