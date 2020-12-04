import axios from 'axios'

export const getManyPokemon = async (queryString: string) =>
  await axios.get('https://pokeapi.co/api/v2/pokemon?' + queryString)
