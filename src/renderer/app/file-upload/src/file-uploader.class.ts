import { FileItem } from './file-item.class';

export class FileUploader {
  public isUploading = false;
  public queue: Array<any> = [];
  public progress = 0;

  constructor() {}

  public addToQueue(files: any[]) {
    files.forEach(item => {
      this.queue.push(item);
    });
    console.dir(this.queue);
  }

  public clearQueue(): void {

  }
}
