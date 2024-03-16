const Header = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1 id="AppTitle" className="text-7xl max-w-prose font-bold">
        Pokédex
      </h1>
      <p className="max-w-pros text-slate-300 text-sm sm:text-lg  max-w-xl rounded-2xl sm:text-left xs:text-center">
        Search for a Pokémon by name or using its National Pokédex number.
      </p>
    </div>
  );
};

export default Header;
