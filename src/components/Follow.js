import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/battle/battleSlice";

// Emoji
import * as Emoji from "./Emoji";

const Follow = () => {
  // 사용자 정보 가져오기
  const user = useSelector(selectUser);
  const followers = user.followers * 2;
  const following = user.following * 2;
  // 팔로우/팔로잉 개수에 따른 렌더링 분기점 State 생성
  const [condition, setCondition] = useState(true);

  useEffect(() => {
    if (followers >= 20 || following >= 20) {
      setCondition(true);
    } else if (followers >= 10 || following >= 10) {
      setCondition(false);
    } else {
      setCondition(null);
    }
  }, [followers, following]);
  return (
    <>
      <div className="detail_frame">
        <div className="frame col">
          {condition === true ? (
            <>
              <Emoji.EmojiFollowTrue />
              <p className="desc">
                {user.name}님의 <span>팔로우</span>는 {followers}명이고, <span>팔로잉</span>은 {following}명이네요!
                <br /> 여러 사람들과 소통하려고 하는 자세가 대단해요!
              </p>
            </>
          ) : condition === false ? (
            <>
              <Emoji.EmojiFollowFalse />
              <p className="desc">
                {user.name}님의 <span>팔로우</span>는 {followers}명이고, <span>팔로잉</span>은 {following}명이네요!
                <br />
                여러 사람들과 소통하는 일은 분명 쉬운일은 아니지만, 빨리 성장하는 지름길이에요.
              </p>
            </>
          ) : (
            <>
              <Emoji.EmojiFollowNull />
              <p className="desc">
                {user.name}님의 <span>팔로우</span>는 {followers}명이고, <span>팔로잉</span>은 {following}명이네요...
                <br />
                우선 여러 사람들과 친해져보는건 어때요?
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

export default Follow;
