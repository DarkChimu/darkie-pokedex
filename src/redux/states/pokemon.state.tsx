import { PokedexListResult, /* Pokemon  */} from "@/models";
import { createSlice } from "@reduxjs/toolkit";

export interface PokemonState {
  pokemons: Array<PokedexListResult>;
  pokemonsByType: Array<PokedexListResult>;
  pokemonsByGeneration: Array<PokedexListResult>;
}

export const PokemonEmptyState: PokemonState = {
  pokemons: [],
  pokemonsByType: [],
  pokemonsByGeneration: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: PokemonEmptyState,
  reducers: {
    modifyPokemons: (state, action) => ({ ...state, ...action.payload }),
    resetPokemons: () => PokemonEmptyState,
  },
});

export const { modifyPokemons } = pokemonSlice.actions;

export default pokemonSlice.reducer;
