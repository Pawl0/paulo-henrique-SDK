import { HttpRequest, HttpResponse } from ".";

export interface HttpClient {
  request<T>(httpRequest: HttpRequest): Promise<HttpResponse<T>>
}