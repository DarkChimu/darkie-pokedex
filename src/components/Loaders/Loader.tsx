const Loader = () => {
  return (
    <div className="flex flex-row align-center justify-center w-full mt-8">
      <img
        id="loader"
        className={Math.round(Math.random()) === 1 ? "rotateAnim" : ""}
        src="/pokedex.png"
        alt=""
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default Loader;
