import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { config } from 'config'

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  
  url = "https://api.themoviedb.org/3/movie";

  // Injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }  

  // Obtem o ultimo filme adicionado
  // getLatestMovieId(){
  //   this.httpClient.get(`${ this.apiURL }/`)
  //     .subscribe(
  //       resultado => {
  //         console.log(resultado)
  //       }        
  //     )
  // }

  // Obtem o ultimo filme adicionado
  getLatestMovieId(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.url}/latest?api_key=XXX&language=en-US`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }  

}
