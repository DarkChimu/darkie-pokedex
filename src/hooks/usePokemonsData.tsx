import {
  formatPokemonBySearch,
  formatPokemonsResults,
} from "@/helpers/format-pokemons";
import { showPokemon, testingService } from "@/services/testing.service";
import { useDebouncedCallback } from "use-debounce";
import { PokedexList } from "@/models";
import { useState } from "react";

export const usePokemonsData = () => {
  const [loading, setloading] = useState(false);
  const [pokemonList, setPokemonList] = useState<PokedexList>();

  const fetchPokemons = async () => {
    setloading(true);
    try {
      const { data } = await testingService();

      const formattedResults = formatPokemonsResults(data.results);
      setPokemonList({ ...data, results: formattedResults });
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const searchByPokemonName = async (identifier: string) => {
    if (!identifier) return await fetchPokemons();
    setloading(true);

    try {
      const { data } = await showPokemon(identifier.toLowerCase().trim());

      const formattedPokemonToShowList = formatPokemonBySearch(data);

      setPokemonList({ ...data, results: [formattedPokemonToShowList] });
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedSearch = useDebouncedCallback(
    (value) => searchByPokemonName(value),
    500
  );

  return {
    pokemonList,
    fetchPokemons,
    searchByPokemonName: debouncedSearch,
    loading,
  };
};
