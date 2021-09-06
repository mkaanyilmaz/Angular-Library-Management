import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Books } from 'src/app/classes/books.model';
import { Departmant } from 'src/app/classes/departmants.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  isNewBookOpen: boolean;
  departmant: Departmant[] | null;
  selectedDepartmant: any;
  addButtonHidden:boolean;
  newBookName:any;
  newWriterName:string;
  fileName:string;
  isFileName:boolean;
  fileEvent: any;
  book: Books;

  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {

    await this.getDepartmant();
  }

  selectedd() {
    console.log(this.selectedDepartmant);
  }

  getDepartmant = async () => {
    await this.api.getDepartmants()
    .then(data => {
      this.departmant = data.departmant;
    })
    console.log(this.departmant);
  }

  base64 = () => {
    let event = this.fileEvent
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    let tempBookName = this.newBookName;
    let tempWriterName = this.newWriterName;
    reader.onload = async () => {
      console.log(this.newBookName);
      await this.addNewBook(reader.result,tempBookName,tempWriterName);
    };
  }

  addNewBook = async (_base64: any,_bookName:string,_writerName:string) => {
    debugger;
    let event = this.fileEvent
    const avatarFile = event.target.files[0];
    let name = event.target.files[0].name;
      this.book = new Books();
      this.book.BookName = _bookName;
      this.book.Writer = _writerName;
      this.book.Departmant = this.selectedDepartmant;
      this.book.ImagesBase64 = _base64;
      this.book.InStock = true;
        await this.api.insertBooks(this.book)
        .then(data2 => {
          console.log(data2);
          Swal.fire(
            'Good job!',
            'Added New Book',
            'success'
          )
        })
      this.fileEvent = [];
  }

  cancelButton = () => {
    this.addButtonHidden = false;
    this.isNewBookOpen = false;
    this.newWriterName = "";
    this.newBookName = "";
    this.fileName= "";
  }

  onFileSelected = async (event: any) => {
    this.fileEvent = event;
    this.fileName = event.target.files[0].name;
    this.isFileName = true;
  }
}
