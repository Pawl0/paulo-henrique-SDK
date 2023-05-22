import { faker } from "@faker-js/faker";
import { Quote } from "../../lib/domain";

export const mockQuote = (): Quote => ({
  _id: faker.string.alphanumeric(),
  dialog: faker.string.alphanumeric(),
  movie: faker.string.alphanumeric(),
  character: faker.string.alphanumeric(),
  id: faker.string.alphanumeric(),
})