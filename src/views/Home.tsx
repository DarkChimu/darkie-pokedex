import { useEffect } from "react";
import { usePokemonsData } from "@/hooks/usePokemonsData";
import SearchBar from "@/components/Bars/SearchBar";
import PokemonCard from "@/components/Cards/PokemonCard";
import Loader from "@/components/Loaders/Loader";
import Header from "@/components/Appbar/Header";

const Home = () => {
  const { pokemonList, fetchPokemons, searchByPokemonName, loading } =
    usePokemonsData();

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <>
      <Header />
      <SearchBar callback={searchByPokemonName} />

      {loading && <Loader />}

      <div className="grid grid-cols-2 gap-4 ">
        {!loading &&
          pokemonList?.results?.map((el) => {
            return (
              <PokemonCard
                key={el.id}
                id={el.id as string}
                name={el.name}
                image={el.image}
              />
            );
          })}
      </div>
    </>
  );
};

export default Home;
