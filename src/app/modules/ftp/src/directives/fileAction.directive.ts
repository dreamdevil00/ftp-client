import { Directive, HostListener } from '@angular/core'
import { Store } from '@ngrx/store'

import * as ftp from '../../../../packages/ftp-sdk'

@Directive({
  selector: '.intoDir'
})
export class IntoDirDirective {
  
  constructor(
    private store: Store<any>,
  ) {}


  private static intoDir(dir) {

  }

  @HostListener('dblclick', ['$event'])
  ondblclick($event: any): void {
    console.log('triggered')
    console.dir($event)
    
    $event.preventDefault()
    /*
    this.store
      .dispatch(new ftp.FtpReadDirAction()) */
  }
}