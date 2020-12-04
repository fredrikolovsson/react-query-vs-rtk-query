import React from 'react'

import { Pokemon } from './Pokemon'
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
    <div style={{ margin: 20 }}>
      {!pokemon?.length && firstIsLoading && (
        <div>Loading initial pokemon...</div>
      )}
      {firstError && <>Oh no, there was an error</>}
      {!firstIsLoading &&
        pokemon &&
        pokemon.map(({ name }: { name: string }) => {
          return <Pokemon key={name} name={name} />
        })}

      {errorFetchingMore && <>Error when trying to fetching more...</>}
      <div style={{ height: 100, marginTop: 20 }}>
        {!isFetchingMore &&
          (canFetchMore ? (
            <>Scroll down to fetch more...</>
          ) : (
            <>No more pokemon to fetch</>
          ))}
        {pokemon.length > 0 && isFetchingMore && (
          <>Looking for {INITIAL_BATCH_SIZE} more...</>
        )}
      </div>
    </div>
  )
}
