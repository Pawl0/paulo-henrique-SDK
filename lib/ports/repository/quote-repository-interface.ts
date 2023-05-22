import { Quote } from "../../domain"

export interface QuoteRepository {
  find(): Promise<Quote[]>
  findById(quoteId: string): Promise<Quote>
}