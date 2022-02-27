import { ICompany } from './company.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '@core/constants/api';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private baseUrl = BASE_URL;
  constructor(private httpClient: HttpClient) {}

  list = (): Observable<ICompany[]> =>
    this.httpClient.get<ICompany[]>(`${this.baseUrl}/companies`);

  item = (item: any): Observable<ICompany> =>
    this.httpClient.get<ICompany>(`${this.baseUrl}/companies/${item}`);
}

