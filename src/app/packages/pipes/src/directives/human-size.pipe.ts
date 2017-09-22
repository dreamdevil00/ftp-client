import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'HumanSize' })
export class HumanSizePipe implements PipeTransform {
  transform(value: any): string {
    value = parseInt(value)
    const map = ['Byte', 'KB', 'MB', 'GB', 'TB']
    let i = 0;
    while((value / 1024) > 1) {
      value = value / 1024
      i += 1
    }
    return value.toFixed(2) + map[i]
  }
}