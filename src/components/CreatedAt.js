import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectOpponent } from "../features/battle/battleSlice";

// Emoji
import * as Emoji from "./Emoji";

const CreatedAt = () => {
  // 두 사용자 정보 가져오기
  const user = useSelector(selectUser);
  const opponent = useSelector(selectOpponent);
  // 깃헙 생성 년월이 더 빠른 사람 상태 설정
  const [isUserEarlyJoined, setIsUserEarlyJoined] = useState(true);
  const userCreatedAt = user.created_at.substr(0, 4);
  const opponentCreatedAt = opponent.created_at.substr(0, 4);

  useEffect(() => {
    if (userCreatedAt > opponentCreatedAt) {
      setIsUserEarlyJoined(false);
    } else if (userCreatedAt < opponentCreatedAt) {
      setIsUserEarlyJoined(true);
    } else {
      setIsUserEarlyJoined(null);
    }
  }, [user, opponent, isUserEarlyJoined, userCreatedAt, opponentCreatedAt]);

  return (
    <>
      <div className="detail_frame">
        <div className="frame col">
          <Emoji.EmojiCreatedAt />
          {isUserEarlyJoined === true ? (
            <p className="desc">
              {user.name}님은 <span>{userCreatedAt}</span>년에 깃허브를 처음 시작하셨네요!
              <br />
              {opponent.name}님보다 일찍 가입하셨어요. <br />
              일찍 가입한만큼 잘 하셨을거라 믿어요.
            </p>
          ) : isUserEarlyJoined === false ? (
            <p className="desc">
              {user.name}님은 <span>{userCreatedAt}</span>년에 깃허브를 처음 시작하셨네요! <br />
              {opponent.name}님보다 늦게 가입하셨어요. <br />
              늦었지만 그동안 잘하셨는지 확인해볼까요?
            </p>
          ) : (
            <p className="desc">
              {user.name}님은 <span>{userCreatedAt}</span>년에 깃허브를 처음 시작하셨네요! <br />
              {opponent.name}님과 같은 년도에 가입하셨어요. <br />두 분이 지금까지 얼마나 잘하셨는지 볼까요?
            </p>
          )}
        </div>
        <p className="more">
          <span>다음 분석정보</span>를 보려면 <span>아래</span>로 <span>스크롤</span>하세요!
        </p>
      </div>
    </>
  );
};

export default CreatedAt;
