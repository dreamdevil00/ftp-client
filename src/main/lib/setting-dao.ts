import * as electronSettings from 'electron-settings';
import * as _ from 'lodash';

export enum Status {
  SUCCESS, // 0 成功
  FAILURE, // 1 失败
}

class SettingDAO {
  constructor() {}

  /**
   * 添加或者修改数据
   * @param keyPath 想要存储的键值的路径。 key可以不存在。
   * @param value 要存储的值。 必须是 JSON 支持的数据类型
   * @param callback 回调函数
   */
  set(keyPath: string, value: any, callback?: (status: Status, keyPath: string, value: any) => void) {
    let status = Status.SUCCESS;
    try {
      electronSettings.set(keyPath, value);
      if (!electronSettings.has(keyPath) || !_.isEqual(electronSettings.get(keyPath), value)  ) {
        status = Status.FAILURE;
      }
    } catch (e) {
      status = Status.FAILURE;
    }
    return callback && callback.call(this, status, keyPath, value);
  }
  /**
   * 获取存储数据
   * @param key 存储键值路径
   * @param callback 回调函数
   */
  get(keyPath: string, callback?: (status: Status, value: any) => void): any {
    let status = Status.SUCCESS;
    let value = null;
    try {
      if (electronSettings.has(keyPath)) {
        value = electronSettings.get(keyPath);
      } else {
        status = Status.FAILURE;
      }
    } catch (e) {
      status = Status.FAILURE;
    }
    return callback && callback.call(this, status, value);
  }

  /**
   * 获取所有设置
   * @param callback 回调函数
   */
  getAll(callback?: (status: Status, settings: Object) => void) {
    let status = Status.SUCCESS;
    let settings = null;
    try {
      settings = electronSettings.getAll();
    } catch (e) {
      status = Status.FAILURE;
    }
    return callback && callback.call(this, status, settings);
  }
  /**
   * 删除数据
   * @param key 存储键值
   * @param callback 回调函数
   */
  remove(keyPath: string, callback?: (status: Status) => void) {
    let status = Status.FAILURE;
    try {
      if (electronSettings.has(keyPath)) {
        electronSettings.delete(keyPath);
        status = Status.SUCCESS;
      }
    } catch (e) {}
    return callback && callback.call(this, status);
  }

  removeAll(callback?: (status: Status) => void) {
    let status = Status.SUCCESS;
    try {
      electronSettings.deleteAll();
    } catch (e) {
      status = Status.FAILURE;
    }
    return callback && callback.call(this, status);
  }
}

export const Setting =  new SettingDAO();

