import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBusiness'
})
export class SearchBusinesssPipe implements PipeTransform {

  public transform(value, keys: string, term: string) {

    console.log('transform', value , keys, term)
    if (!term) return value;
    return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

  }


}
