import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { init, updateUser1, updateUser2 } from "../features/battle/battleSlice";

// Modules
import * as module from "../modules/github.module.js";

// Style
import styles from "../styles/Landing.module.scss";

// Loading
import Loading from "./Loading.js";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  const user1Ref = useRef(null);
  const user2Ref = useRef(null);

  const [userName, setUserName] = useState([]);

  useEffect(() => {
    // 초기화
    dispatch(init());
  }, [dispatch]);

  async function isUser() {
    try {
      const user1Value = user1Ref.current.value;
      const user2Value = user2Ref.current.value;
      setUserName([user1Value, user2Value]);
      let repoUser1;
      let repoUser2;

      if (user1Value === "" || user2Value === "") {
        alert("사용자 명을 입력해주세요.");
        return;
      }
      if (user1Value === user2Value) {
        alert("같은 사용자를 비교하긴 어렵습니다!");
        return;
      }

      setIsLoading(true); // 로딩 상태 설정
      const result = await module.IsUser(user1Value, user2Value);

      switch (result) {
        case "ERR_user1_not_found":
          return alert(user1Value + "은(는) 없는 사용자입니다.");
        case "ERR_user2_not_found":
          return alert(user2Value + "은(는) 없는 사용자입니다.");
        default:
          // 불러온 유저1, 2 정보 각가 저장하기
          repoUser1 = result[0];
          repoUser2 = result[1];
          // 두 사용자의 깃헙 정보 업데이트
          dispatch(updateUser1(result[0]));
          dispatch(updateUser2(result[1]));
          // 사용자 깃헙 정보 기반 점수 계산
          await module.StartAnalysis(dispatch, repoUser1, repoUser2, user1Value, user2Value);
          navigate("/analysis");
      }
    } catch (err) {
      console.error("Error in Landing, isUser(): ", err);
    } finally {
      return setIsLoading(false); // 로딩 상태 해제
    }
  }

  return (
    <>
      {isLoading && <Loading user={userName} />}
      <div className="frame absoulte col">
        <div className={styles.logo}>
          <img src="/github-battle/images/Github.svg" alt="" />
        </div>
        <p className={styles.title}>
          Github Battle <span>version 1.0.0</span>
        </p>
        <p className={styles.desc}>Github 사용자의 레포지토리를 분석하여 점수를 부여하고 비교할 수 있습니다.</p>
        <p className={styles.desc}>전문가의 분석이 아니므로, 재미로만 사용하시길 바랍니다.</p>
        <p className={styles.tiny}>* 점수는 비교하는 사용자에 따라 달라질 수 있습니다.</p>
        <div className={styles.input}>
          <input ref={user1Ref} placeholder="나" />
          <p>님과</p>
          <input ref={user2Ref} placeholder="상대방" />
          <p>님을 분석할게요.</p>
        </div>
        <p className={styles.tiny}>
          <span>* 입력란에는 github 고유 아이디를 입력하세요.</span>
        </p>
        <button className={styles.btn_analysis} onClick={() => isUser()}>
          분석하기
        </button>
      </div>
    </>
  );
};

export default Landing;
