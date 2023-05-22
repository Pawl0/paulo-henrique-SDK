import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from "../../lib/ports/infrastructure/http";

export class HttpClientStub implements HttpClient {
  async request<T>(httpRequest: HttpRequest): Promise<HttpResponse<T>> {
    return {
      statusCode: HttpStatusCode.SUCCESS,
      body: expect.anything()
    }
  }
}
