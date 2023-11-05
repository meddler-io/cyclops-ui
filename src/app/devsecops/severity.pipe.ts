import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'severity'
})
export class SeverityPipe implements PipeTransform {


  percentColors = [
    { pct: 0.0, color: { r: 43, g: 200, b: 25 } },
    { pct: 0.5, color: { r: 255, g: 178, b: 0 } },
    { pct: 1.0, color: { r: 240, g: 14, b: 74 } },
    // { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    // { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } }

  ];

  getColorForPercentage(pct) {

    let color;

    if (pct < 30)
      color = this.percentColors[0].color


    else if (pct < 60)
      color = this.percentColors[1].color

    else

      color = this.percentColors[2].color


    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';

    // pct = pct / 100
    // // pct = 1 - pct

    // for (var i = 1; i < this.percentColors.length - 1; i++) {
    //   if (pct < this.percentColors[i].pct) {
    //     break;
    //   }
    // }
    // var lower = this.percentColors[i - 1];
    // var upper = this.percentColors[i];
    // var range = upper.pct - lower.pct;
    // var rangePct = (pct - lower.pct) / range;
    // var pctLower = 1 - rangePct;
    // var pctUpper = rangePct;
    // var color = {
    //   r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    //   g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    //   b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    // };
    // return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    // or output as hex if preferred
  };


  transform(value: string | number, ...args: string[]): unknown {
    // return null;

    if (value == undefined)
      value = ''
    // console.log('color_severity', value, args)

    if (args.indexOf('color') >= 0) {

      switch (value.toString().toLowerCase()) {

        case 'low':
          return '#bfbfc3'
        case 'medium':
          return '#ffc94d'

        case 'high':
          return '#ff708d'

        case 'critical':
          return '#f90d0d'

      }
      return '#bfbfc3'
    }

    // return 'basic'

    switch (value.toString().toLowerCase()) {
      case 'low':
        return 'basic'
      case 'medium':
        return 'warning'

      case 'high':
        return 'danger'

      case 'critical':
        return 'danger'
    }
    return 'basic'

  }

}
