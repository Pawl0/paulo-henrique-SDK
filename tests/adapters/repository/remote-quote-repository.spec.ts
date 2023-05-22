import { faker } from "@faker-js/faker"
import { HttpClient, HttpMethod, HttpRequest, HttpStatusCode } from "../../../lib/ports"
import { HttpClientStub, mockArray, mockQuote } from "../../mocks"
import { RemoteQuoteRepository } from "../../../lib/adapters"

const makeSut = () => {
  const httpClient: HttpClient = new HttpClientStub()
  const requestSpy = jest.spyOn(httpClient, "request")
  const httpRequest: HttpRequest = {
    method: HttpMethod.GET,
    url: "/quote",
  }
  const sut = new RemoteQuoteRepository(httpClient)  
  
  return {
    sut, 
    requestSpy,
    httpRequest
  }
}

describe("RemoteQuoteRepository tests", () => {

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
      const quotes = await sut.find()

      expect(quotes).toEqual(fakeResponseBody)
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

    it("Should return a quote when httpClient request returns status code 200", async () => {
      const { sut, requestSpy } = makeSut()
      const fakeResponseBody = mockQuote()
      const fakeHttpRequest = { 
        statusCode: HttpStatusCode.SUCCESS, 
        body: {
          docs: [fakeResponseBody]
        }
      }
      requestSpy.mockResolvedValueOnce(fakeHttpRequest)
      const quote = await sut.findById(fakeId)

      expect(quote).toEqual(fakeResponseBody)
    })

  })
})