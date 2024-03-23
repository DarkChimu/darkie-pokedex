import {
  IndexedPokemon,
  PokedexListResult,
  Pokemon,
  TypeIndex,
} from "@/models";
import { createSlice } from "@reduxjs/toolkit";

export interface PokemonState {
  types: TypeIndex;
  pokemons: IndexedPokemon[];
  pokemonsByType: IndexedPokemon[];
  pokemonsByGeneration: Array<PokedexListResult>;
  selectedPokemonToShow: Partial<Pokemon>;
  filter: string;
}

export const PokemonEmptyState: PokemonState = {
  types: {},
  pokemons: [],
  pokemonsByType: [],
  pokemonsByGeneration: [],
  selectedPokemonToShow: {},
  filter: "all",
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
