import { usePokemonsData } from "@/hooks/usePokemonsData";
import { memo, useEffect } from "react";
import PokemonCard from "../Cards/PokemonCard";
import { extractIdFromUrl, generateImage } from "@/helpers/format-pokemons";

const PokemonEvolutions = memo(({ identifier }: { identifier: string }) => {
  const { fetchEvolutionsData, evolutionsData } = usePokemonsData();

  useEffect(() => {
    if (identifier) fetchEvolutionsData(identifier);
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 ">
        {evolutionsData?.chain.species &&
          extractIdFromUrl(evolutionsData?.chain?.species?.url as string) !==
            identifier && (
            <PokemonCard
              id={extractIdFromUrl(evolutionsData.chain.species.url) as string}
              name={evolutionsData.chain.species.name}
              image={generateImage(
                extractIdFromUrl(evolutionsData.chain.species.url) as string
              )}
              replace={true}
            />
          )}
        {evolutionsData?.chain.evolves_to.map(({ evolves_to, species }) => {
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
              {evolves_to.map(({ species }) => {
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
    </>
  );
});

export default PokemonEvolutions;
