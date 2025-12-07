import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CountryMapper } from '../mappers/country.mapper';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  queryCacheCapital = new Map<string, Country[]>();
  queryCacheCountry = new Map<string, Country[]>();
  queryCacheRegion = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();

    if (this.queryCacheCapital.has(lowerCaseQuery)) {
      return of(this.queryCacheCapital.get(lowerCaseQuery) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${lowerCaseQuery}`)
      .pipe(
        map(resp => CountryMapper.mapRestCountryArrToCountryArr(resp)),
        tap(countries => this.queryCacheCapital.set(lowerCaseQuery, countries)),
        catchError(error => {
          console.log('Error fetching ', error);
          return throwError(() => new Error('No se pudo obtener países con esa búsqueda'));
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const lowerCaseQuery = query.toLowerCase();
    const url = `${API_URL}/name/${lowerCaseQuery}`;

    if (this.queryCacheCountry.has(lowerCaseQuery)) {
      return of(this.queryCacheCountry.get(lowerCaseQuery) ?? []);
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map(resp => CountryMapper.mapRestCountryArrToCountryArr(resp)),
      tap(countries => this.queryCacheCountry.set(lowerCaseQuery, countries)),
      delay(1000),
      catchError(error => {
        console.log('Error fetching ', error);
        return throwError(() => new Error('No se pudo obtener países con esa búsqueda'));
      })
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | undefined> {
    const lowerCaseCode = code.toLowerCase();
    const url = `${API_URL}/alpha/${lowerCaseCode}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map(resp => CountryMapper.mapRestCountryArrToCountryArr(resp)),
      map(countries => countries.at(0)),
      catchError(error => {
        console.log('Error fetching ', error);
        return throwError(() => new Error(`No se pudo obtener un país con ese código ${code}`));
      })
    );
  }

  searchByRegion(region: string): Observable<Country[]> {
    const url = `${API_URL}/region/${region}`;

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map(resp => CountryMapper.mapRestCountryArrToCountryArr(resp)),
      tap(countries => this.queryCacheRegion.set(region, countries)),
      catchError(error => {
        console.log('Error fetching ', error);
        return throwError(() => new Error('No se pudo obtener países'));
      })
    );
  }
}
