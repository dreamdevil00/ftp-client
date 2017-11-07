import { UploaderFactory, UserInterface } from '../src';
import { Credentials, Entry } from '../src/interfaces';

class User implements UserInterface {

  constructor() {}

  sendMessage(action: string, data: any, callback: any) {
    console.log({
      action,
      data,
    });
  }

  onMessage(action: string, data: any, callback: any) {
    console.log({
      action,
      data,
    });
  }
}

const user = new User();

const credentials: Credentials = {
  host: '10.132.184.93',
  port: 21,
  user: 'demo',
  password: 'Passw0rd',
};


const uploader = UploaderFactory(credentials, user);

const files: Entry[] = [
  {
    id: 1,
    localPath: 'E:\\开发\\环境搭建\\strongloop\\vs2015\\vs2015.com_chs.iso',
    serverPath: '/world/vs2015.com_chs.iso',
    isDirectory: false,
    size: 4013920256,
  }
];

uploader.upload(files);
