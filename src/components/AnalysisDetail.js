import React from "react";

// Components
import CreatedAt from "./CreatedAt";
import Follow from "./Follow";
import Repo from "./Repo";
import Info from "./Info";
import RecentPush from "./RecentPush";
import TotalPush from "./TotalPush";
import Result from "./Result";
import Ending from "./Ending";

const AnalysisDetail = () => {
  return (
    <>
      <CreatedAt />
      <Follow />
      <Repo />
      <Info />
      <RecentPush />
      <TotalPush />
      <Result />
      <Ending />
    </>
  );
};

export default AnalysisDetail;
