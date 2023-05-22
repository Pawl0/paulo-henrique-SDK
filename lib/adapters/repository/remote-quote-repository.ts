import { HttpClient, HttpMethod, HttpRequest, OutputDTO } from "../../ports";
import { Quote } from "../../domain";
import { QuoteRepository } from "../../ports";
import { extractArrayFromResponse } from "../../utils/extract-array-from-response";

export class RemoteQuoteRepository implements QuoteRepository {

  private readonly httpRequest: HttpRequest = {
    method: HttpMethod.GET,
    url: "/quote",
  }

  constructor(private readonly httpClient: HttpClient) {}

  async find(): Promise<Quote[]> {
    const response = await this.httpClient.request<OutputDTO<Quote>>(this.httpRequest)
    const quotes = extractArrayFromResponse<Quote>(response.body)
    return quotes
  }

  async findById(quoteId: string): Promise<Quote> {
    this.httpRequest.url += `/${quoteId}`
    const response = await this.httpClient.request<OutputDTO<Quote>>(this.httpRequest)
    const quotes = extractArrayFromResponse<Quote>(response.body)
    return quotes[0]
  }

}