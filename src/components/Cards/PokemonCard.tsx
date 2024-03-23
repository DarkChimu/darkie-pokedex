import { formatIdToShow } from "@/helpers/format-pokemons";
import { PokedexListResult } from "@/models";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

interface PokemonCard extends PokedexListResult {
  replace: boolean;
}

const PokemonCard = memo(
  ({ name, image, id, replace }: Partial<PokemonCard>) => {
    const navigate = useNavigate();

    const handleNavigate = (id: string) =>
      navigate(`/pokemon/${id}`, { replace });
    return (
      <div
        key={name}
        className={`poke-bg poke-bg-${id} rounded-lg text-slate-300`}
        onClick={() => handleNavigate(id as string)}
      >
        <div id="pokecard">
          <img src={image} width={"100%"} style={{ objectFit: "cover" }} />
        </div>
        <div className="p-5">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
              {name}
            </h5>
          </div>
          <p className="mb-3 font-normal text-slate-300">
            {formatIdToShow(id as string)}
          </p>
        </div>
      </div>
    );
  }
);

export default PokemonCard;
