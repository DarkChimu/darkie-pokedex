import { Ability, Move } from "@/models";

const PokemonMoves = ({
  abilities,
  moves,
}: {
  abilities?: Array<Ability>;
  moves?: Array<Move>;
}) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        {abilities &&
          abilities.map((ability) => (
            <div
              key={ability.ability.name}
              className="flex items-center capitalize justify-center h-16 rounded-xl shadow-social-link hover:shadow-social-link-hover transition-shadow text-slate-300"
            >
              {ability.ability.name}
            </div>
          ))}
      </div>

      <h2 className="text-lg">Moves:</h2>
      <div className="grid grid-cols-3 gap-3">
        {moves &&
          moves.map(({ move }) => (
            <div
              key={move.name}
              className="flex items-center capitalize justify-center h-16 rounded-xl shadow-social-link hover:shadow-social-link-hover  transition-shadow text-slate-300"
            >
              {move.name}
            </div>
          ))}
      </div>
    </>
  );
};

export default PokemonMoves;
