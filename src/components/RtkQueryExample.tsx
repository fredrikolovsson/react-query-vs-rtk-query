import React from 'react'

import { Pokemon } from './Pokemon'
import { useGetManyPokemonQuery } from '../services/pokemon'
import { useInfinitePokemonScroll } from '../services/useInfinitePokemonScroll'

const BATCH_LIMIT = 3
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
    error: errorFetchingMore,
    isFetching: isFetchingMore,
  } = useInfinitePokemonScroll({
    batchLimit: BATCH_LIMIT,
    initialOffset: INITIAL_BATCH_SIZE,
  })

  const pokemon = [...(firstPokemon?.results || []), ...(morePokemon || [])]

  return (
    <>
      {!pokemon?.length && firstIsLoading && <>Loading initial pokemon...</>}
      {firstError && <>Oh no, there was an error</>}
      {!firstIsLoading &&
        pokemon &&
        pokemon.map(({ name }: { name: string }) => {
          return <Pokemon key={name} name={name} />
        })}
      {pokemon.length > 0 && isFetchingMore && (
        <>Looking for {BATCH_LIMIT} more...</>
      )}
      {errorFetchingMore && <>Error when trying to fetching more...</>}
    </>
  )
}
