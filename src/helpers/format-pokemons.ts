import { PokedexListResult, Pokemon } from "@/models";

/**
 * Get Pokemon Sprites
 * @param {Pokemon} data Pokemon
 * @returns {Pokemon}
 */
export const getPokeSprites = (data: Pokemon) => {
  const { sprites } = data;

  const official_artwork = sprites.other?.["official-artwork"];
  const dream_world = sprites?.other?.dream_world;
  const home = sprites?.other?.home;

  return {
    ...data,
    sprites: {
      other: {
        "official-artwork": {
          front_default:
            official_artwork?.front_default ||
            dream_world?.front_default ||
            home?.front_default,
          front_shiny: official_artwork?.front_shiny,
        },
      },
    },
  } as Pokemon;
};

export const formatPokemonsResults = (
  pokemon: PokedexListResult,
  data: Pokemon
) => {
  const { id, name, sprites, types } = data;

  const official_artwork = sprites.other?.["official-artwork"];
  const dream_world = sprites?.other?.dream_world;
  const home = sprites?.other?.home;

  return {
    id,
    name,
    types,
    url: pokemon.url,
    sprites: {
      other: {
        "official-artwork": {
          front_default:
            official_artwork?.front_default ||
            dream_world?.front_default ||
            home?.front_default,
          front_shiny: official_artwork?.front_shiny,
        },
      },
    },
  };
};

export const formatPokemonBySearch = (data: Pokemon) => {
  return {
    ...data,
    id: data.id,
    name: data.name,
    url: `https://pokeapi.co/api/v2/pokemon/${data.name}`,
    image: data.sprites.other?.["official-artwork"].front_default,
  };
};

/**
 * Formats Hectograms to Kilograms
 * @param {any} weight number | string
 * @returns {number}
 */

export const formatWeightToKg = (weight: number | string): number => {
  return Number(weight) / 10;
};

/**
 * Formats Hectograms to Kilograms
 * @param {any} height number | string
 * @returns {number}
 */
export const formatHeightToMeters = (height: number | string): number => {
  return Number(height) / 10;
};

/**
 * Formats Pokémon weight and return the value in kilograms/grams
 * @param {any} weight number | string
 * @returns {string}
 */
export const formatPokemonWeight = (weight: number | string): string => {
  const weightInKg = formatWeightToKg(weight);

  if (weightInKg < 1) {
    return `${weightInKg * 1000}g`;
  } else {
    return `${weightInKg}kg`;
  }
};

/**
 * Formats Pokémon height and return the value in meters/centimeters
 * @param {any} height number | string
 * @returns {string}
 */
export const formatPokemonHeight = (height: number | string): string => {
  const heightInMeters = formatHeightToMeters(height);

  if (heightInMeters < 1) {
    return `${heightInMeters * 100}cm`;
  } else {
    return `${heightInMeters}m`;
  }
};

export const formatIdToShow = (id: string) =>
  parseInt(id) > 99 ? id : parseInt(id) > 10 ? `0${id}` : `00${id}`;

export const extractIdFromUrl = (url: string) => {
  const regex = /\/(\d+)\/$/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const generateImage = (id: string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
