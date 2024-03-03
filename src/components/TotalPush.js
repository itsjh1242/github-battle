import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectOpponent } from "../features/battle/battleSlice";

// Emoji
import * as Emoji from "./Emoji";

const TotalPush = () => {
  // 두 사용자 정보 가져오기
  const user = useSelector(selectUser);
  const opponent = useSelector(selectOpponent);
  // 더 많은 푸시를 한 사람에 대한 분기
  const [isUserPushMore, setIsUserPushMore] = useState(true);
  const userTotalPushes = user.totalPushAmount;
  const opponentTotalPushes = opponent.totalPushAmount;

  useEffect(() => {
    if (userTotalPushes > opponentTotalPushes) {
      setIsUserPushMore(true);
    } else if (userTotalPushes < opponentTotalPushes) {
      setIsUserPushMore(false);
    } else {
      setIsUserPushMore(null);
    }
  }, [user, opponent, userTotalPushes, opponentTotalPushes]);

  return (
    <>
      <div className="detail_frame">
        <div className="frame col">
          {isUserPushMore === true ? (
            <>
              <Emoji.EmojiTotalPushTrue />
              <p className="desc">
                {user.name}님이 {opponent.name}님보다 <span>{userTotalPushes - opponentTotalPushes}번</span>만큼 <span>더 많은 활동</span>을 하셨어요.
                <br />
                <span>대단해요</span>, 앞으로도 성장하는 itsjh1242님이 되길 바랄게요!
              </p>
            </>
          ) : isUserPushMore === false ? (
            <>
              <Emoji.EmojiTotalPushFalse />
              <p className="desc">
                {opponent.name}님이 {user.name}님보다 <span>{opponentTotalPushes - userTotalPushes}번</span>만큼 <span>더 많은 활동</span>을 하셨어요.
                <br />
                <span>괜찮아요</span>, 1일 1커밋으로 이겨봅시다!
              </p>
            </>
          ) : (
            <>
              <Emoji.EmojiTotalPushNull />
              <p className="desc">
                {opponent.name}님과 {user.name}님은 활동량이 똑같네요.
                <br />두 분이 함께 <span>성장하는 모습</span>을 지켜볼게요!
              </p>
            </>
          )}
        </div>
        <p className="more">
          <span>다음 분석정보</span>를 보려면 <span>아래</span>로 <span>스크롤</span>하세요!
        </p>
      </div>
    </>
  );
};

export default TotalPush;
