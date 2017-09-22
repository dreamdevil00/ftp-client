import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs/Rx'

@Component({
  template: `<p>正在重定向...</p>`
})
export class RouterComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<any>,
  ) {}

  private subscriptions: Subscription[] = []

  ngOnInit() {
    this.subscriptions.push(
      this.store
      .select('auth')
      .subscribe((res: any) => {
        return this.store
          .dispatch({type: res.loggedIn ? 'APP_REDIRECT_INDEX' : 'APP_REDIRECT_LOGIN' })
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}