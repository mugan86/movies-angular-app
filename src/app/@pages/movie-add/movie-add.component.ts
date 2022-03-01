import { ICompany } from '@pages/companies/company.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService, TitleService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { CompaniesService } from '@pages/companies/companies.service';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css'],
})
export class MovieAddComponent implements OnInit {
  loading: boolean = true;
  createForm: FormGroup;
  yearLimit: number = new Date().getFullYear();
  submitted: boolean = false;
  companySelect: ICompany = {
    name: '',
    country: '',
    createYear: -1,
    employees: -1,
    rating: 0,
    movies: []
  }
  companiesList: Array<ICompany> = [];
  constructor(
    private formBuilder: FormBuilder,
    private titleService: TitleService,
    private translate: TranslateService,
    private navigationService: NavigationService,
    private companiesService: CompaniesService
  ) {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      poster: ['', [Validators.required]],
      company: [null, [Validators.required]],
      year: [
        `${this.yearLimit}`,
        [
          Validators.required,
          Validators.max(this.yearLimit),
          Validators.min(2000),
        ],
      ],
      duration: [
        '120',
        [Validators.required, Validators.max(300), Validators.min(70)],
      ],
      rating: ['5', Validators.required],
    });
    // https://www.positronx.io/angular-select-dropdown-with-reactive-forms-examples/
    // https://stackblitz.com/edit/ng-reactive-tpl-forms?file=src%2Fapp%2Freactive-forms%2Freactive-forms.component.html

    this.translate.setDefaultLang('es');
    this.titleService.change('');
    this.navigationService.isDetailsPage(true);
  }

  ngOnInit() {
    this.loading = true;
    this.companiesService.list().subscribe((companies) => {
      this.companiesList = companies;
      this.loading = false;
    });
  }

  get form() {
    return this.createForm.controls;
  }

  onSubmit() {
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

  changeCompany = (event: Event) => {
    console.log()
  };
}
