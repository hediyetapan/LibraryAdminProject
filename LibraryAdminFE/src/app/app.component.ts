import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Library Admin';
  displayedBooks!: string;
  chosenPage: string = "books";

  ngOnInit(){
    console.log(this.displayedBooks);
    //setTimeout(() => { this.ngOnInit(); }, 1000 * 1);
  }

  openPage(whichPage: string){
    this.chosenPage = whichPage;
    console.log("From: app-component/openPage()/chosenPage:"+this.chosenPage);
  }

  listBooks(searchKey: string){
    this.displayedBooks = searchKey;
    console.log("From: app-component/listBooks()/displayedBooks:"+this.displayedBooks);
  }
}
