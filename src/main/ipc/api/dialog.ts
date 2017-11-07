import { dialog } from 'electron';
import { main } from '../../windows';

function openFile() {
  if (!main.win) {
    return;
  }
  const opts: Electron.OpenDialogOptions = {
    title: '选择文件',
    properties: ['openFile'],
  };
  showOpen(opts);
}

function openDirectory() {
  if (!main.win) {
    return;
  }
  const opts: Electron.OpenDialogOptions = {
    title: '选择文件夹',
    properties: ['openDirectory'],
  };
  showOpen(opts);
}

function showOpen(opts: Electron.OpenDialogOptions) {
  dialog.showOpenDialog(opts, function(selectedPaths) {
    if (!Array.isArray(selectedPaths)) {
      return;
    }
    main.dispatch('addToTransferQueue', selectedPaths);
  });
}

const DialogApi = {
  openFile,
  openDirectory,
};

export default DialogApi;

