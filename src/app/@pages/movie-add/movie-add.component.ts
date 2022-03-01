import { ICompany } from '@pages/companies/company.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationService, TitleService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { CompaniesService } from '@pages/companies/companies.service';
import { ActorService } from '@pages/actors/actor.service';
import { MoviesService } from '@pages/movies/movies.service';
import { IListField } from '@core/interfaces/form.interface';
import { configcreateMovieForm } from './form-configs';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css'],
})
export class MovieAddComponent implements OnInit {
  loading: boolean = true;
  createForm: FormGroup;
  submitted: boolean = false;
  currentYear = new Date().getFullYear();
  companySelect: ICompany = {
    name: '',
    country: '',
    createYear: -1,
    employees: -1,
    rating: 0,
    movies: [],
  };
  companiesList: Array<IListField> = [];
  actorsList: Array<IListField> = [];
  genresList: Array<string> = [];
  constructor(
    private formBuilder: FormBuilder,
    private titleService: TitleService,
    private translate: TranslateService,
    private navigationService: NavigationService,
    private companiesService: CompaniesService,
    private actorService: ActorService,
    private moviesService: MoviesService
  ) {
    this.createForm = this.formBuilder.group(configcreateMovieForm());
    // https://www.positronx.io/angular-url-validation-with-reactive-forms-tutorial/
    // https://www.positronx.io/angular-select-dropdown-with-reactive-forms-examples/
    // https://stackblitz.com/edit/ng-reactive-tpl-forms?file=src%2Fapp%2Freactive-forms%2Freactive-forms.component.html

    this.translate.setDefaultLang('es');
    this.titleService.change('navbarSidebar.moviesAdd');
    this.navigationService.isDetailsOrFormPage(true);
  }

  ngOnInit() {
    this.loading = true;
    this.companiesService.names().subscribe((result: Array<IListField>) => {
      this.companiesList = result;
      this.moviesService.genresList().subscribe((result: Array<string>) => {
        this.genresList = result;
        this.actorService.names().subscribe((result: Array<IListField>) => {
          this.actorsList = result;
          this.loading = false;
        });
      });
    });
  }

  get form() {
    return this.createForm.controls;
  }

  onSubmit() {
    console.log(this.createForm.value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.createForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.createForm.reset();
  }

  addGenre(event: any) {
    console.log(event.target?.value);
    console.log(this.createForm.value);
    // Aqui voy a guardar el valor en lo seleccionado
    this.createForm.controls['genres'].reset();
    console.log(this.createForm.value);
  }
}
