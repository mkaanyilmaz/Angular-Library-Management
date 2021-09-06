import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { LazyLoadEvent } from 'primeng/api';
import { Books } from './classes/books.model';
import { Departmant } from './classes/departmants.model';
import {decode} from 'base64-arraybuffer'
import { SupabaseEventTypes } from "@supabase/supabase-js/dist/main/lib/types";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  supabaseUrl = "https://qvllpneotfeflhuvnpmz.supabase.co";
  supabaseKey =   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDgzNDI0OCwiZXhwIjoxOTQ2NDEwMjQ4fQ.4GGG_2aO_rerHPr3iUW_nfySUagduUqiMCelIcZ7PYU";
  supabase: SupabaseClient;
  
  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }  

  async getBooks() {
    let { data: books, error } = await this.supabase
      .from<Books>('Books')
      .select('*')
    return { books, error };
  }

  async getBooksSub() {
    const mySubscription = this.supabase
    .from('countries')
    .on('*', payload => {
      console.log('Change received!', payload)
    })
    .subscribe()
  }
  

  async deleteBooks(id: number) {
    debugger;
    const data = await this.supabase
      .from('Books')
      .delete()
      .match({ id: id })
    return data
  }

  async insertBooks(books: Books) {
    const { data, error } = await this.supabase
      .from('Books')
      .insert(books)
      return data
  }

  async updateBooks(books: Books) {
    const { data, error } = await this.supabase
      .from('Books')
      .update(books)
      .match({ id: books.id })
      return data
  }

  async getDepartmants() {
    let { data: departmant, error} = await this.supabase
    .from<Departmant>('Departmant')
    .select("*")
    return { departmant, error };
  }

  async uploadPhoto(avatarFile:any,name: string) {
    const { data, error } = await this.supabase
    .storage
    .from('image-bucket')
    .upload("public/" + name, decode('base64FileData'), {
      contentType: 'image/png'
    })
    return data;
  }

  async getUrl(url:string) {
  let res = this.supabase
  .storage
  .from('public-bucket')
  .getPublicUrl(url);

    return res.data;
  }

  
    

}
