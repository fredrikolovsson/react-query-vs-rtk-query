import React from 'react'

import { PokemonList } from './PokemonList'
import { useGetManyPokemonQuery } from '../services/pokemon'
import { useInfinitePokemonScroll } from '../services/useInfinitePokemonScroll'

const INITIAL_BATCH_SIZE = 5

export function RtkQueryExample() {
  const {
    data: firstPokemon,
    error: firstError,
    isLoading: firstIsLoading,
  } = useGetManyPokemonQuery({
    limit: INITIAL_BATCH_SIZE,
    offset: 0,
  })

  const {
    data: morePokemon,
    canFetchMore,
    error: errorFetchingMore,
    isFetching: isFetchingMore,
  } = useInfinitePokemonScroll({
    nextUrl: firstPokemon?.next || null,
  })

  const pokemon = [...(firstPokemon?.results || []), ...(morePokemon || [])]

  return (
    <PokemonList
      canFetchMore={canFetchMore}
      errorFetchingMore={errorFetchingMore}
      firstError={firstError}
      firstIsLoading={firstIsLoading}
      initialBatchSize={INITIAL_BATCH_SIZE}
      isFetchingMore={isFetchingMore}
      pokemon={pokemon}
    />
  )
}
