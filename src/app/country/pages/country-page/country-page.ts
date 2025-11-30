import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.html',
})
export class CountryPage {
  countryId = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['countryId'])
    )
  );
}
