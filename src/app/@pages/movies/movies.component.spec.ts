import { Observable, from } from 'rxjs';
import { createTranslateLoader } from './../../app.module';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MoviesComponent } from './movies.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ContentItemsLoaderModule } from '@core/components';
import { BasicInfoCardModule } from '@shared/components';
import { IMovie } from './movie.interface';
import { MoviesService } from './movies.service';


describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let moviesService: MoviesService;
  let element: Element;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      imports: [
        RouterTestingModule,
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
      ],
      providers: [
        MoviesService
      ]
    }).compileComponents();
  });
  beforeEach(inject([MoviesService], (movServ: MoviesService) => {
    moviesService = movServ;
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Cargando la información y terminando', () => {
    component.loading = true;
    fixture.detectChanges();

    expect(component.loading).toBeTruthy();
    component.loading = false;
    fixture.detectChanges();

    expect(component.loading).toBeFalsy();
  });


  it('Comprobar el icono del botón de añadir es el correcto', () => {
    const document = fixture.debugElement.nativeElement;
    const buttonElement = <HTMLElement>document.querySelector('.movie__button-new')
    expect(buttonElement.innerHTML).toEqual(
      '<i _ngcontent-a-c33="" class="fa-solid fa-plus"></i>'
    );
  });

  it('Realizar click en botón "+" para añadir una nueva película', () => {
    spyOn(component, 'add');
    const document = fixture.debugElement.nativeElement;
    const buttonElement = <HTMLElement>document.querySelector('.movie__button-new')
    buttonElement.click();
    expect(component.add).toHaveBeenCalled();
    buttonElement.click();
    expect(component.add).toHaveBeenCalledTimes(2);
  });

  /*it("should call getUsers and return list of users", waitForAsync(() => {
    const response = { status: true, message: '', movies: [] };

    spyOn(moviesService, 'list').and.callFake( () => {
      return Observable.from
    });

    // moviesService.list()

    component.ngOnInit();

    fixture.detectChanges();
  
    expect(component.movies).toEqual([]);
  }));*/
});
