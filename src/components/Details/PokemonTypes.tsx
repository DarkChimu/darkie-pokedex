import { Type } from "@/models";
import React from "react";

const PokemonTypes = ({ types }: { types: Array<Type> }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {types &&
          types.map(({ type }) => (
            <div
              key={type.name}
              className="flex items-center capitalize justify-center h-16 rounded-xl shadow-social-link hover:shadow-social-link-hover transition-shadow text-slate-300"
            >
              {type.name}
            </div>
          ))}
      </div>
    </>
  );
};

export default PokemonTypes;
