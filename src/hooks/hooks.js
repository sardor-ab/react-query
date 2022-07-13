import axios from "axios";
import { useMutation, useQuery } from "react-query";

const fetcher = (data, index) => {
  return axios.get(`http://localhost:3001/${data}/${index}`);
};

export const useFetchData = (data, index) => {
  return useQuery([data, index], () => fetcher(data, index));
};

const addNewPlayer = async (player) => {
  const res = await axios.post("http://localhost:3001/players", player);
  return res;
};

export const useAddNewPlayerData = () => {
  return useMutation(addNewPlayer);
};
