import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-completion-page',
  templateUrl: './completion-page.component.html',
  styleUrls: ['./completion-page.component.scss']
})
export class CompletionPageComponent implements OnInit {

  public imageUrl: string = "";

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getImage()
  }

  getImage(){
    this.imageService.getImage().then((url: string | void) => {
      if (url){
        this.imageUrl = url;
      }
    });
  }
}
