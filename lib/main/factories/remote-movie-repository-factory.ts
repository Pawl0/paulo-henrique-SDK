import { LordOfTheRingsAPIHttpClient, RemoteMovieRepository } from "../../adapters"

export const makeRemoteMovieRepository = (token: string) => {
  const httpClient = new LordOfTheRingsAPIHttpClient(token)
  const movieRepository = new RemoteMovieRepository(httpClient)
  return movieRepository
}