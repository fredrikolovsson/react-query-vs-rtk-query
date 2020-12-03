import React from 'react'

import './App.css'
import { Pokemon } from './components/Pokemon'
import { useGetManyPokemonQuery } from './services/pokemon'

const BATCH_SIZE = 2

function App() {
  const { data, error, isLoading } = useGetManyPokemonQuery({
    limit: BATCH_SIZE,
    offset: 0,
  })

  return (
    <div className="App">
      {isLoading && <>Loading initial pokemon...</>}
      {error && <>Oh no, there was an error</>}
      {data &&
        data.results.map(({ name }: { name: string }) => {
          return <Pokemon key={name} name={name} />
        })}
    </div>
  )
}

export default App
