import { HttpClient, HttpMethod, HttpRequest, MovieRepository, OutputDTO } from "../../ports";
import { Movie, Quote } from "../../domain";
import { extractArrayFromResponse } from "../../utils/extract-array-from-response";

export class RemoteMovieRepository implements MovieRepository {

  private readonly httpRequest: HttpRequest = {
    method: HttpMethod.GET,
    url: "/movie",
  }

  constructor(private readonly httpClient: HttpClient) {}
  
  async find(): Promise<Movie[]> {
    const response = await this.httpClient.request<OutputDTO<Movie>>(this.httpRequest)
    const movies = extractArrayFromResponse<Movie>(response.body)
    return movies
  }
  async findById(movieId: string): Promise<Movie> {
    this.httpRequest.url += `/${movieId}`
    const response = await this.httpClient.request<OutputDTO<Movie>>(this.httpRequest)
    const movies = extractArrayFromResponse<Movie>(response.body)
    return movies[0]
  }

  async findQuotesByMovieId(movieId: string): Promise<Quote[]> {
    this.httpRequest.url += `/${movieId}/quote`
    const response = await this.httpClient.request<OutputDTO<Quote>>(this.httpRequest)
    const quotes = extractArrayFromResponse<Quote>(response.body)
    return quotes
  }

}