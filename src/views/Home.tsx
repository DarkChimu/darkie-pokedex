import { useEffect, useMemo } from "react";
import { usePokemonsData } from "@/hooks/usePokemonsData";
import SearchBar from "@/components/Bars/SearchBar";
import PokemonCard from "@/components/Cards/PokemonCard";
import Loader from "@/components/Loaders/Loader";
import Header from "@/components/Appbar/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import SwipeToSlide from "@/components/Slider/SwipeSlider";
import { IndexedPokemon } from "@/models";

const ListGenerator = ({ data }: { data: IndexedPokemon[] }) => {
  return (
    <>
      {data.map((el: IndexedPokemon, index: number) => {
        return (
          <PokemonCard
            key={`${index}-${el.id}`}
            id={el.id}
            name={el.name}
            image={el?.sprites.other["official-artwork"]?.front_default}
            types={el.types}
          />
        );
      })}
    </>
  );
};

const Home = () => {
  const {
    fetchPokemons,
    searchByPokemonName,
    loading,
    fetchMorePokemons,
    pokemonsData,
    currentFilter,
    filterBy,
  } = usePokemonsData();

  const { pokemonsByType, pokemons, types } = pokemonsData;

  const listLength = useMemo(
    () =>
      currentFilter
        ? pokemonsData.pokemonsByType.length
        : pokemonsData?.pokemons.length,
    [
      pokemonsData.pokemons.length,
      currentFilter,
      pokemonsData.pokemonsByType.length,
    ]
  );

  useEffect(() => {
    if (!listLength) fetchPokemons();
  }, []);

  return (
    <>
      <Header />
      <SearchBar callback={searchByPokemonName} />

      <SwipeToSlide
        showImage
        list={Object.keys(types)}
        currentValue={currentFilter}
        callback={filterBy}
      />

      {loading && <Loader />}

      {!loading && (
        <InfiniteScroll
          className="grid grid-cols-2 gap-4"
          next={!currentFilter ? fetchMorePokemons : () => {}}
          hasMore={!currentFilter ? true : false}
          loader={
            <div className="col-span-2 overflow-hidden">
              <Loader />
            </div>
          }
          dataLength={listLength || 0}
        >
          {currentFilter ? (
            <ListGenerator data={pokemonsByType} />
          ) : (
            <ListGenerator data={pokemons} />
          )}
        </InfiniteScroll>
      )}
    </>
  );
};

export default Home;
