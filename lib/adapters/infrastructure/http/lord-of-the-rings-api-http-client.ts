import axios, { AxiosInstance } from "axios";
import { HttpClient, HttpRequest, HttpResponse } from "../../../ports";

export class LordOfTheRingsAPIHttpClient implements HttpClient {

  private readonly axiosInstance: AxiosInstance
  private readonly BASE_URL = "https://the-one-api.dev/v2"

  constructor(token: string) {
    this.axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`
      },
      baseURL: this.BASE_URL
    })
  }

  async request<T>(httpRequest: HttpRequest): Promise<HttpResponse<T>> {
    const response = await this.axiosInstance.request(httpRequest)
    return {
      statusCode: response.status,
      body: response.data,
    }
  }
}