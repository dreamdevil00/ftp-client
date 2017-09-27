interface queueEntry {
  localPath: string
  serverPath: string
  isDirectory: boolean
  status: string
  size: number
}

export class Queue {

  static queue: any[] = []

  static listener: any

  static getEntries() {
    return this.queue
  }

  static addToQueueBulk(entries: any[]) {
    entries.forEach((item) => {
      this.queue.push(item)
    })
    this.sendToListener('transfer-add-bulk', entries)

  }

  static sendToListener(action, payload) {
    this.listener.onMessage(action, payload)
  }

  static transfer
  

}