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
    getManyPokemon: builder.query<GetManyPokemonResult, GetManyPokemonQueryArg>(
      {
        query: (params) => {
          return { url: 'pokemon', params }
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetManyPokemonQuery, useGetPokemonByNameQuery } = pokemonApi
