import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '@core/constants/api';
import { Observable } from 'rxjs/internal/Observable';
import { IActor } from './actor.interface';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private baseUrl = BASE_URL;
  constructor(private httpClient: HttpClient) {}

  item = (item: any): Observable<IActor> =>
    this.httpClient.get<IActor>(`${this.baseUrl}/actors/${item}`);
}
