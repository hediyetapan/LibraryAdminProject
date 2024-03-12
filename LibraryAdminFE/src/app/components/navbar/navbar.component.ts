import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  page = "book";

  SearchedItem!: string;
  @Output() chosenPage: EventEmitter<string> = new EventEmitter();
  //@Output() showItems: EventEmitter<string> = new EventEmitter();

  /*SearchedItemHandler(searchedItem: string){
    this.SearchedItem = searchedItem;
    this.showItems.emit(this.SearchedItem);
    console.log("From navbar/SearchedItemHandler()/searchedItem: "+searchedItem);
  }*/
}
