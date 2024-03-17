/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import { pokemonSlice } from "./states/pokemon.state";

export interface AppStore {
  pokemons: any;
}

const store = configureStore<AppStore>({
  reducer: {
    pokemons: pokemonSlice.reducer,
  },
});

export default store;
