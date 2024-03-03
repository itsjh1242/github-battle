import React from "react";
import { useNavigate } from "react-router-dom";

// Emoji
import * as Emoji from "./Emoji";

const Ending = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="detail_frame">
        <div className="frame col">
          <Emoji.EmojiEnding />
          <p className="desc">
            이용해주셔서 감사합니다!
            <br />
            저는 분석 전문가가 아니기 때문에 <span>100%</span> 정확한 분석이 아닐 수 있어요.
            <br />
            이번 분석에서는 최대한 <span>성실함</span>에 초점을 두려고 했어요.
            <br />
            그럼, 앞으로도 개발자님의 앞날에 <span>행운을</span> 빌게요!
          </p>
          <p className="ending">
            개발 및 디자인: Kim Jun Hyeon | github.com/itsjh1242
            <br />
            Emojis from github.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis
          </p>
          <button className="btn_gift" onClick={() => window.open("https://toss.me/jundev", "_blank")}>
            <div className="row">
              <img src="/images/Hot Beverage 1.svg" alt="" />
              <p>개발자에게 커피 선물하기</p>
            </div>
          </button>
          <button className="btn_main" onClick={() => navigate("/")}>
            <p>메인으로</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Ending;
