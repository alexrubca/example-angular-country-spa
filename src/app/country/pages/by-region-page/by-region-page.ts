import { Component, inject, linkedSignal } from '@angular/core';
import { CountryList } from "../../components/list/list";
import { RegionsList } from "./regions-list/regions-list";
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/regions.interface';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  const queryParamLowercase = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic'
  };

  return validRegions[queryParamLowercase] || 'Africa';
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList, RegionsList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  region = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

  regionResource = rxResource({
    params: () => ({ region: this.region() }),
    stream: ({ params }) => {
      if (!params.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: { region: params.region }
      });

      return this.countryService.searchByRegion(params.region);
    }
  });
}
