import { faker } from "@faker-js/faker"
import { makeRemoteMovieRepository } from "../.."

const makeSut = () => {
  const sut = makeRemoteMovieRepository(process.env.TOKEN)
  return sut
}

describe("Movie integration tests", () => {

  it("Should return an array of movies", async () => {
    const sut = makeSut()

    const movies = await sut.find()

    expect(movies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "_id": expect.any(String),
          "name": expect.any(String),
          "runtimeInMinutes": expect.any(Number),
          "budgetInMillions": expect.any(Number),
          "boxOfficeRevenueInMillions": expect.any(Number),
          "academyAwardNominations": expect.any(Number),
          "academyAwardWins": expect.any(Number),
          "rottenTomatoesScore": expect.any(Number)
        })
      ])
    )
  })

  it("Should return one movie", async () => {
    const sut = makeSut()
    const movies = await sut.find()
    const randomMovie = faker.helpers.arrayElement(movies)
    const movie = await sut.findById(randomMovie._id)

    expect(movie).toEqual(expect.objectContaining(randomMovie))
  })

  it("Should return an array of quotes from a movie that is from LotR trilogy", async () => {
    const sut = makeSut()
    const randomMovieId = faker.helpers.arrayElement(["5cd95395de30eff6ebccde5c", "5cd95395de30eff6ebccde5d", "5cd95395de30eff6ebccde5b"])
    const quotes = await sut.findQuotesByMovieId(randomMovieId)

    expect(quotes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "_id": expect.any(String),
          "dialog": expect.any(String),
          "movie": randomMovieId,
          "character": expect.any(String),
          "id": expect.any(String)
        })
      ])
    )
  })

  it("Should return an empty array of quotes from a movie that is not from LotR trilogy", async () => {
    const sut = makeSut()
    const randomMovieId = faker.helpers.arrayElement(["5cd95395de30eff6ebccde56", "5cd95395de30eff6ebccde57", "5cd95395de30eff6ebccde58", "5cd95395de30eff6ebccde59", "5cd95395de30eff6ebccde5a"])
    const quotes = await sut.findQuotesByMovieId(randomMovieId)

    expect(quotes).toEqual([])
  })

})