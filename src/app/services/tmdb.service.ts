import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, EMPTY } from 'rxjs';
import { retry, catchError, retryWhen, delay, take, map, switchMap, mergeMap, filter, tap } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { MovieDiscover } from '../models/moviediscover';
import { config } from 'config'

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  
  url = "https://api.themoviedb.org/3/movie";
  url_discover =   "https://api.themoviedb.org/3/discover/movie";
  API_KEY = config.TMDB_API_KEY;

  movie = {} as Movie;
  movie_discover = {} as MovieDiscover;

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

  randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }  

  // Obtem o ultimo filme adicionado
  getLatestMovieId(): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.url}/latest?api_key=${this.API_KEY}&language=pt-BR`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  } 

  async getMovie(){    
    var pageRandom = this.randomInteger(1, 500);   
    let data = await this.getMoviesDiscoverList(pageRandom).toPromise();    
    var movieRandom = this.randomInteger(0, 19);            
    for(let i=0; i < movieRandom; i++){
      if(data.results[i].poster_path != null){
        console.log(data.results[i].id);
        return data.results[i];
      }
      this.getMovie();
    }
    return this.movie;

    // var pageRandom = this.randomInteger(1, 500);    
    // this.getMoviesDiscoverList(pageRandom). (movie_disc: MovieDiscover) => {
    //   var movieRandom = this.randomInteger(0, 19);            
    //   for(let i=0; i < movieRandom; i++){
    //     if(movie_disc.results[i].poster_path != null){
    //       console.log(movie_disc.results[i].id);
    //       return movie_disc.results[i] as Movie;
    //     }
    //   }
    //   return EMPTY;
    // })    
    // return EMPTY;
  }

  // Obtem uma lista de filmes
  getMoviesDiscoverList(page: number): Observable<MovieDiscover> {
    return this.httpClient.get<MovieDiscover>(`${this.url_discover}?api_key=${this.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&vote_average.gte=8&with_watch_monetization_types=flatrate`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }   
  
  // getMovie(id: number, latestId: number): Observable<Movie> {
  //   return of(this.url).pipe(
  //     switchMap(url => this.httpClient.get<Movie>(
  //       `${url}/${id}?api_key=${this.API_KEY}&language=en-US`
  //     ),
  //     )
  // )}

  // getTheMovie(id: number, latestId: number): Observable<Movie> {
  //   return Observable.timer(0).pipe(
  //     mergeMap(x => {
  //       this.random = this.padWithRandomLetter()
  //       return this.wordBankService.checkIfValidFragment(this.random).pipe(
  //         map(bool => {
  //           if (!bool) {
  //             throw (bool)
  //           }
  //           return this.random
  //         })
  //       )
  //     }),
  //     retry(26)
  //   )
  // }  

// getMovie(id: number, latestId: number): Observable<Movie> {
//     var id2 = id;
//     return this.httpClient.get<Movie>(`${this.url}/${id2}?api_key=${this.API_KEY}&language=en-US`)
//       .pipe(      
//         map(result => {
//           if(result.poster_path == null){
//             console.log("oie2");             
//             throw new Error();
//           }
//           return result;
//         }),
//         retryWhen((error) => {
//           console.log("kkk");       
//           return error.pipe(
//             tap(() => id = this.randomInteger(0, latestId)),
//             take(3)            
//           )
//         })
//       )         
//   }    

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

  handleError2(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      if(error.status == 404){
        return of()
      }

      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };  


}
