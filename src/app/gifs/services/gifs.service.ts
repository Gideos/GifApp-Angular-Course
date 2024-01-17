import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey:       string = 'HJOPJSTspXSovOlPOSfE1EIhsOlC4VyL';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';


  //Consumimos el servicio de HttpClient
  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    //Envia el primer valor de _tagHistory si esta vacio envia un arreglo vacio.
    this.searchTag(this._tagsHistory[0] || '');
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }


  //Guardar en el local storage
  private safeLocalStorage():void{
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  //Ordena la lista para evitar repitir tags
  private organizedHistory(tag: string):void{
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.safeLocalStorage();
  }

  //Leer local storage
  private loadLocalStorage():void{
    if( !localStorage.getItem('history') ) return;

    const temporal: string = localStorage.getItem('history')!;
    this._tagsHistory = JSON.parse(temporal);

    // if ( this._tagsHistory.length === 0 ) return;
    // this.searchTag(this._tagsHistory[0]);

  }

  //Funcion para añadir tags al arreglo _tagHistory
  async searchTag(tag: string):Promise<void>{
    if(tag.length === 0) return;
    this.organizedHistory(tag);
    //Parametros de la API
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    //Consulta de la API
    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`,{params})
      .subscribe( resp => {

        this.gifList = resp.data;

      } )


  }
}
