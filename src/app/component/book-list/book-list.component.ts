import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ApiService } from 'src/app/api.service';
import { Books } from 'src/app/classes/books.model';
import { Departmant } from 'src/app/classes/departmants.model';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

customers: [];
books: Books[] | null;
book: Books | Books;
totalRecords: number;
cols: any[];
loading: boolean;
representatives: [];
displayModal:boolean;
showDialogWriter:string;
showDialogDepartmant:string;
showDialogBooksName:string;
showDialogUrl:string | undefined;
displayModalEdit:boolean;
newBookName:string;
newWriterName:string;
departmant: Departmant[] | null;
selectedDepartmant:any;
base64Image:any;

  
  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {
    await this.loadCustomers();
  } 

   async loadCustomers() {
            await this.api.getBooks()
              .then(data => {
                this.books = data.books
              })
            console.log(this.books);
    }

    deleteBookPermission = (Id: number) => {
      debugger;
      Swal.fire({
        title: 'Are you sure?',
        text: 'Are You Sure ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.isConfirmed) {
              this.deleteBook(Id);
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                
              }
          })
      }

    deleteBook = async (Id: number) => {
      await this.api.deleteBooks(Id)
      .then(data => {
        this.loadCustomers();
        console.log(data);
      })
    }

    showBook = async (books: Books) => {
      debugger;
      this.base64Image = books.ImagesBase64;
      this.showDialogBooksName = books.BookName;
      this.showDialogDepartmant = books.Departmant;
      this.showDialogWriter = books.Writer;
      let url: string = books.ImagesBase64!;
      let response = await this.api.getUrl(url)
      .then(data => {
        this.showDialogUrl = data?.publicURL;
      });
      this.displayModal= true;
    }

    editBooks = async (books: Books) => {
      await this.api.getDepartmants()
      .then(data => {
      this.departmant = data.departmant;
      })
      this.newBookName = books.BookName;
      this.newWriterName = books.Writer;
      this.displayModalEdit = true;
      this.book = books;
    }

    updateBook = async () => {
      this.book.BookName = this.newBookName;
      this.book.Writer = this.newWriterName;
      this.book.Departmant = this.selectedDepartmant;

      await this.api.updateBooks(this.book)
      .then(data => {
        console.log(data);
      })
      Swal.fire(
            'Good job!',
            'Edit Book',
            'success'
          );
        this.displayModalEdit = false;
    }

}
