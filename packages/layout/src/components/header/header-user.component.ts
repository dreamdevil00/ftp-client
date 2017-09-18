import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { get } from 'lodash'

@Component({
  selector: 'layout-header-user',
  template: `
  `
})
export class HeaderUserComponent {
  public user: any

  constructor(
    private store: Store<any>,
  ) {
    this.store
      .select('auth')
      .subscribe((res: any) => this.user = get(res, 'currentUser.user', {}))
  }
}