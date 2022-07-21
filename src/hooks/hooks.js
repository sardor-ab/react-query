import axios from "axios";
import { useMutation, useQuery } from "react-query";

const fetcher = async (data) => {
  return await axios.get(`http://localhost:3001/${data}`);
};

export const useFetchTeams = (league = 0, shouldUpdate, setShouldUpdate) => {
  let params = "";

  if (league > 0) {
    params = `?league_id_like=${league}`;
  }

  const res = useQuery(
    "teams",
    () => {
      return axios.get(`http://localhost:3001/teams${params}`);
    },
    {
      enabled: shouldUpdate,
      onSuccess: () => {
        setShouldUpdate(false);
      },
    }
  );

  return res;
};

const useFetchPlayers = async (data, club, position) => {
  return await axios.get(
    `http://localhost:3001/${data}?club=${club}&position=${position}`
  );
};

const addNewPlayer = async (player) => {
  const res = await axios.post("http://localhost:3001/players", player);
  return res;
};

export const useAddNewPlayerData = () => {
  return useMutation(addNewPlayer);
};

export const useFetchLeaguesData = () => {
  return useQuery("leagues", () => fetcher("leagues"));
};

export const useFetchTeamsData = (league) => {
  return useQuery("teams", () => fetcher("teams"));
};

export const useFetchPositionsData = () => {
  return useQuery("positions", () => fetcher("positions"));
};

// export const useFetchBaseFilterList = (name) => {
//   return useQuery([name], () => axios.get(`http://localhost:3001/${name}`));
// };

// export const useFetchDependentFilterList = (name = "teams", league) => {
//   return useQuery(
//     [league],
//     () => axios.get(`http://localhost:3001/${name}?league_id_like=${league}`),
//     {
//       enabled: !!name,
//     }
//   ); // <- query-string
// };

// export const useFetchDependentFilterList = (
//   name = "players",
//   league = "",
//   position = ""
// ) => {
//   return useQuery(name, () =>
//     axios.get(
//       `http://localhost:3001/${name}?league_like=${league}&position_like=${position}`
//     )
//   ); // <- query-string
// };
