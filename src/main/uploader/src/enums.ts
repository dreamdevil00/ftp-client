/**
 * 文件传输过程中所有可能的状态
 */
export enum ReadyState {
  Ready,
  Transferring,
  Complete,
  Cancelled,
  Error,
}
