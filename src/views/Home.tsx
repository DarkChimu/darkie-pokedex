import SearchBar from "@/components/Bars/SearchBar";
import Loader from "@/components/Loaders/Loader";
import { usePokemonsData } from "@/hooks/usePokemonsData";
import { useCallback, useEffect } from "react";

const Home = () => {
  const { pokemonList, fetchPokemons, searchByPokemonName, loading } =
    usePokemonsData();

  useEffect(() => {
    fetchPokemons();
  }, []);

  const computedIdValue = useCallback((id: string) => {
    return parseInt(id) > 100 ? id : parseInt(id) > 10 ? `0${id}` : `00${id}`;
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 id="AppTitle" className="text-7xl max-w-prose font-bold">
          Pokédex
        </h1>
        <p className="max-w-pros text-slate-300 text-sm sm:text-lg  max-w-xl rounded-2xl sm:text-left xs:text-center">
          Search for a Pokémon by name or using its National Pokédex number.
        </p>
      </div>
      <SearchBar callback={searchByPokemonName} />

      {loading && <Loader />}

      <div className="grid grid-cols-2 gap-4 ">
        {!loading &&
          pokemonList?.results?.map((el) => {
            return (
              <div
                key={el.name}
                className={`poke-bg poke-bg-${el.id} rounded-lg text-slate-300`}
              >
                <a href="#">
                  <img
                    src={el.image}
                    width={"100%"}
                    style={{ objectFit: "cover" }}
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
                      {el.name}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-slate-300">
                    {computedIdValue(el.id as string)}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
