import { Injectable, Output, EventEmitter } from '@angular/core';
import { IpcRenderer } from 'electron';
import { quotaTopic } from '../week-table/week-table.model';

@Injectable()
export class IpcService {
  private _ipc: IpcRenderer | undefined = void 0;

  @Output() loadEvent: EventEmitter <quotaTopic[]> = new EventEmitter;

  constructor() {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
        
        if (!this._ipc) {
          return;
        }

        //Set up Logging from electron
        const listener = (event: any, args: []) : void => {
          console.log(args);
          console.log(event);
        }
        this._ipc.on('log', listener);

        
        //Set up Logging from electron
        const loadListener = (event: any, args: []) : void => {
          console.log('LOADING FROM Electron');
          console.log(args);
          this.loadEvent.emit(<quotaTopic[]>args);
        }
        this._ipc.on('load', loadListener);

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