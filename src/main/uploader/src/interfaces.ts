export interface Entry {
  id: string | number;
  localPath: string;
  serverPath: string;
  size: number;
  isDirectory: boolean;
  status?: any;
  error?: any;
}

export interface Credentials {
  host: string;
  port: number;
  user: string;
  password: string;
}

export interface UserInterface {
  sendMessage: (action: string, data: any, callback: any) => void;
  onMessage: (action: string, data: any, callback: any) => void;
}

