import React from 'react'

import { useIsCloseToBottomOfPage } from '../hooks/useIsCloseToBottomOfPage'

import {
  GetManyPokemonResult,
  PokemonListItem,
  useGetManyPokemonQuery,
} from './pokemon'

export const useInfinitePokemonScroll = ({
  batchLimit = 2,
  initialOffset,
}: {
  batchLimit?: number
  initialOffset: number
}) => {
  const [
    requestedNumberOfPokemon,
    setRequestedNumberOfPokemon,
  ] = React.useState(0)
  const [pokemon, setPokemon] = React.useState<PokemonListItem[]>([])

  const { data, isFetching, ...rest } = useGetManyPokemonQuery(
    {
      limit: batchLimit,
      offset: initialOffset + requestedNumberOfPokemon - batchLimit,
    },
    { skip: requestedNumberOfPokemon === 0 }
  )

  const dataRef = React.useRef<GetManyPokemonResult | undefined>(data)

  /*
   * add new data (i.e. if data has changed) to pokemon state
   */
  React.useLayoutEffect(() => {
    if (dataRef.current !== data) {
      setPokemon([...pokemon, ...(data?.results || [])])
    }

    dataRef.current = data
  }, [data, pokemon])

  const isCloseToBottomOfPage = useIsCloseToBottomOfPage()
  const isCloseToBottomOfPageRef = React.useRef(isCloseToBottomOfPage)

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
      requestedNumberOfPokemon <= pokemon.length
    ) {
      setRequestedNumberOfPokemon(requestedNumberOfPokemon + batchLimit)
    }

    isCloseToBottomOfPageRef.current = isCloseToBottomOfPage
  }, [
    batchLimit,
    isCloseToBottomOfPage,
    isFetching,
    pokemon.length,
    requestedNumberOfPokemon,
  ])

  return {
    data: pokemon,
    isFetching,
    ...rest,
  }
}
