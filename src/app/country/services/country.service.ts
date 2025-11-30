import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CountryMapper } from '../mappers/country.mapper';
import { map } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    const lowerCaseQuery = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${lowerCaseQuery}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountryArrToCountryArr(resp))
      );
  }
}
