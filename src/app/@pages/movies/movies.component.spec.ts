import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

import { createTranslateLoader } from '@app/app.module';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MoviesComponent } from './movies.component';
import { ContentItemsLoaderModule } from '@core/components';
import { BasicInfoCardModule } from '@shared/components';
import { IMovie } from './movie.interface';
import { MoviesService } from './movies.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { EffectsArray } from '@app/store/effects';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from '@app/store/app.reducers';
import { StoreModule } from '@ngrx/store';

class MockRouter {
  navigateByUrl(url: string) {
    return url;
  }
}

/*class StoreMock { 
  // How we did it before
  select =  jasmine.createSpy().and.returnValue(of(quote)); 
  dispatch = jasmine.createSpy();
}*/

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let moviesService: MoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MoviesComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
          },
        }),
        ContentItemsLoaderModule,
        BasicInfoCardModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot(EffectsArray),
      ],
      providers: [MoviesService, { provide: Router, useClass: MockRouter }],
    }).compileComponents();
  });
  beforeEach(inject([MoviesService], (movServ: MoviesService) => {
    moviesService = movServ;
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('Se crea correctamente a instancia del componente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() - Debe de cargar las películas', (done) => {
    const MoviesData = [
      {
        title: 'Los Simpson',
        poster:
          'https://www.themoviedb.org/t/p/w1280/u8BMLmwoc7YPHKSWawOOqC1c8lJ.jpg',
        genre: ['Comedy'],
        actors: [
          {
            id: 4,
            first_name: 'Marci',
            last_name: 'Noads',
            gender: 'Female',
            bornCity: 'Jurm',
            birthdate: '04/08/1990',
            img: 'http://dummyimage.com/600x400.png/4fa25d/000000',
            rating: 4.37,
            movies: [1, 6, 8],
          },
        ],
        year: 2000,
        duration: 70,
        imdbRating: 9.8,
        id: 12,
      },
    ];
    const response$: Observable<{
      status: boolean;
      message: string;
      movies: IMovie[];
    }> = of({
      status: true,
      message: '',
      movies: MoviesData,
    });

    spyOn(moviesService, 'list').and.returnValue(response$);

    done();

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.movies.length).toBeGreaterThanOrEqual(1);
    expect(component.movies[0].actors?.length).toBeGreaterThanOrEqual(0);
    expect(typeof component.movies[0].id).toEqual('number');
    expect(typeof component.movies[0].actors).toEqual('object');
    expect(component.movies.length).toEqual(1);
  });

  it('ngOnInit() - NO carga las películas', (done) => {
    const response$: Observable<{
      status: boolean;
      message: string;
      movies: IMovie[];
    }> = of({
      status: false,
      message: '',
      movies: [],
    });

    spyOn(moviesService, 'list').and.returnValue(response$);

    done();

    component.ngOnInit();

    fixture.detectChanges();

    expect(component.movies.length).toEqual(0);
    expect(component.movies).toEqual([]);
    expect(component.loading).toEqual(false);
  });

  it('Comprobar el icono del botón de añadir es el correcto', () => {
    const document = fixture.debugElement.nativeElement;
    const buttonElement = <HTMLElement>(
      document.querySelector('.movie__button-new')
    );
    expect(buttonElement.innerHTML).toEqual(
      '<i _ngcontent-a-c33="" class="fa-solid fa-plus"></i>'
    );
  });

  it('Realizar click en botón "+" para añadir una nueva película', () => {
    spyOn(component, 'add');
    const document = fixture.debugElement.nativeElement;
    const buttonElement = <HTMLElement>(
      document.querySelector('.movie__button-new')
    );
    buttonElement.click();

    expect(component.add).toHaveBeenCalled();
    buttonElement.click();
    expect(component.add).toHaveBeenCalledTimes(2);
  });

  it('Llamar a Router.navigateByUrl("/movies/add") con la llamada a "add()"', inject(
    [Router],
    (router: Router) => {
      const spy = spyOn(router, 'navigateByUrl');

      component.add();

      const url = spy.calls.first().args[0];

      expect(url).toBe('/movies/add');
    }
  ));
});
