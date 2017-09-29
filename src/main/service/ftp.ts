import * as Ftp from 'ftp';

export interface UploadItem {
  id?: number;
  localPath: string;
  fileName: string;
  progressCb: (id, progress) => void;
  resCb: (id, err, body?, code?) => void;
  size: number;
}

export class Upload {
  private MAX_UPLOAD_COUNT = 5;
  private queue: UploadItem[] = [];
  private uploadingCount = 0;
  private isUploading = false;

  constructor() {}

  public uploadFile(entry: UploadItem) {
    const id = entry.id || entry.localPath;

    const resumeUploader = new ResumeUploader();
    resumeUploader.upload(entry.localPath, entry.fileName, (err, body, resInfo) => {

      if (err) {
        entry.resCb(id, err);
      }
    })

  }
}

export class ResumeUploader {
  constructor() {}

  upload(localPath: string, fileName: string, func: (err, body, resInfo) => void) {

  }
}

