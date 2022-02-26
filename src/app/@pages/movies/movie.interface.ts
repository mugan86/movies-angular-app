import { IActor } from './../actors/actor.interface';
export interface IMovie {
    id: number;
    title: string;
    poster: string;
    genre: string[];
    year: number;
    duration: number;
    imdbRating: number;
    actors: IActor[];
}