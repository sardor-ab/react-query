import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const getAll = () => {
  return axios.get("http://localhost:3001/all");
};

const ItemList = () => {
  const { isLoading, data } = useQuery("all", getAll);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data?.data.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
    </div>
  );
};

export default ItemList;
