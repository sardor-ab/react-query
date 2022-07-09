import React from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useFetchData } from "../../hooks/hooks";

const PlayerPage = () => {
  const { id } = useParams();
  const { data } = useFetchData("players", id);
  return (
    <div className="PlayerPage">
      <div className="PlayerPage__content">
        <div className="PlayerPage__content-general">
          <Typography variant="h6" gutterBottom component="div">
            {data?.data.name}&nbsp;{data?.data.surname}
          </Typography>
        </div>
        <div className="PlayerPage__content-profile">
          <Typography variant="subtitle2" gutterBottom component="div">
            PROFILE
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
