import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '@country/interfaces/country.interface';
import { environment } from '@environments/environment';
import { combineLatest, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private baseUrl = environment.restCountries;
  private http = inject(HttpClient);

  private cacheRegion = new Map<string, Country[]>();
  private cacheByAlphaCode = new Map<string, Country>();

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);

    if (this.cacheRegion.has(region)) return of(this.cacheRegion.get(region)!)

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url)
      .pipe(
        tap(countries => this.cacheRegion.set(region, countries))
      );
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {

    if (this.cacheByAlphaCode.has(alphaCode)) return of(this.cacheByAlphaCode.get(alphaCode)!);

    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url)
      .pipe(
        tap(country => this.cacheByAlphaCode.set(alphaCode, country))
      );
  }

  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
    if (!countryCodes || countryCodes.length === 0) return of([]);

    const countriesRequests: Observable<Country>[] = [];

    countryCodes.forEach((code) => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    });

    return combineLatest(countriesRequests);
  }
}
