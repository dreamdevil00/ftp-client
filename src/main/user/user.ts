import { main } from '../windows';
class User {
  // 用户接受信息
  sendMessage(action: string, payload: any, callback?: any): void {
    main.send('backEnd', action, payload);
    return callback && callback(null);
  }
  // 用户发送信息
  onMessage(action: string, payload: any, callback: any): void {

  }

  constructor() {

  }
}

export default new User();

