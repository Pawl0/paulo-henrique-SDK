import { HttpStatusCode } from "."

export interface HttpResponse<T = unknown> {
  body?: T
  statusCode: HttpStatusCode
}