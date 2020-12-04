import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query'

const ENTITY_TYPES = {
  POKEMON: 'Pokemon',
  POKEMON_LIST_ITEM: 'PokemonListItem',
} as const

export type Pokemon = {
  name: string
  sprites: {
    front_shiny: string
  }
  url: string
  weight: number
}

export type PokemonListItem = {
  name: string
  url: string
}

export type GetManyPokemonResult = {
  next: string | null
  results: PokemonListItem[]
}

export type GetManyPokemonQueryArg = {
  limit: Number
  offset: number
}

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getInfinitePokemon: builder.query<GetManyPokemonResult, string>({
      query: (queryString) => {
        return { url: `pokemon?${queryString}` }
      },
      provides: (result) => {
        return result.results.map(({ name }: { name: string }) => ({
          type: ENTITY_TYPES.POKEMON_LIST_ITEM,
          id: name,
        }))
      },
    }),
    getManyPokemon: builder.query<GetManyPokemonResult, GetManyPokemonQueryArg>(
      {
        query: ({ limit, offset }) => {
          // hard-coding the order of query params for this demo as the API
          // returns the next url on this format, but this should normally be
          // done with a predictable sorting
          return { url: `pokemon?offset=${offset}&limit=${limit}` }
        },
        provides: (result) => {
          return result.results.map(({ name }: { name: string }) => ({
            type: ENTITY_TYPES.POKEMON_LIST_ITEM,
            id: name,
          }))
        },
      }
    ),
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name: string) => `pokemon/${name}`,
      provides: (result) => {
        return [
          {
            type: ENTITY_TYPES.POKEMON,
            id: result.name,
          },
        ]
      },
    }),
  }),
  entityTypes: [ENTITY_TYPES.POKEMON, ENTITY_TYPES.POKEMON_LIST_ITEM],
})

export const getQueryString = (url: GetManyPokemonResult['next']) =>
  url?.split('?')[1] || null

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetInfinitePokemonQuery,
  useGetManyPokemonQuery,
  useGetPokemonByNameQuery,
} = pokemonApi
