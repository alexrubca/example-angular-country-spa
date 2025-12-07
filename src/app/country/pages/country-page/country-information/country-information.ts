import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information-page',
  imports: [ DecimalPipe],
  templateUrl: './country-information.html',
})
export class CountryInformationPage {
  country = input.required<Country>();

  currentYear = computed(() => new Date().getFullYear());
}
