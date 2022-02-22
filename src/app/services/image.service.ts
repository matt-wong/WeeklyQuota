import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createApi } from "unsplash-js";
import { Random } from 'unsplash-js/dist/methods/photos/types';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private api;
  private _imageUrl: string = "";
  readonly BACKUP_IMAGE_URL = 'https://cdn.pixabay.com/photo/2016/10/23/22/52/landscape-1764990_1280.jpg';

  public get imageUrl(): string {
    return this._imageUrl;
  }

  constructor(private httpClient: HttpClient) {
    this.api = createApi({
      accessKey: "3n2GVbK1fBoOo_XA7rtKIJQidzZBPAL9qpgqHLdg-Es"
    });
  }

  getImage(){
    return this.api.photos.getRandom({collectionIds: ['137627','1927776', '8374700'], orientation:'landscape'})
    .then(result => {
      const asSingleResp: Random = result.response as Random;
      if (asSingleResp) {
        this._imageUrl = asSingleResp.urls.regular;
        return asSingleResp.urls.regular;
      }else{
        return this.BACKUP_IMAGE_URL;
      }
    })
    .catch(() => {
      console.log("something went wrong!");
      return this.BACKUP_IMAGE_URL;
    });
  }



}
