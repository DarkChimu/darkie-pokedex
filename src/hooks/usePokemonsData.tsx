import {
  extractIdFromUrl,
  formatPokemonBySearch,
  formatPokemonsResults,
} from "@/helpers/format-pokemons";
import {
  showEvolutionTree,
  showPokemon,
  showSpeciesData,
  testingService,
} from "@/services/testing.service";
import { useDebouncedCallback } from "use-debounce";
import { PokeEvolution, PokeSpecies, Pokemon } from "@/models";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
import { PokemonState, modifyPokemons } from "@/redux/states/pokemon.state";

export const usePokemonsData = () => {
  const dispatch = useDispatch();
  const [selectedPokemonData, setSelectedPokemonData] = useState<Pokemon>();
  const pokemonsData: PokemonState = useSelector(
    (store: AppStore) => store.pokemons
  );

  const [loading, setloading] = useState(false);
  const [evolutionsData, setEvolitionsData] = useState<PokeEvolution>();

  const fetchPokemons = async () => {
    console.log("pokemonsData State", pokemonsData);
    setloading(true);
    try {
      const { data } = await testingService();

      const formattedResults = formatPokemonsResults(data.results);
      dispatch(modifyPokemons({ pokemons: formattedResults }));
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMorePokemons = async () => {
    console.log("FETCH MORE pokemonsData State", pokemonsData);
    try {
      const { data } = await testingService();

      const formattedResults = formatPokemonsResults(data.results);
      dispatch(
        modifyPokemons({
          pokemons: pokemonsData.pokemons
            ? [...pokemonsData.pokemons, ...formattedResults]
            : formattedResults,
        })
      );
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPokemonData = async (id: string) => {
    if (!id) return;
    try {
      const { data } = await showPokemon(id);
      setSelectedPokemonData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEvolutionsData = async (identifier: string) => {
    setloading(true);
    try {
      const speciesData = await fetchSpeciesData(identifier);
      const { data } = await showEvolutionTree(
        extractIdFromUrl(speciesData?.evolution_chain.url as string) as string
      );

      setEvolitionsData(data);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  const fetchSpeciesData = async (identifier: string) => {
    setloading(true);
    try {
      const { data } = await showSpeciesData(identifier);
      setloading(false);

      return data as PokeSpecies;
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

      dispatch(
        modifyPokemons({
          pokemons: [formattedPokemonToShowList],
        })
      );
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
    fetchPokemons,
    fetchPokemonData,
    searchByPokemonName: debouncedSearch,
    loading,
    fetchEvolutionsData,
    fetchSpeciesData,
    evolutionsData,
    fetchMorePokemons,
    pokemonsData,
    selectedPokemonData,
  };
};
