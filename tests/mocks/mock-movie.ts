import { faker } from "@faker-js/faker";
import { Movie } from "../../lib/domain";

export const mockMovie = (): Movie => ({
  _id: faker.string.alphanumeric(),
  name: faker.string.alpha(),
  runtimeInMinutes: faker.number.int(),
  budgetInMillions: faker.number.int(),
  boxOfficeRevenueInMillions: faker.number.int(),
  academyAwardNominations: faker.number.int(),
  academyAwardWins: faker.number.int(),
  rottenTomatoesScore: faker.number.int(),
})
