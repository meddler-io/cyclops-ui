
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textShowcase'
})
export class TextShowcasePipe implements PipeTransform {

  transform(val: string): string {
    let out = '';

    val?.split('_').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).forEach(str => {

      out += str + ' ';

    })

    return out
  }

}
