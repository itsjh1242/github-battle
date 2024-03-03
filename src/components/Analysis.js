import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectScoreUser1, selectScoreUser2 } from "../features/battle/battleSlice";

// Style
import styles from "../styles/Analysis.module.scss";

const Analysis = () => {
  // 화면에 보여질 두 사용자 점수
  const [scoreUser1, setScoreUser1] = useState(0);
  const [scoreUser2, setScoreUser2] = useState(0);

  // 두 사용자 정보 가져오기
  const user1 = useSelector(selectScoreUser1);
  const user2 = useSelector(selectScoreUser2);

  let [endPointUser1, setEndPointUser1] = useState(user1["totalScore"]);
  let [endPointUser2, setEndPointUser2] = useState(user2["totalScore"]);

  useEffect(() => {
    let currentNumber = 0;
    const counter = setInterval(() => {
      currentNumber += 1;
      setScoreUser1(currentNumber);
      if (currentNumber >= endPointUser1) {
        clearInterval(counter);
      }
    }, Math.abs(Math.floor(3000 / (endPointUser1 - 0))));
  }, [endPointUser1]);

  useEffect(() => {
    let currentNumber = 0;
    const counter = setInterval(() => {
      currentNumber += 1;
      setScoreUser2(currentNumber);
      if (currentNumber >= endPointUser2) {
        clearInterval(counter);
      }
    }, Math.abs(Math.floor(3000 / (endPointUser2 - 0))));
  }, [endPointUser2]);

  return (
    <>
      <div className="frame row">
        {/* User 1 */}
        <div className={styles.user}>
          <div className={styles.profile}>
            <div className={styles.avatar}>
              <img src={user1["avatar"]} alt="" />
            </div>
            <p>name</p>
          </div>
          <p className={styles.score}>
            <span>{scoreUser1}</span>점
          </p>
        </div>
        {/* User 2 */}
        <div className={styles.user}>
          <div className={styles.profile}>
            <div className={styles.avatar}>
              <img src={user2["avatar"]} alt="" />
            </div>
            <p>name</p>
          </div>
          <p className={styles.score}>
            <span>{scoreUser2}</span>점
          </p>
        </div>
        <p className="more">
          <span>분석 정보</span>를 보려면 <span>사용자</span>를 <span>클릭</span>하세요!
        </p>
      </div>
    </>
  );
};

export default Analysis;
