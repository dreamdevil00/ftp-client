import { Queue } from './queue'

export class FtpUser {

  static user: any

  constructor() {
    FtpUser.user = this
    Queue.listener = this
  }

  onMessage(action, payload) {
    switch(action) {
      case 'transfer-add-bulk':
        return
    }
  }

  sendMessage() {

  }
}