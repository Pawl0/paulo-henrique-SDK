import { LordOfTheRingsAPIHttpClient, RemoteQuoteRepository } from "../../adapters"

export const makeRemoteQuoteRepository = (token: string) => {
  const httpClient = new LordOfTheRingsAPIHttpClient(token)
  const quoteRepository = new RemoteQuoteRepository(httpClient)
  return quoteRepository
}