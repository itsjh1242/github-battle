import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectOpponent } from "../features/battle/battleSlice";

// Emoji
import * as Emoji from "./Emoji";

const RecentPush = () => {
  // 두 사용자 정보 가져오기
  const user = useSelector(selectUser);
  const opponent = useSelector(selectOpponent);
  // 더 최근에 활동한 사람에 대한 분기
  const [isUserRecentPush, setIsUserRecentPush] = useState(true);
  const userPushDate = user.recentPushDate;
  const opponentPushDate = opponent.recentPushDate;

  useEffect(() => {
    if (userPushDate > opponentPushDate) {
      setIsUserRecentPush(true);
    } else if (userPushDate < opponentPushDate) {
      setIsUserRecentPush(false);
    } else {
      setIsUserRecentPush(null);
    }
  }, [user, opponent, userPushDate, opponentPushDate]);

  return (
    <>
      <div className="detail_frame">
        <div className="frame col">
          {isUserRecentPush === true ? (
            <>
              <Emoji.EmojiRecentPushTrue />
              <p className="desc">
                {user.name}님이 {opponent.name}님보다 <span>최근에</span> 활동을 하셨어요.
                <br />
                이걸로 성실함을 모두 알 수는 없지만, 그래도 <span>이겼네요!</span>
              </p>
            </>
          ) : isUserRecentPush === false ? (
            <>
              <Emoji.EmojiRecentPushFalse />
              <p className="desc">
                {opponent.name}님이 {user.name}님보다 <span>최근에</span> 활동을 하셨어요.
                <br />
                <span>이번엔 졌지만,</span> 이걸로 성실함을 모두 알 수는 없잖아요!
              </p>
            </>
          ) : (
            <>
              <Emoji.EmojiRecentPushNull />
              <p className="desc">
                신기한 일이네요, 두 분 모두 최근에 활동한 흔적이 보여요.
                <br />
                <span>비겼네요</span>, 같이 성장하면 좋은거죠!
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

export default RecentPush;
