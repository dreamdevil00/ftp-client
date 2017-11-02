import { ReadyState } from './enums';
import { Entry, UserInterface } from './interfaces';

export class Queue {

  private _curSize = 0;
  private _queue: Entry[] = [];

  constructor(
    private messager?: UserInterface,
  ) {
  }

  /**
   * 添加传输项道队列中
   * @param entry
   */
  addEntry(entry: Entry) {
    entry.status = ReadyState.Ready;
    this._queue.push(entry);
    this._curSize = this._queue.length;
    if (this.messager) {
      this.messager.sendMessage('queue-update', null, null);
    }
  }

  /**
   * 删除 传输项
   * @param id 传输项ID
   */
  removeEntry(id: string | number) {
    const index = this.getIndexById(id);
    if (index !== -1) {
      this._queue.splice(index, 1);
      this._curSize = this._queue.length;
    }
    if (this.messager) {
      this.messager.sendMessage('queue-update', null, null);
    }
  }

  /**
   * 获取所有传输项
   */
  getEntries(): Entry[] {
    return this._queue;
  }

  /**
   * 添加多个传输项
   * @param entries 要添加的传输项
   */
  addEntries(entries: Entry[]) {
    entries.forEach((entry: Entry) => {
      entry.status = ReadyState.Ready;
      entry.error = null;
      this._queue.push(entry);
    });
    this._curSize = this._queue.length;
    if (this.messager) {
      this.messager.sendMessage('queue-update', null, null);
    }
  }

  /**
   * 获取当前队列大小
   */
  size(): number {
    return this._curSize;
  }

  /**
   * 设置传输项的状态
   * @param id 传输项ID
   * @param status 传输状态
   * @param error 错误信息
   */
  setEntryStatus(id: number | string, status: ReadyState, error?: Error) {
    const entry = this.getEntryById(id);
    if (entry) {
      entry.status = status;
      entry.error = error || null;
      if (this.messager) {
        this.messager.sendMessage('queue-update', null, null);
      }
    }
  }

  /**
   * 通过 ID 获取传输项
   * @param id 传输项ID
   */
  getEntryById(id: number| string): Entry | null {
    for (let i = 0; i < this._queue.length; i++) {
      if (this._queue[i].id === id) {
        return this._queue[i];
      }
    }
    return null;
  }

  /**
   * 获取下一个处于准备状态的传输项
   */
  nextReadyEntry(): Entry | null {
    for (let i = 0; i < this._queue.length; i++) {
      if (this._queue[i].status === ReadyState.Ready) {
        return this._queue[i];
      }
    }
    return null;
  }

  private getEntryByIndex(index: number): Entry | null {
    if (index < 0) {
      return null;
    }
    return this._queue[index];
  }

  private getIndexById(id: string | number): number {
    for (let i = 0; i < this._queue.length; i++) {
      if (this._queue[i].id === id) {
        return i;
      }
    }
    return -1;
  }

}
