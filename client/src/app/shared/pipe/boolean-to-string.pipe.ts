import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToString'
})
export class BooleanToStringPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value == true ? 'Oui' : 'Non';
  }

}
