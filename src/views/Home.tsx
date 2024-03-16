import { useEffect } from "react";
import { usePokemonsData } from "@/hooks/usePokemonsData";
import SearchBar from "@/components/Bars/SearchBar";
import PokemonCard from "@/components/Cards/PokemonCard";
import Loader from "@/components/Loaders/Loader";
import Header from "@/components/Appbar/Header";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const {
    pokemonList,
    fetchPokemons,
    searchByPokemonName,
    loading,
    fetchMorePokemons,
  } = usePokemonsData();

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <>
      <Header />
      <SearchBar callback={searchByPokemonName} />

      {loading && <Loader />}

      {!loading && (
        <InfiniteScroll
          className="grid grid-cols-2 gap-4"
          next={fetchMorePokemons}
          hasMore={true}
          loader={
            <div className="col-span-2 overflow-hidden">
              <Loader />
            </div>
          }
          dataLength={pokemonList?.results?.length || 0}
        >
          {pokemonList?.results?.map((el) => {
            return (
              <PokemonCard
                key={el.id}
                id={el.id as string}
                name={el.name}
                image={el.image}
              />
            );
          })}
        </InfiniteScroll>
      )}
    </>
  );
};

export default Home;
