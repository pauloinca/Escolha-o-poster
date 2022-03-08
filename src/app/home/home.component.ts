import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { Movie } from '../models/movie';
import { timer, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none'
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)'
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {

  movie = {} as Movie;
  image1Src: string = "../../assets/images/image1.png";
  image2Src: string = "../../assets/images/image1.png";
  // movies: Movie;

  data1 = {
    state: "flipped"
  };

  data2 = {
    state: "default"
  };

  constructor(private tmdbService: TmdbService) { }


  randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async card1Clicked() {
    if (this.data1.state === "flipped") {
      this.data1.state = "default";
      await this.getPoster1();
      setTimeout(() => this.data1.state = "flipped", 200);
      // this.data1.state = "flipped";
      // this.data1.state = "default";
    }
  }

  card2Clicked() {

  }

  async getPoster1() {
    return this.tmdbService.getMovie().then((x: Movie[]) => {
      this.image1Src = `https://image.tmdb.org/t/p/w500${x[0].poster_path}`;
    });
  }

  getPoster2() {
    this.tmdbService.getMovie().then((x: Movie[]) => {
      this.image1Src = `https://image.tmdb.org/t/p/w500${x[1].poster_path}`;
    });
  }

  getAllPosters() {
    this.tmdbService.getMovie().then((x: Movie[]) => {
      this.image1Src = `https://image.tmdb.org/t/p/w500${x[0].poster_path}`;
      this.image2Src = `https://image.tmdb.org/t/p/w500${x[1].poster_path}`;
    });
  }

  ngOnInit() {
    this.getAllPosters();




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
