import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  title$ = new BehaviorSubject<string>('');

  get title() {
    return this.title$.asObservable();
  }

  change = (title: string) => {
    this.title$.next(title);
  };
}
