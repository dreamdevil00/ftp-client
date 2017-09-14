import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment'
import 'moment/locale/zh-cn'

@Pipe({ name: 'LocalTime' })
export class LocalTimePipe implements PipeTransform {
  transform(value: any): string {
    return moment(value).local().format('YYYY 年 MM 月 DD 日')
  }
}