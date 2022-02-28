import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService, TitleService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent {
  createForm: FormGroup;
  yearLimit: number = new Date().getFullYear();
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private titleService: TitleService,
    private translate: TranslateService,
    private navigationService: NavigationService) { 
    this.createForm = this.formBuilder.group(
      {
        title: ["", Validators.required],
        poster: ["", [Validators.required]],
        // duration: ["120", [Validators.required, Validators.max(300), Validators.min(70)]],
        // rating: ["5", Validators.required,  Validators.max(10), Validators.min(1)]
      }
    );

    this.translate.setDefaultLang('es');
    this.titleService.change('');
    this.navigationService.isDetailsPage(true);
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
    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.createForm.value, null, 4)
    );
  }

  onReset() {
    this.submitted = false;
    this.createForm.reset();
  }

}
