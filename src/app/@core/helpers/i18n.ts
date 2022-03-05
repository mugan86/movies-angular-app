import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient, private prefix: string = 'en') {}
  public getTranslation(lang: string): any {
    return this.http.get(
      './assets/@data/i18n/' + this.prefix + '/' + lang + '.json'
    );
  }
}
