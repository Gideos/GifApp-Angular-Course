import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor( private gifsServices:GifsService ){}

  //Retorna los valores del getter tagsHistory y los almacena en una propiedad llamada tags, para poder ser consumida
  get tags(){
    return this.gifsServices.tagsHistory;
  }

  searchTag(tag: string): void{
    this.gifsServices.searchTag(tag);
  }

}
