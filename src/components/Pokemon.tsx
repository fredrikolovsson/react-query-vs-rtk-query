import React from 'react'
import { useGetPokemonByNameQuery } from '../services/pokemon'

const itemStyle = { height: 150, marginBottom: 20 }

export const Pokemon = ({
  name,
  pollingInterval = 0,
}: {
  name: string
  pollingInterval?: number
}) => {
  const { data, error, isLoading, isFetching } = useGetPokemonByNameQuery(
    name,
    {
      pollingInterval,
    }
  )

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <div style={itemStyle}>Loading {name}...</div>
      ) : data ? (
        <div style={itemStyle}>
          <h3>
            {data.name} {isFetching ? '...' : ''}
          </h3>
          <p>Weight: {data.weight}</p>
          <img src={data.sprites.front_shiny} alt={data.name} />
        </div>
      ) : null}
    </>
  )
}
