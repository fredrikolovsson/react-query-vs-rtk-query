import React from 'react'
import { useInfiniteQuery } from 'react-query'

import { PokemonList } from './PokemonList'
import { getManyPokemon } from '../api/pokemon'
import { useIsCloseToBottomOfPage } from '../hooks/useIsCloseToBottomOfPage'

const INITIAL_BATCH_SIZE = 5

export function ReactQueryExample() {
  const {
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    'projects',
    async (
      key: string,
      queryString: string = `offset=0&limit=${INITIAL_BATCH_SIZE}`
    ) => {
      const { data } = await getManyPokemon(queryString)

      return data
    },
    {
      getFetchMore: (lastResult) => {
        return lastResult?.next?.split('?')[1]
      },
    }
  )

  const isCloseToBottomOfPage = useIsCloseToBottomOfPage()
  const isCloseToBottomOfPageRef = React.useRef(isCloseToBottomOfPage)

  React.useEffect(() => {
    if (
      isCloseToBottomOfPage &&
      !isCloseToBottomOfPageRef.current &&
      !isFetching &&
      !isFetchingMore &&
      canFetchMore
    ) {
      fetchMore()
    }

    isCloseToBottomOfPageRef.current = isCloseToBottomOfPage
  }, [
    canFetchMore,
    fetchMore,
    isCloseToBottomOfPage,
    isFetching,
    isFetchingMore,
  ])

  const flattenedResults =
    data?.reduce((arr, res) => arr.concat(res?.results || []), []) || []

  return (
    <PokemonList
      canFetchMore={!!canFetchMore}
      errorFetchingMore={error}
      firstError={error}
      firstIsLoading={isFetching}
      initialBatchSize={INITIAL_BATCH_SIZE}
      isFetchingMore={!!isFetchingMore}
      pokemon={flattenedResults}
    />
  )
}
