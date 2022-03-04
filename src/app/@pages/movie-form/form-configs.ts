import { Validators } from '@angular/forms';
import { URL_VALIDATION_REGEX } from '@core/constants/regex';

export const configcreateMovieForm = (initForm: any = []) => {
  if (initForm.length === 0) { // Creación de nuevo elemento con ajuste predefinidos
    initForm = ['', '', '', null, [], new Date().getFullYear(), 120, 5];
  }
  return {
    title: [initForm[0], Validators.required],
    poster: [
      initForm[1],
      [Validators.required, Validators.pattern(URL_VALIDATION_REGEX)],
    ],
    genre: [initForm[2]],
    company: [initForm[3], [Validators.required]],
    actors: [initForm[4]],
    year: [
      initForm[5],
      [
        Validators.required,
        Validators.max(new Date().getFullYear()),
        Validators.min(1950),
      ],
    ],
    duration: [
      initForm[6],
      [Validators.required, Validators.max(300), Validators.min(70)],
    ],
    imdbRating: [initForm[7], Validators.required],
  };
};
