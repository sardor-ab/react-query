import axios from "axios";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import queryString from "query-string";

const fetcher = async (data) => {
  return await axios.get(`http://localhost:3001/${data}`);
};

export const useFetchTeams = (league = 0) => {
  let params = "";

  if (league > 0) {
    params = `?league_id_like=${league}`;
  }

  const res = useQuery(["teams", league], () => {
    return axios.get(`http://localhost:3001/teams${params}`);
  });

  return res;
};

export const useFetchPlayers = (league, club, position, page = 1) => {
  let params = "";
  let param_league = "";
  let param_club = "";
  let param_position = "";
  let club_ids = [];
  let position_ids = [];

  if (league > 0) {
    param_league = `league_id_like=${league}`;
  }

  const clubs = useQuery(["teams", param_league], () => {
    return axios.get(`http://localhost:3001/teams?${param_league}`);
  });

  clubs.data?.data?.forEach((club) => {
    club_ids.push(club.id);
  });

  const positions = useQuery("positions", () => {
    return axios.get(`http://localhost:3001/positions`);
  });

  positions.data?.data?.forEach((position) => {
    position_ids.push(position.id);
  });

  const param_clubs_id = queryString.stringify({ club_id: club_ids });
  param_club += param_clubs_id;

  if (club) {
    param_club = `club_id=${club}`;
  }

  const param_positions_id = queryString.stringify({
    position_id: position_ids,
  });
  param_position += param_positions_id;

  if (position) {
    param_position = `position_id=${position}`;
  }

  params = `${param_club}&${param_position}`;

  const res = useInfiniteQuery(
    ["players", param_club, param_position],
    ({ pageParam = 1 }) => {
      return axios.get(
        `http://localhost:3001/players?${params}&_limit=5&_page=${pageParam}`
      );
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = 3;
        const nextPage = allPages.length + 1;

        return nextPage <= maxPages ? nextPage : undefined;
      },
    }
  );

  return res;
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

export const useFetchPositionsData = () => {
  return useQuery("positions", () => fetcher("positions"));
};
