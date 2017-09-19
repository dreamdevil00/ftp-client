import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
  template: `<p>正在重定向...</p>`
})
export class RouterComponent implements OnInit {

  constructor(
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.store
      .select('auth')
      .subscribe((res: any) => {
        return this.store
          .dispatch({type: res.loggedIn ? 'APP_REDIRECT_INDEX' : 'APP_REDIRECT_LOGIN' })
      })
  }
}