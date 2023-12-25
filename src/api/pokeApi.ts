import axios from "axios";
import { randomNumber } from "./../utils/math";
export const loadPokemon = async (number?:number) => {
  try {
    const response = await axios.get(
      `/api/api/v2/pokemon/${number? number:randomNumber(1017)}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const listPokemon = async () => {
  try {
    const response = await axios.get(`/api/api/v2/pokemon-species?limit=10000`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
