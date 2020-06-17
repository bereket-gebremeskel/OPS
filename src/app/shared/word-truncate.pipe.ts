import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class WordTruncatePipe implements PipeTransform {

  transform(value: string, args?: number): any {
    return value.substring(0,args +1);
  }

}
