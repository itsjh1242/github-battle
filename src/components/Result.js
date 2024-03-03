import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectOpponent } from "../features/battle/battleSlice";

// Emoji
import * as Emoji from "./Emoji";

const Result = () => {
  // 두 사용자 정보 가져오기
  const user = useSelector(selectUser);
  const opponent = useSelector(selectOpponent);
  // 점수 결과 비교
  const [isUserWin, setIsUserWin] = useState(true);
  const userTotalScore = Math.floor(user.totalScore);
  const opponentTotalScore = Math.floor(opponent.totalScore);

  useEffect(() => {
    if (userTotalScore > opponentTotalScore) {
      setIsUserWin(true);
    } else {
      setIsUserWin(false);
    }
  }, [user, opponent, userTotalScore, opponentTotalScore]);

  return (
    <>
      <div className="detail_frame">
        <div className="frame col">
          {isUserWin === true ? (
            <>
              <Emoji.EmojiTotalScoreTrue />
              <p className="desc">
                와우, {opponent.name}님보다 우수하시네요.
                <br />
                {user.name}님의 총 점수는 <span>{userTotalScore}점</span>이고, <span>{userTotalScore - opponentTotalScore}점</span> 차이로 이겼어요!
              </p>
            </>
          ) : (
            <>
              <Emoji.EmojiTotalScoreFalse />
              <p className="desc">
                이런, {opponent.name}님에게 상대가 안되네요!
                <br />
                {user.name}님의 총 점수는 <span>{userTotalScore}점</span>이고, <span>{opponentTotalScore - userTotalScore}점</span> 차이로 졌어요.
              </p>
            </>
          )}
        </div>
        <p className="more">
          아래로 <span>스크롤</span>하여 <span>더보기</span>
        </p>
      </div>
    </>
  );
};

export default Result;
