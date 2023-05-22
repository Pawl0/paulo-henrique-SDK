import { Movie, Quote } from "../../domain"

export interface MovieRepository {
  find(): Promise<Movie[]>
  findById(movieId: string): Promise<Movie>
  findQuotesByMovieId(movieId: string): Promise<Quote[]>
}