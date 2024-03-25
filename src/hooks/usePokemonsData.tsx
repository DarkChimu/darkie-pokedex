import {
  extractIdFromUrl,
  formatPokemonBySearch,
} from "@/helpers/format-pokemons";
import {
  showEvolutionTree,
  showPokemon,
  showSpeciesData,
  testingService,
  types,
} from "@/services/testing.service";
import { useDebouncedCallback } from "use-debounce";
import {
  IndexedPokemon,
  PokeEvolution,
  PokedexList,
  PokedexListResult,
  Pokemon,
} from "@/models";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@/redux/store";
import { PokemonState, modifyPokemons } from "@/redux/states/pokemon.state";

export const usePokemonsData = () => {
  const dispatch = useDispatch();
  const pokemonsData: PokemonState = useSelector(
    (store: AppStore) => store.pokemons
  );

  const [selectedPokemonData, setSelectedPokemonData] = useState<Pokemon>();
  const [loading, setloading] = useState(false);
  const [loadingEvolutions, setloadingEvolutions] = useState(false);
  const [evolutionsData, setEvolitionsData] = useState<PokeEvolution>();

  const getPokeData = async (data: PokedexList) => {
    const pokeIndex = await Promise.all(
      data.results.map(async (pokemon: PokedexListResult) => {
        const { data } = (await showPokemon(
          extractIdFromUrl(pokemon.url) as string
        )) as { data: Pokemon };

        const { id, name, sprites, types } = data;

        const official_artwork = sprites.other?.["official-artwork"];
        const dream_world = sprites?.other?.dream_world;
        const home = sprites?.other?.home;

        return {
          id,
          name,
          types,
          url: pokemon.url,
          sprites: {
            other: {
              "official-artwork": {
                front_default:
                  official_artwork?.front_default ||
                  dream_world?.front_default ||
                  home?.front_default,
                front_shiny: official_artwork?.front_shiny,
              },
            },
          },
        };
      })
    ).catch((error) => {
      console.log(error);
    });

    return pokeIndex;
  };

  const fetchPokemons = async () => {
    setloading(true);
    try {
      await fetchTypes();
      const { data } = await testingService();

      const pokemons = await getPokeData(data);

      dispatch(
        modifyPokemons({
          pokemons,
          filter: "",
        })
      );
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMorePokemons = async () => {
    console.log("FETCH MORE pokemonsData State", pokemonsData);
    try {
      const { data } = await testingService();

      const pokemons = (await getPokeData(data)) as IndexedPokemon[];

      dispatch(
        modifyPokemons({
          pokemons: [...pokemonsData.pokemons, ...pokemons],
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPokemonData = async (id: string) => {
    if (!id) return;
    try {
      const { data } = await showPokemon(id as string);

      const { sprites } = data;

      const official_artwork = sprites.other?.["official-artwork"];
      const dream_world = sprites?.other?.dream_world;
      const home = sprites?.other?.home;

      setSelectedPokemonData({
        ...data,
        sprites: {
          other: {
            "official-artwork": {
              front_default:
                official_artwork?.front_default ||
                dream_world?.front_default ||
                home?.front_default,
              front_shiny: official_artwork?.front_shiny,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEvolutionsData = async (identifier: string) => {
    setloadingEvolutions(true);
    try {
      const speciesDataInfo = await fetchSpeciesData(identifier);
      const { data } = await showEvolutionTree(
        extractIdFromUrl(
          speciesDataInfo?.evolution_chain.url as string
        ) as string
      );

      setEvolitionsData({ ...data, speciesData: { ...speciesDataInfo } });
    } catch (error) {
      console.log(error);
    } finally {
      setloadingEvolutions(false);
    }
  };

  const fetchTypes = async () => {
    try {
      const { results } = await types();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const typeIndex: any = {};

      results.forEach(
        (type: { name: "string" }) => (typeIndex[type.name] = {})
      );

      dispatch(
        modifyPokemons({
          types: { ...typeIndex },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSpeciesData = async (identifier: string) => {
    try {
      const { data } = await showSpeciesData(identifier);

      return data;
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
          page: 0,
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

  const filterBy = async (filter: string) => {
    setloading(true);
    try {
      console.log("CurrentFilter", filter);
      if (!filter || filter === "all") {
        dispatch(modifyPokemons({ filter: "" }));
        setloading(false);
        return;
      }

      const { pokemon } = await types(filter);

      const mappedPokemons = pokemon.map(
        (poke: { pokemon: Partial<PokedexListResult> }) => ({ ...poke.pokemon })
      );

      const pokemons = await getPokeData({
        results: mappedPokemons,
        count: 0,
        next: "",
        previous: null,
      });
      dispatch(modifyPokemons({ filter, pokemonsByType: pokemons }));
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return {
    fetchPokemons,
    fetchPokemonData,
    searchByPokemonName: debouncedSearch,
    loading,
    loadingEvolutions,
    fetchEvolutionsData,
    fetchSpeciesData,
    evolutionsData,
    fetchMorePokemons,
    pokemonsData,
    selectedPokemonData,
    filterBy,
    currentFilter: pokemonsData.filter,
  };
};
