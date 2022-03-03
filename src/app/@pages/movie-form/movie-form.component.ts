import { AlertService } from '@shared/services/alert.service';
import { IMovie } from '@pages/movies/movie.interface';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationService, TitleService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { MoviesService } from '@pages/movies/movies.service';
import { IListField } from '@core/interfaces/form.interface';
import { configcreateMovieForm } from './form-configs';
import { TypeAlertEnum } from '@core/constants/alerts';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnDestroy {
  private readonly unsubscribe$ = new Subject();
  createItem: boolean = true;
  loading: boolean = true;
  createForm!: FormGroup;
  submitted: boolean = false;
  currentYear = new Date().getFullYear();
  selectedActors = []; // Usaré en actualización
  companiesList: Array<IListField> = [];
  actorsList: Array<IListField> = [];
  genresList: Array<string> = [];
  genresSelect: Array<string> = [];
  movie: IMovie | undefined = undefined;
  constructor(
    private formBuilder: FormBuilder,
    private titleService: TitleService,
    private translate: TranslateService,
    private navigationService: NavigationService,
    private moviesService: MoviesService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    this.loading = true;
    this.moviesService
      .formListElements()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.actorsList = data.actor;
        this.companiesList = data.companies;
      });
    this.translate.setDefaultLang('es');

    this.navigationService.isDetailsOrFormPage(true);

    if (window.location.hash.indexOf('edit') > -1) {
      this.createItem = false;
      this.route.paramMap
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((params: ParamMap) => {
          this.moviesService
            .get(Number(params.get('id')))
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(async (result) => {
              if (result.status) {
                this.movie = result.movie;
                console.log(this.movie);
                // Aquí para la edición tendré que añadir de coger el objeto seleccionado
                this.genresSelect = this.movie?.genre || [];
                this.createForm = this.formBuilder.group(
                  configcreateMovieForm([
                    this.movie?.title,
                    this.movie?.poster,
                    [],
                    {
                      id: this.movie?.company!.id,
                      label: this.movie?.company!.name,
                    },
                    this.movie?.actors.map((actor) => actor.id),
                    this.movie?.year,
                    this.movie?.duration,
                    this.movie?.imdbRating,
                  ])
                );

                this.loading = false;

                this.titleService.change(result.movie!.title);
              } else if (!result.status) {
                if (result.message.status === 404) {
                  this.alertService
                    .dialogConfirm(
                      'alerts.infoNotFound',
                      'alerts.infoNotFoundDescription',
                      TypeAlertEnum.ERROR
                    )
                    .then(() => {
                      this.navigationService.goTo('');
                    });
                  return;
                }
                this.alertService
                  .dialogConfirm(
                    'alerts.communicationOffTitle',
                    'alerts.communicationOffDescription',
                    TypeAlertEnum.ERROR
                  )
                  .then(() => {
                    this.navigationService.goTo('');
                  });
              }
            });
        });
    } else {
      // Aquí para la edición tendré que añadir de coger el objeto seleccionado
      this.createForm = this.formBuilder.group(configcreateMovieForm());
      // Nueva película
      this.titleService.change('navbarSidebar.moviesAdd');

      this.loading = false;
    }
  }

  get form() {
    return this.createForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.createForm.reset();
  }

  addElement(elementLabel: string) {
    if (
      ![null, undefined, ''].includes(
        this.createForm.controls[elementLabel].value
      )
    ) {
      this.addGenresList(this.createForm.controls[elementLabel].value);
    }
  }

  private addGenresList(genre: string) {
    if (
      !this.genresSelect
        .map((genre) => genre.toLowerCase())
        .includes(genre.toLowerCase())
    ) {
      this.genresSelect.push(genre);
    }
    // Aqui voy a guardar el valor en lo seleccionado
    this.createForm.controls['genre'].reset();
    console.log(this.createForm.value);
  }

  removeGenre (removeItem: string) {
    this.genresSelect = [...this.genresSelect.filter((genreItem) => genreItem != removeItem)]
  }

  resetForm() {
    if (window.location.hash.indexOf('edit') > -1) {
      this.navigationService.goTo('/movies/details/' + this.movie!!.id);
    }
    this.createForm = this.formBuilder.group(configcreateMovieForm());
    this.genresSelect.length = 0;
    this.actorsList.length = 0;
    this.selectedActors.length = 0;
  }

  onSubmit() {
    console.log(this.createForm.value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }

    // display form values on success
    const movieData: IMovie = this.createForm.value;
    const company = movieData.company;
    delete movieData['company'];
    movieData.genre = this.genresSelect;
    this.loading = true;
    if (this.createItem) {
      this.moviesService
        .add(movieData, company!.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          console.log(data);
          this.resetForm();
          this.loading = false;
          // Mostrar alerta para notificar que todo OK!
          this.alertService.dialogConfirm('cccc', '333', TypeAlertEnum.SUCCESS);
        });
      return;
    }
    console.log(movieData, company?.id, this.movie!.id);
    // Actualizar
    this.moviesService
      .update(movieData, company!.id, this.movie!.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        console.log(data);
        this.resetForm();
        this.loading = false;
        // Mostrar alerta para notificar que todo OK!
        this.alertService.dialogConfirm(
          'Actualizado',
          '333',
          TypeAlertEnum.SUCCESS
        );
      });
  }

  ngOnDestroy(): void {
    this.titleService.change('');
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
