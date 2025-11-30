import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flags.png,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.common,
      capital: restCountry.capital[0],
      population: restCountry.population,
    };
  }

  static mapRestCountryArrToCountryArr(country: RESTCountry[]): Country[] {
    return country.map(this.mapRestCountryToCountry);
  }
}
