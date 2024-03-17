import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Type } from "@/models";

import { TbPokeball } from "react-icons/tb";
import { FaLeaf, FaList } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import PokemonEvolutions from "@/components/Details/PokemonEvolutions";
import PokemonMoves from "@/components/Details/PokemonMoves";
import PokemonTypes from "@/components/Details/PokemonTypes";
import { usePokemonsData } from "@/hooks/usePokemonsData";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchPokemonData, selectedPokemonData } = usePokemonsData();
  const [selectedData, setSelectedData] = useState<string>("forms");

  useEffect(() => {
    if (id) fetchPokemonData(id);
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
            {selectedPokemonData?.name}
          </p>
          <p className="max-w-pros text-slate-300 text-center text-sm capitalize mt-1">
            {selectedPokemonData?.id}
          </p>
        </div>
      </div>

      <div
        key={selectedPokemonData?.name}
        className={`poke-bg poke-bg-${selectedPokemonData?.id} rounded-lg text-slate-300`}
      >
        <div className="flex flex-row justify-center lg:max-h-full">
          <img
            src={
              selectedPokemonData?.sprites.other?.["official-artwork"]
                .front_default
            }
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

      {selectedData === "forms" && selectedPokemonData?.forms && (
        <PokemonEvolutions identifier={id as string} />
      )}
      {selectedData === "moves" && (
        <PokemonMoves
          abilities={selectedPokemonData?.abilities}
          moves={selectedPokemonData?.moves}
        />
      )}
      {selectedData === "types" && (
        <PokemonTypes types={selectedPokemonData?.types as Type[]} />
      )}
    </>
  );
};

export default Details;
