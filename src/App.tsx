import React from 'react'

import './App.css'
import { Pokemon } from './components/Pokemon'
import { useGetManyPokemonQuery } from './services/pokemon'

function App() {
  const { data, error, isLoading } = useGetManyPokemonQuery({
    limit: 5,
    offset: 0,
  })

  return (
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        data.results.map(({ name }: { name: string }) => {
          return <Pokemon name={name} />
        })
      ) : null}
    </div>
  )
}

export default App
