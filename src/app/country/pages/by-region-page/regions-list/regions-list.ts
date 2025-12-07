import { Component, input, linkedSignal, output } from '@angular/core';
import { Region } from '../../../interfaces/regions.interface';

@Component({
  selector: 'app-regions-list',
  imports: [],
  templateUrl: './regions-list.html',
})
export class RegionsList {
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  initialValue = input<Region>();

  selectedRegionOutput = output<Region>();

  selectedRegion = linkedSignal<Region>(() => this.initialValue() ?? 'Africa');

  onRegionSelected(region: Region) {
    this.selectedRegion.set(region);
    this.selectedRegionOutput.emit(region);
  }
}
