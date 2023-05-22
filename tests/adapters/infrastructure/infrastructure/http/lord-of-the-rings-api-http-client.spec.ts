import { faker } from "@faker-js/faker"
import { LordOfTheRingsAPIHttpClient } from "../../../../../lib/adapters"
import axios, { AxiosInstance } from 'axios'
import { HttpMethod, HttpRequest, HttpStatusCode } from "../../../../../lib/ports"
jest.mock('axios')

const makeSut = () => {
  const token = faker.string.alphanumeric()
  const requestSpy = jest.fn().mockResolvedValue({ status:  expect.anything(), data: expect.anything() })
  jest.spyOn(axios, "create").mockReturnValue({
    request: requestSpy
  } as unknown as AxiosInstance)
  
  const sut = new LordOfTheRingsAPIHttpClient(token)
  const httpRequest: HttpRequest = {
    method: HttpMethod.GET,
    url: faker.internet.url(),
  }
  return {
    sut,
    httpRequest,
    requestSpy
  }
}

describe("LordOfTheRingsAPIHttpClient tests", () => {

  it("Should call axiosInstace request with correct params once", async () => {
    const { sut, httpRequest, requestSpy } = makeSut()

    await sut.request(httpRequest)

    expect(requestSpy).toHaveBeenCalledTimes(1)
    expect(requestSpy).toHaveBeenCalledWith(httpRequest)
  })

  it("Should throw when axiosInstance request throws", async () => {
    const { sut, httpRequest, requestSpy } = makeSut()
    const fakeErrorMessage = faker.string.alpha()
    requestSpy.mockImplementationOnce(() => { throw new Error(fakeErrorMessage )})
    expect(sut.request(httpRequest)).rejects.toThrowError(fakeErrorMessage)
  })

  it("Should return an httpReponse when axiosIntance request succeeds", async () => {
    const { sut, httpRequest, requestSpy } = makeSut()
    requestSpy.mockResolvedValueOnce({ status: HttpStatusCode.SUCCESS, data: expect.anything() })
    const response = await sut.request(httpRequest)

    expect(response).toEqual({
      statusCode: HttpStatusCode.SUCCESS,
      body: expect.anything()
    })
  })

})