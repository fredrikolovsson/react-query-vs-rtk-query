import React from 'react'

import './App.css'
import { Pokemon } from './components/Pokemon'

const pokemonNames = ['bulbasaur', 'pikachu', 'charmander']

function App() {
  return (
    <div className="App">
      <Pokemon name="bulbasaur" />
      {pokemonNames.map((name) => (
        <Pokemon name={name} />
      ))}
    </div>
  )
}

export default App
