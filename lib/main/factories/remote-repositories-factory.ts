import { LordOfTheRingsAPIHttpClient, RemoteMovieRepository, RemoteQuoteRepository } from "../../adapters"

export const makeRepositories = (token: string) => {
  const httpClient = new LordOfTheRingsAPIHttpClient(token)
  const movieRepository = new RemoteMovieRepository(httpClient)
  const quoteRepository = new RemoteQuoteRepository(httpClient)
  return {
    movieRepository,
    quoteRepository
  }
}