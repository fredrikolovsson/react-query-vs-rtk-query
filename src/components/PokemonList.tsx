import { PokemonListItem } from '../services/pokemon'
import { Pokemon } from './Pokemon'

export function PokemonList({
  canFetchMore,
  errorFetchingMore,
  firstError,
  firstIsLoading,
  initialBatchSize,
  isFetchingMore,
  pokemon,
}: {
  canFetchMore: boolean
  errorFetchingMore: any
  firstError: any
  firstIsLoading: boolean
  initialBatchSize: number
  isFetchingMore: boolean
  pokemon: PokemonListItem[]
}) {
  return (
    <div style={{ margin: 20 }}>
      {!pokemon?.length && firstIsLoading && (
        <div>Loading initial pokemon...</div>
      )}
      {firstError && <>Oh no, there was an error</>}
      {!firstIsLoading &&
        pokemon &&
        pokemon.map(({ name }: { name: string }) => {
          if (!name) return null
          return <Pokemon key={name} name={name} />
        })}

      {errorFetchingMore && !firstError && (
        <>Error when trying to fetching more...</>
      )}
      <div style={{ height: 100, marginTop: 20 }}>
        {!isFetchingMore &&
          (canFetchMore ? (
            <>Scroll down to fetch more...</>
          ) : (
            <>No more pokemon to fetch</>
          ))}
        {pokemon.length > 0 && isFetchingMore && (
          <>Looking for {initialBatchSize} more...</>
        )}
      </div>
    </div>
  )
}
