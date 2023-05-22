import { HttpHeaders } from "."
import { HttpMethod } from "./http-method"

export interface HttpRequest {
  method: HttpMethod
  url: string
  headers?: HttpHeaders
  body?: Record<string, any>
}