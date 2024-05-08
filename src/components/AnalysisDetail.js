import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const usePreventRefresh = () => {
    const preventRefresh = (e) => {
      e.preventDefault();
      e.returnValue = "";
      navigate("/");
    };

    useEffect(() => {
      const handleBeforeUnload = () => {
        window.addEventListener("beforeunload", preventRefresh);
      };
      handleBeforeUnload();

      return () => {
        window.removeEventListener("beforeunload", preventRefresh);
      };
    }, []);
  };
  usePreventRefresh();

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
