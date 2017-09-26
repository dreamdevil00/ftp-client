interface queueEntry {
  id: number
  localPath: string
  serverPath: string
  isDirectory: boolean
  status: string
  size: number
}

export class Queue {

  queue: any[]

  static listeners: any[] = []

  

}