import { HttpClientStub, mockArray, mockMovie, mockQuote } from "../../mocks";
import { RemoteMovieRepository } from "../../../lib/adapters/repository/remote-movie-repository";
import { HttpClient, HttpMethod, HttpRequest, HttpStatusCode } from "../../../lib/ports/infrastructure/http";
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const httpClient: HttpClient = new HttpClientStub()
  const requestSpy = jest.spyOn(httpClient, "request")
  const httpRequest: HttpRequest = {
    method: HttpMethod.GET,
    url: "/movie",
  }
  const sut = new RemoteMovieRepository(httpClient)  
  
  return {
    sut, 
    requestSpy,
    httpRequest
  }
}

describe("RemoteMovieRepository tests", () => {

  describe("find tests", () => {
    
    it("Should call httpClient request with correct params once", async () => {
      const { sut, requestSpy, httpRequest } = makeSut()

      await sut.find()

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(httpRequest)
    })

    it("Should throw an error when httpClient request throws", async () => {
      const { sut, requestSpy } = makeSut()
      const fakeErrorMessage = faker.string.alpha()
      requestSpy.mockImplementationOnce(() => { throw new Error(fakeErrorMessage)})
      expect(sut.find()).rejects.toThrowError(fakeErrorMessage)
    })


    it("Should return an array of movies when httpClient request returns status code 200", async () => {
      const { sut, requestSpy } = makeSut()
      const fakeResponseBody =  mockArray(mockMovie)
      const fakeHttpRequest = { 
        statusCode: HttpStatusCode.SUCCESS, 
        body: {
          docs: fakeResponseBody
        }
      }
      requestSpy.mockResolvedValueOnce(fakeHttpRequest)
      const movies = await sut.find()

      expect(movies).toEqual(fakeResponseBody)
    })

  })
  
  describe("findById tests", () => {

    let fakeId: string

    beforeEach(() => {
      fakeId = faker.string.alphanumeric()
    })
    
    it("Should call httpClient request with correct params once", async () => {
      const { sut, requestSpy, httpRequest } = makeSut()
      httpRequest.url += `/${fakeId}`

      await sut.findById(fakeId)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(httpRequest)
    })

    it("Should throw an error when httpClient request throws", async () => {
      const { sut, requestSpy } = makeSut()
      const fakeErrorMessage = faker.string.alpha()
      requestSpy.mockImplementationOnce(() => { throw new Error(fakeErrorMessage)})
      expect(sut.findById(fakeId)).rejects.toThrowError(fakeErrorMessage)
    })

    it("Should return a movie when httpClient request returns status code 200", async () => {
      const { sut, requestSpy } = makeSut()
      const fakeResponseBody =  mockMovie()
      const fakeHttpRequest = { 
        statusCode: HttpStatusCode.SUCCESS, 
        body: {
          docs: [fakeResponseBody]
        }
      }
      requestSpy.mockResolvedValueOnce(fakeHttpRequest)
      const movie = await sut.findById(fakeId)

      expect(movie).toEqual(fakeResponseBody)
    })

  })

  describe("findQuotesByMovieId tests", () => {

    let fakeId: string

    beforeEach(() => {
      fakeId = faker.string.alphanumeric()
    })
    
    it("Should call httpClient request with correct params once", async () => {
      const { sut, requestSpy, httpRequest } = makeSut()
      httpRequest.url += `/${fakeId}/quote`

      await sut.findQuotesByMovieId(fakeId)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(httpRequest)
    })

    it("Should throw an error when httpClient request throws", async () => {
      const { sut, requestSpy } = makeSut()
      const fakeErrorMessage = faker.string.alpha()
      requestSpy.mockImplementationOnce(() => { throw new Error(fakeErrorMessage)})
      expect(sut.findQuotesByMovieId(fakeId)).rejects.toThrowError(fakeErrorMessage)
    })

    it("Should return an array of quotes when httpClient request returns status code 200", async () => {
      const { sut, requestSpy } = makeSut()
      const fakeResponseBody = mockArray(mockQuote)
      const fakeHttpRequest = { 
        statusCode: HttpStatusCode.SUCCESS, 
        body: {
          docs: fakeResponseBody
        }
      }
      requestSpy.mockResolvedValueOnce(fakeHttpRequest)
      const quotes = await sut.findQuotesByMovieId(fakeId)

      expect(quotes).toEqual(fakeResponseBody)
    })

  })

})