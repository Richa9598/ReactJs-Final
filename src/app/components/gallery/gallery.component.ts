import { Component, OnInit } from '@angular/core';
import { GalleryService, IGallery } from 'src/app/service/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  searchValue: string = '';
  gallery: IGallery[] = [];
  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.galleryService.getGallery().subscribe((data) => {
      this.gallery = data;
      console.log(this.gallery[0].img_url);
    });
    
  }
  getImgUrl(url: string): string {
    console.log('./assests/' + url);
    return './assets/' + url;
  }

}
