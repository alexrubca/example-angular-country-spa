import { Component } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/list/list";

@Component({
  selector: 'app-by-country-page',
    imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage { }
