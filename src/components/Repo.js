import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/battle/battleSlice";

// Emoji
import * as Emoji from "./Emoji";

const Repo = () => {
  // 사용자 정보 가져오기
  const user = useSelector(selectUser);
  const repo = user.repo * 2;
  // 레포지토리 개수에 따른 렌더링 분기점 State 생성
  const [condition, setCondition] = useState(true);

  useEffect(() => {
    if (repo >= 40) {
      setCondition(true);
    } else if (repo >= 20) {
      setCondition(false);
    } else if (repo >= 5) {
      setCondition("Extra");
    } else {
      setCondition(null);
    }
  }, [repo]);
  return (
    <>
      <div className="detail_frame">
        <div className="frame col">
          {condition === true ? (
            <>
              <Emoji.EmojiRepoTrue />
              <p className="desc">
                {user.name}님의 <span>레포지토리</span>는 총 <span>{repo}개</span>네요.
                <br />
                <span>훌륭해요</span>, 정말 열심히 하시는군요!
              </p>
            </>
          ) : condition === false ? (
            <>
              <Emoji.EmojiRepoFalse />
              <p className="desc">
                {user.name}님의 <span>레포지토리</span>는 총 <span>{repo}개</span>네요.
                <br />
                <span>좋아요</span>, 계속 이렇게 열심히 하실거죠?
              </p>
            </>
          ) : condition === "Extra" ? (
            <>
              <Emoji.EmojiRepoExtra />
              <p className="desc">
                {user.name}님의 <span>레포지토리</span>는 총 <span>{repo}개</span>네요.
                <br />
                <span>나쁘지 않아요</span>, 그렇다고 좋다는건 아니에요!
              </p>
            </>
          ) : (
            <>
              <Emoji.EmojiRepoNull />
              <p className="desc">
                {user.name}님의 <span>레포지토리</span>는 총 <span>{repo}개</span>네요.
                <br />
                어떤 사정이 있는지는 모르지만, 더 열심히 해봅시다!
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

export default Repo;
