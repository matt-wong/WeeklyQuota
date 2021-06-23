import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable()
export class IpcService {
  private _ipc: IpcRenderer | undefined = void 0;

  constructor() {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
        console.log(this._ipc);
      } catch (e) {
        console.log('no this._ipc');
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }

  public on(channel: string): void {
    if (!this._ipc) {
      return;
    }
    const listener = (event: any, args: []) : void => {
      console.log(args);
      console.log(event);
    }
    this._ipc.on(channel, listener);
  }

  public send(channel: string, arg: any): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.send(channel, arg);
  }

}