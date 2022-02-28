import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  inDetails = new Subject<boolean>();
  inDetails$ = this.inDetails.asObservable();
  constructor(private location: Location) {}

  isDetailsPage(details: boolean) {
    this.inDetails.next(details);
  }

  back(): void {
    this.location.back();
  }
}
