import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { Movie } from '../models/movie';
import { timer, interval, Observable } from 'rxjs';
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
  imageEsquerdaSrc: string = "../../assets/images/imageEsquerda.png";
  imageDireitaSrc: string = "../../assets/images/imageEsquerda.png";

  cardEsquerda = {
    state: "flipped"
  };

  cardDireita = {
    state: "flipped"
  };

  constructor(private tmdbService: TmdbService) { }


  randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async cardEsquerdaClicked() {
    if (this.cardDireita.state == "flipped") {
      this.cardDireita.state = "default";
      await this.getOnePoster().then(poster => {
        this.imageDireitaSrc = poster;
      });

      setTimeout(() => this.cardDireita.state = "flipped", 400);
    }
  }

  async cardDireitaClicked() {
    if (this.cardEsquerda.state == "flipped") {
      this.cardEsquerda.state = "default";
      await this.getOnePoster().then(poster => {
        this.imageEsquerdaSrc = poster;
      });

      setTimeout(() => this.cardEsquerda.state = "flipped", 400);
    }
  }

  async getOnePoster(): Promise<any> {
    return this.tmdbService.getOneMovie().then((x: Movie) => {
      return `https://image.tmdb.org/t/p/w500${x.poster_path}`;
    });
  }

  getAllPosters() {
    this.tmdbService.getTwoMovies().then((x: Movie[]) => {
      this.imageEsquerdaSrc = `https://image.tmdb.org/t/p/w500${x[0].poster_path}`;
      this.imageDireitaSrc = `https://image.tmdb.org/t/p/w500${x[1].poster_path}`;
    });
  }

  ngOnInit() {
    this.getAllPosters();
  }

}
