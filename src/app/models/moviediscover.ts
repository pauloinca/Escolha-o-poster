import { Movie } from '../models/movie';

export interface MovieDiscover {
    page: number;
    results: [
        Movie
    ]
    total_pages: number;
    total_results: number;
}
