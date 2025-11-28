import { Component } from '@angular/core';
import { CountryList } from "../../components/list/list";

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage { }
