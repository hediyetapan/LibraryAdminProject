import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent {
  @Input() bookId: number|undefined;
  @Output() bookDeleted: EventEmitter<void> = new EventEmitter<void>();

  
  deleteIcon:IconDefinition = faTrash;

  constructor(private bookService: BookService){}

  deleting: boolean = false;
  deleteBook(): void{
    
    this.deleting = true;
    this.bookService.deleteBook(this.bookId).subscribe(() => {
      this.deleting = false;
      this.bookDeleted.emit();
      console.log("deleted");
    });
  }

  
}
