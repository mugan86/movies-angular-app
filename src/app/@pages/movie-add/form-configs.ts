import { Validators } from '@angular/forms';
import { URL_VALIDATION_REGEX } from '@core/constants/regex';

export const configcreateMovieForm = () => {
  return {
    title: ['', Validators.required],
    poster: [
      '',
      [Validators.required, Validators.pattern(URL_VALIDATION_REGEX)],
    ],
    genres: [''],
    company: [null, [Validators.required]],
    actors: [null, [Validators.required]],
    year: [
      `${new Date().getFullYear()}`,
      [
        Validators.required,
        Validators.max(new Date().getFullYear()),
        Validators.min(2000),
      ],
    ],
    duration: [
      '120',
      [Validators.required, Validators.max(300), Validators.min(70)],
    ],
    rating: ['5', Validators.required],
  };
};



