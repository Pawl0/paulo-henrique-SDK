# paulo-henrique-SDK
An SDK to access The Lord of the Rings API

## Installation

```bash
npm install paulo-henrique-sdk
```

## Usage

```ts
// ESM
import { makeRepositories,  makeRemoteMovieRepository, makeRemoteQuoteRepository } from 'paulo-henrique-sdk';

// CJS
const { makeRepositories, makeRemoteMovieRepository, makeRemoteQuoteRepository  } = require('paulo-henrique-sdk');


const { movieRepository, quoteRepository } = makeRepositories("<token>")

const movieRepository = makeRemoteMovieRepository("<token>")
const quoteRepository = makeRemoteQuoteRepository("<token>")
```

The above code indicates a basic usage of the sdk.
The point of interest is the import statements at the top.
It indicates that it's possible to import 3 factory functions. The makeRepositories factory creates all the sdk repositories returns them in an object. The makeRemoteMovieRepository and makeRemoteQuoteRepository functions create the movieRepository and the quoteRepository respectively.
Each factory requires an access token to be provided. This token can be obtained signing up in the API website:

```
https://the-one-api.dev/account
```

### Methods

#### MovieRepository

##### find
```ts
movieRepository.find(): Promise<Movie[]>
```
Returns an Array of Movies
##### findById
```ts
movieRepository.findById(movieId: string): Promise<Movie>
```
Returns a Movie based on the id provided
##### findQuotesByMovieId
```ts
movieRepository.findQuotesByMovieId(movieId: string): Promise<Quote[]>
```
Returns an Array of Quotes from a Movie
#### QuoteRepository

##### find
```ts
quoteRepository.find(): Promise<Quote[]>
```
Returns an Array of Quotes
##### findById
```ts
quoteRepository.findById(quoteId: string): Promise<Quote>
```
Returns a Quote based on the id provided