/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from "react";
import PokemonCard from "../Cards/PokemonCard";
import Loader from "../Loaders/Loader";
import { extractIdFromUrl, generateImage } from "@/helpers/format-pokemons";

const PokemonEvolutions = memo(
  ({ identifier, species, evolves_to, loading }: any) => {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 gap-4 ">
            {species &&
              extractIdFromUrl(species?.url as string) !== identifier && (
                <PokemonCard
                  id={extractIdFromUrl(species.url) as string}
                  name={species.name}
                  image={generateImage(extractIdFromUrl(species.url) as string)}
                  replace={true}
                />
              )}
            {evolves_to.map(({ evolves_to, species }: any) => {
              return (
                <>
                  {species &&
                    extractIdFromUrl(species?.url as string) !== identifier && (
                      <PokemonCard
                        key={species.url}
                        id={extractIdFromUrl(species.url) as string}
                        name={species.name}
                        image={generateImage(
                          extractIdFromUrl(species.url) as string
                        )}
                        replace={true}
                      />
                    )}
                  {evolves_to.map(({ species }: any) => {
                    const id = extractIdFromUrl(species.url) as string;
                    if (id !== identifier) {
                      return (
                        <PokemonCard
                          key={id}
                          name={species.name}
                          id={id}
                          image={generateImage(id)}
                          replace={true}
                        />
                      );
                    }
                  })}
                </>
              );
            })}
          </div>
        )}
      </>
    );
  }
);

export default PokemonEvolutions;
