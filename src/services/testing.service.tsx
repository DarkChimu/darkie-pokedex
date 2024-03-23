import axios from "axios";
import { getInLocalStorage, LocalStorageKeys } from "@/utilities";

const randomize = () => {
  const random = Math.floor(Math.random() * 1302) + 1 - 65;
  return random > 1 ? random : 1;
};

export const testingService = () => {
  return axios.get(`pokemon?offset=${randomize()}&limit=20`);
};

export const showPokemon = (identifier: string) => {
  return axios.get(`pokemon/${identifier}`);
};

export const showEvolutionTree = (identifier: string | number) => {
  return axios.get(`evolution-chain/${identifier}`);
};

export const showSpeciesData = (identifier: string | number) => {
  return axios.get(`pokemon-species/${identifier}`);
};

export const refreshToken = () => {
  return axios.post(
    "https://rickandmortyapi.com/api/refreshtoken",
    {},
    {
      headers: {
        Authorization: getInLocalStorage(LocalStorageKeys.REFRESH_TOKEN),
      },
    }
  );
};

export const types = async (type?: string) => {
  const response = await axios.get(`type/${type ?? ""}`);
  return response.data;
};
