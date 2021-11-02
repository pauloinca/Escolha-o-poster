import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { Movie } from '../models/movie';
import { timer, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movie = {} as Movie;
  image1Src: string = "../../assets/images/image1.png";
  image2Src: string = "../../assets/images/image1.png";
  // movies: Movie;

  constructor(private tmdbService: TmdbService) { }

  randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit() {    
    this.tmdbService.getMovie().then((x: Movie[]) => {         
      // console.log(x.poster_path);
      this.image1Src = `https://image.tmdb.org/t/p/w500${x[0].poster_path}`;       
      this.image2Src = `https://image.tmdb.org/t/p/w500${x[1].poster_path}`;       
    });
    // this.tmdbService.getMovie().then((x: Movie[]) => {         
    //   console.log(x.poster_path);
    //   this.image2Src = `https://image.tmdb.org/t/p/w500${x.poster_path}`;       
    // });    


    // promise.then(x => {
    //   console.log("B");
    //   console.log(x);
    // })


    // this.tmdbService.getMovie().pipe(switchMap(x => {
    //   console.log("oi");
    //   return x.poster_path;
    // }))
    // .subscribe(y => {
    //   console.log(y);
    // })

    // this.tmdbService.getMovie().subscribe((movie: Movie) => {
    //   this.movie = movie;  
    //   this.imageSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;    
    // })
    

    // console.log(this.movie.id);
    
    // timer(1000).subscribe(x => {  })    
    
  }

  // // Chama o serviço que obtem o ultimo filme
  // getLatestMovie(){
  //   this.tmdbService.getLatestMovieId().subscribe((movie: Movie) => {      
  //     this.movie = movie;
  //     var randomId = this.randomInteger(0, this.movie.id);
  //       this.tmdbService.getMovie(randomId, this.movie.id).subscribe((movie: Movie) => {          
  //         console.log(movie);
  //       });
  //     // console.log(this.movie.id);
  //   });
  // }

}
