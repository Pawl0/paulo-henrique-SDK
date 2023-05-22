import { faker } from "@faker-js/faker"
import { makeRemoteQuoteRepository } from "../.."

const makeSut = () => {
  const sut = makeRemoteQuoteRepository(process.env.TOKEN)
  return sut
}

describe("Quote integration tests", () => {

  it("Should return an array of quotes", async () => {
    const sut = makeSut()

    const quote = await sut.find()

    expect(quote).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "_id": expect.any(String),
          "dialog": expect.any(String),
          "movie": expect.any(String),
          "character": expect.any(String),
          "id": expect.any(String),
        })
      ])
    )
  })

  it("Should return one quote", async () => {
    const sut = makeSut()
    const quotes = await sut.find()
    const randomQuote = faker.helpers.arrayElement(quotes)
    const quote = await sut.findById(randomQuote._id)

    expect(quote).toEqual(expect.objectContaining(randomQuote))
  })

})