import { Component, OnInit } from '@angular/core';
import { IBookmarks, IProfile } from 'src/app/service/auth.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  currentUser: IProfile[] = [];
  data : IBookmarks[]=[];
  getData:any;
  errorMessage: any;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('userData')!);
    this.authService.fetchBookmarks(this.currentUser[0].id)
    .subscribe((allBookmarks) =>{
      console.log(allBookmarks,'getBookmarks');
      this.getData = allBookmarks;
    })
  }

  onDelete(id:number){
    console.log(id);
    this.authService.deleteBookmark(id)
    .subscribe({
      next: (res) => {
        this.data = this.data.filter((g) => g.bookmark_id !== id);
        this.authService.fetchBookmarks(this.currentUser[0].id)
    .subscribe((allBookmarks) =>{
      console.log(allBookmarks,'getBookmarks');
      this.getData = allBookmarks;
    })
      },
      error: (e) => {
        console.log(e);
        this.errorMessage = e.error.errors;
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
