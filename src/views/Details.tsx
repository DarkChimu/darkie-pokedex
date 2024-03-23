import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TbPokeball } from "react-icons/tb";
import { FaList } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import PokemonEvolutions from "@/components/Details/PokemonEvolutions";
import PokemonMoves from "@/components/Details/PokemonMoves";
import { usePokemonsData } from "@/hooks/usePokemonsData";
import PokemonCard from "@/components/Cards/PokemonCard";
import SwipeToSlide from "@/components/Slider/SwipeSlider";
import {
  formatPokemonHeight,
  formatPokemonWeight,
} from "@/helpers/format-pokemons";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchPokemonData, selectedPokemonData } = usePokemonsData();
  const [selectedData, setSelectedData] = useState<string>("forms");

  const pokemonSprite = useMemo(
    () => selectedPokemonData?.sprites?.other,
    [selectedPokemonData?.sprites]
  );

  const pokemonInfo = useMemo(() => {
    const pokemonInfo = [];

    pokemonInfo.push(
      `weight: ${formatPokemonWeight(selectedPokemonData?.weight as number)}`
    );
    pokemonInfo.push(
      `height: ${formatPokemonHeight(selectedPokemonData?.height as number)}`
    );
    pokemonInfo.push(`B. Exp: ${selectedPokemonData?.base_experience}`);
    selectedPokemonData?.stats.map((stat) => {
      const statName =
        stat.stat.name === "special-attack"
          ? "Sp Attack"
          : stat.stat.name === "special-defense"
          ? "Sp Defense"
          : stat.stat.name;
      pokemonInfo.push(`${statName}: ${stat.base_stat}`);
    });

    return pokemonInfo;
  }, [selectedPokemonData?.id]);

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

        <div className="mt-14">
          <PokemonCard
            name={selectedPokemonData?.name}
            id={selectedPokemonData?.id}
            types={selectedPokemonData?.types}
            image={
              pokemonSprite?.["official-artwork"].front_default ??
              pokemonSprite?.home.front_default
            }
          />
        </div>
        <div>
          <SwipeToSlide
            list={pokemonInfo}
            currentValue={""}
            callback={() => {}}
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
          className="inline-flex gap-2 capitalize items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-neutral-700 dark:border-neutral-700 dark:text-white dark:hover:text-white dark:hover:bg-neutral-500 dark:focus:ring-neutral-500 dark:focus:text-white"
          onClick={() => setSelectedData("moves")}
        >
          <FaList />
          abilities
        </button>
        {/*  <button
          type="button"
          className="inline-flex gap-2 capitalize items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-neutral-700 dark:border-neutral-700 dark:text-white dark:hover:text-white dark:hover:bg-neutral-500 dark:focus:ring-neutral-500 dark:focus:text-white"
          onClick={() => setSelectedData("info")}
        >
          <FaLeaf />
          Info
        </button> */}
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
      {/* {selectedData === "info" && (
        <PokemonTypes types={selectedPokemonData?.types as Type[]} />
      )} */}
    </>
  );
};

export default Details;
