import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createApi } from "unsplash-js";
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Random } from 'unsplash-js/dist/methods/photos/types';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private api;
  private _imageUrl: string = "";

  public get imageUrl(): string {
    return this._imageUrl;
  }

  constructor(private httpClient: HttpClient) {
    this.api = createApi({
      accessKey: "3n2GVbK1fBoOo_XA7rtKIJQidzZBPAL9qpgqHLdg-Es"
    });
  }

  getImage(){
    return this.api.photos.getRandom({query: 'calm,success,aquascape', orientation:'landscape'})
    .then(result => {
      const asSingleResp: Random = result.response as Random;
      if (asSingleResp) {
        this._imageUrl = asSingleResp.urls.regular;
        return asSingleResp.urls.regular;
      }else{
        return ''
      }
    })
    .catch(() => {
      console.log("something went wrong!");
    });
  }



}
