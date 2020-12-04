import React from 'react'

import { useIsCloseToBottomOfPage } from '../hooks/useIsCloseToBottomOfPage'

import {
  GetManyPokemonResult,
  getQueryString,
  PokemonListItem,
  useGetInfinitePokemonQuery,
} from './pokemon'

export const useInfinitePokemonScroll = ({
  nextUrl: nextUrlInput,
}: {
  nextUrl: GetManyPokemonResult['next']
}) => {
  const [pokemon, setPokemon] = React.useState<PokemonListItem[]>([])
  const [nextQuery, setNextQuery] = React.useState<
    GetManyPokemonResult['next']
  >(null)

  const { data, isFetching, ...rest } = useGetInfinitePokemonQuery(
    nextQuery as string,
    {
      skip: !nextQuery,
    }
  )

  const dataRef = React.useRef<GetManyPokemonResult | undefined>(data)
  const isCloseToBottomOfPage = useIsCloseToBottomOfPage()
  const isCloseToBottomOfPageRef = React.useRef(isCloseToBottomOfPage)

  /*
   * add new data (i.e. if data has changed) to pokemon state
   */
  React.useLayoutEffect(() => {
    if (dataRef.current !== data) {
      setPokemon([...pokemon, ...(data?.results || [])])
    }

    dataRef.current = data
  }, [data, pokemon])

  /*
   * request more pokemon when getting close to the bottom if there is no
   * fetching in progress and if the requestedNumberOfPokemon is not already
   * greater than the number of fetched pokemon
   */
  React.useEffect(() => {
    if (
      isCloseToBottomOfPage &&
      !isCloseToBottomOfPageRef.current &&
      !isFetching &&
      (data?.next || nextUrlInput)
    ) {
      // use nextUrlInput from initial query if it's the first time scrolling
      if (!nextQuery && nextUrlInput) {
        setNextQuery(getQueryString(nextUrlInput || null))
      } else {
        setNextQuery(getQueryString(data?.next || null))
      }
    }

    isCloseToBottomOfPageRef.current = isCloseToBottomOfPage
  }, [
    data?.next,
    isCloseToBottomOfPage,
    isFetching,
    nextQuery,
    nextUrlInput,
    pokemon.length,
  ])

  return {
    data: pokemon,
    isFetching,
    canFetchMore: !!(nextUrlInput || nextQuery),
    ...rest,
  }
}
