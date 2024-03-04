import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/battle/battleSlice";

// Emoji
import * as Emoji from "./Emoji";

const Info = () => {
  const navigate = useNavigate();
  // 사용자 정보 가져오기
  const user = useSelector(selectUser);
  // 사용자가 깃헙에 등록한 정보 개수에 따른 렌더링 분기점 State 생성
  const [condition, setCondition] = useState(true);

  useEffect(() => {
    if (user.name === "") {
      return navigate("/");
    } else {
      if (user.info === 8) {
        setCondition(true);
      } else if (user.info >= 4) {
        setCondition(false);
      } else {
        setCondition(null);
      }
    }
  }, [user, navigate]);

  return (
    <>
      <div className="detail_frame">
        <div className="frame col">
          {condition === true ? (
            <>
              <Emoji.EmojiInfoTrue />
              <p className="desc">
                {user.name}님에 대한 소개를 <span>자세하고 완벽하게</span> 해놓으셨네요.
                <br />
                <span>멋저요</span>, 이력서가 따로 필요없을 정도예요!
              </p>
            </>
          ) : condition === false ? (
            <>
              <Emoji.EmojiInfoFalse />
              <p className="desc">
                {user.name}님에 대한 소개를 <span>어느정도</span> 해놓으셨네요.
                <br />
                <span>좋아요</span>, 시간이 된다면 더 적어볼까요?
              </p>
            </>
          ) : (
            <>
              <Emoji.EmojiInfoNull />
              <p className="desc">
                {user.name}님에 대한 소개를 <span>거의 안하셨어요</span>.
                <br />
                <span>우선</span>, 이거부터 합시다!
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

export default Info;
