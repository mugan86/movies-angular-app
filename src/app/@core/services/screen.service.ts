import { IScreen } from '@core/interfaces/screen.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  screen = new BehaviorSubject<IScreen>({
    width: 0,
    height: 0,
  });
  screen$ = this.screen.asObservable();

  setSize(size: IScreen) {
    this.screen.next(size);
  }
}
