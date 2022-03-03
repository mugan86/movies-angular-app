import { AlertService } from '@shared/services/alert.service';
import { IMovie } from '@pages/movies/movie.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationService, TitleService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { MoviesService } from '@pages/movies/movies.service';
import { IListField } from '@core/interfaces/form.interface';
import { configcreateMovieForm } from './form-configs';
import { TypeAlertEnum } from '@core/constants/alerts';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();
  loading: boolean = true;
  createForm: FormGroup;
  submitted: boolean = false;
  currentYear = new Date().getFullYear();
  selectedActors = []; // Usaré en actualización
  companiesList: Array<IListField> = [];
  actorsList: Array<IListField> = [];
  genresList: Array<string> = [];
  genresSelect: Array<string> = [];
  constructor(
    private formBuilder: FormBuilder,
    private titleService: TitleService,
    private translate: TranslateService,
    private navigationService: NavigationService,
    private moviesService: MoviesService,
    private alertService: AlertService
  ) {
    // Aquí para la edición tendré que añadir de coger el objeto seleccionado
    this.createForm = this.formBuilder.group(configcreateMovieForm());

    this.translate.setDefaultLang('es');
    this.titleService.change('navbarSidebar.moviesAdd');
    this.navigationService.isDetailsOrFormPage(true);

    this.createForm.get('actors')!.valueChanges.subscribe((val) => {
      // tu código
      this.selectedActors = val;
    });
  }

  ngOnInit() {
    this.loading = true;
    this.moviesService
      .formListElements()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.actorsList = data.actor;
        this.companiesList = data.companies;
        this.loading = false;
      });
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
    if (!this.genresSelect.includes(genre)) {
      this.genresSelect.push(genre);
    }
    // Aqui voy a guardar el valor en lo seleccionado
    this.createForm.controls['genre'].reset();
    console.log(this.createForm.value);
  }

  resetForm() {
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
    this.moviesService
      .add(movieData, company!.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.resetForm();
        this.loading = false;
        // Mostrar alerta para notificar que todo OK!
        this.alertService.dialogConfirm('cccc', '333', TypeAlertEnum.SUCCESS);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
