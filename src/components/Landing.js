import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser1, updateUser2, selectUser1, selectUser2, selectScoreUser1, selectScoreUser2 } from "../features/battle/battleSlice";

// Modules
import * as module from "../modules/github.module.js";

// Style
import styles from "../styles/Landing.module.scss";

const Landing = () => {
  const user1 = useSelector(selectUser1);
  const user2 = useSelector(selectUser2);
  const scoreUser1 = useSelector(selectScoreUser1);
  const scoreUser2 = useSelector(selectScoreUser2);
  const dispatch = useDispatch();
  const user1Ref = useRef(null);
  const user2Ref = useRef(null);

  useEffect(() => {
    console.log(scoreUser1);
    console.log(scoreUser2);
  }, [scoreUser1, scoreUser2]);

  async function isUser() {
    try {
      const user1Value = user1Ref.current.value;
      const user2Value = user2Ref.current.value;
      let repoUser1;
      let repoUser2;

      if (user1Value === "" || user2Value === "") {
        return alert("사용자 명을 입력해주세요.");
      }
      if (user1Value === user2Value) {
        return alert("같은 사용자를 비교하긴 어렵습니다!");
      }

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
      }
    } catch (err) {
      console.error("Error in Landing, isUser(): ", err);
    }
  }

  return (
    <>
      <div className="frame col">
        <div className={styles.logo}>
          <img src="/images/Github.svg" alt=""></img>
        </div>
        <p className={styles.title}>Github Battle</p>
        <p className={styles.desc}>Github 사용자의 레포지토리를 분석하여 점수를 부여하고 비교할 수 있습니다.</p>
        <p className={styles.desc}>전문가의 분석이 아니므로, 재미로만 사용하시길 바랍니다.</p>
        <p className={styles.tiny}>* 점수는 비교하는 사용자에 따라 달라질 수 있습니다.</p>
        <div className={styles.input}>
          <input ref={user1Ref} placeholder="사용자 1" />
          <p>님과</p>
          <input ref={user2Ref} placeholder="사용자 2" />
          <p>님을 분석할게요.</p>
        </div>
        <button className={styles.btn_analysis} onClick={() => isUser()}>
          분석하기
        </button>
      </div>
    </>
  );
};

export default Landing;
