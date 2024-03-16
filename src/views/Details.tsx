import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pokemon, Type } from "@/models";
import { showPokemon } from "@/services/testing.service";
import { TbPokeball } from "react-icons/tb";
import { FaLeaf, FaList } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import PokemonEvolutions from "@/components/Details/PokemonEvolutions";
import PokemonMoves from "@/components/Details/PokemonMoves";
import PokemonTypes from "@/components/Details/PokemonTypes";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [selectedData, setSelectedData] = useState<string>("forms");

  const fetchPokemonData = async () => {
    if (!id) return;
    try {
      const { data } = await showPokemon(id);
      setPokemonData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, [id]);

  return (
    <>
      <div className="relative flex flex-col gap-3 justify-center">
        <button
          type="button"
          className="absolute text-4xl max-w-prose font-bold left-0 top-1.5"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack />
        </button>
        <div>
          <p className="max-w-pros text-slate-300 text-center text-4xl rounded-2xl capitalize">
            {pokemonData?.name}
          </p>
          <p className="max-w-pros text-slate-300 text-center text-sm capitalize mt-1">
            {pokemonData?.id}
          </p>
        </div>
      </div>

      <div
        key={pokemonData?.name}
        className={`poke-bg poke-bg-${pokemonData?.id} rounded-lg text-slate-300`}
      >
        <div className="flex flex-row justify-center lg:max-h-full">
          <img
            src={pokemonData?.sprites.other?.["official-artwork"].front_default}
            width={"100%"}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div
        className="mx-auto inline-flex rounded-md shadow-sm box-content"
        role="group"
      >
        <button
          type="button"
          className="inline-flex gap-2 capitalize items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-neutral-700 dark:border-neutral-700 dark:text-white dark:hover:text-white dark:hover:bg-neutral-500 dark:focus:ring-neutral-500 dark:focus:text-white"
          onClick={() => setSelectedData("forms")}
        >
          <TbPokeball />
          forms
        </button>
        <button
          type="button"
          className="inline-flex gap-2 capitalize items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-neutral-700 dark:border-neutral-700 dark:text-white dark:hover:text-white dark:hover:bg-neutral-500 dark:focus:ring-neutral-500 dark:focus:text-white"
          onClick={() => setSelectedData("moves")}
        >
          <FaList />
          abilities
        </button>
        <button
          type="button"
          className="inline-flex gap-2 capitalize items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-neutral-700 dark:border-neutral-700 dark:text-white dark:hover:text-white dark:hover:bg-neutral-500 dark:focus:ring-neutral-500 dark:focus:text-white"
          onClick={() => setSelectedData("types")}
        >
          <FaLeaf />
          types
        </button>
      </div>

      {selectedData === "forms" && pokemonData?.forms && (
        <PokemonEvolutions identifier={id as string} />
      )}
      {selectedData === "moves" && (
        <PokemonMoves
          abilities={pokemonData?.abilities}
          moves={pokemonData?.moves}
        />
      )}
      {selectedData === "types" && (
        <PokemonTypes types={pokemonData?.types as Type[]} />
      )}
    </>
  );
};

export default Details;
