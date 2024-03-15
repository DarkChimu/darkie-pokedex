import { PokedexListResult, Pokemon } from "@/models";

export const formatPokemonsResults = (results: Array<PokedexListResult>) => {
  return results.map((pokemon: PokedexListResult) => {
    const regex = /\/(\d+)\/$/;
    const match = pokemon.url.match(regex);
    const id = match ? match[1] : null;
    return {
      id,
      name: pokemon.name,
      url: pokemon.url,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    };
  });
};

export const formatPokemonBySearch = (data: Pokemon) => {
  return {
    ...data,
    id: data.id,
    name: data.name,
    url: `https://pokeapi.co/api/v2/pokemon/${data.name}`,
    image: data.sprites.other?.["official-artwork"].front_default,
  };
};
