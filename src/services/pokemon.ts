import { createApi, fetchBaseQuery } from '@rtk-incubator/rtk-query'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => `pokemon/${name}`,
    }),
    getManyPokemon: builder.query({
      query: (params: { limit: Number; offset: number }) => {
        return { url: 'pokemon', params }
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetManyPokemonQuery, useGetPokemonByNameQuery } = pokemonApi
