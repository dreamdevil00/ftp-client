import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Rx'
import { FtpService } from '@dream/ftp-sdk'

@Injectable()
export class AuthService {

  constructor(
    private service: FtpService
  ) {}

  login(credentials) {
    return this.service.connect(credentials)
  }

  logout() {
    return this.service.disconnect()
  }
}