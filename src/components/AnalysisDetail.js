import React from "react";
import { useSelector } from "react-redux";
import { selectScoreUser1, selectScoreUser2 } from "../features/battle/battleSlice";

const AnalysisDetail = () => {
  // 두 사용자 정보 가져오기
  const user1 = useSelector(selectScoreUser1);
  const user2 = useSelector(selectScoreUser2);

  
};

export default AnalysisDetail;
