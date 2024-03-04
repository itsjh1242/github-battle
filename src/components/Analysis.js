import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectScoreUser1, selectScoreUser2, defineUser } from "../features/battle/battleSlice";

// Style
import styles from "../styles/Analysis.module.scss";

const Analysis = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 화면에 보여질 두 사용자 점수
  const [scoreUser1, setScoreUser1] = useState(0);
  const [scoreUser2, setScoreUser2] = useState(0);

  // 두 사용자 정보 가져오기
  const user1 = useSelector(selectScoreUser1);
  const user2 = useSelector(selectScoreUser2);

  let [endPointUser1, setEndPointUser1] = useState(Math.floor(user1["totalScore"]));
  let [endPointUser2, setEndPointUser2] = useState(Math.floor(user2["totalScore"]));

  const moveDetail = (params) => {
    // 두 사용자 간의 비교를 위해 아바타 클릭 시 보여지는 나, 상대방 정의
    if (params === "user1") {
      dispatch(defineUser({ user: user1, opponent: user2 }));
    } else {
      dispatch(defineUser({ user: user2, opponent: user1 }));
    }
    navigate(`/analysis/detail/${params}`);
  };

  // 숫자 카운트 애니메이션 User1
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

  // 숫자 카운트 애니메이션 User2
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

  const usePreventRefresh = () => {
    const preventRefresh = (e) => {
      e.preventDefault();
      e.returnValue = "";
      navigate("/");
    };

    useEffect(() => {
      const handleBeforeUnload = () => {
        window.addEventListener("beforeunload", preventRefresh);
      };
      handleBeforeUnload();

      return () => {
        window.removeEventListener("beforeunload", preventRefresh);
      };
    }, []);
  };
  usePreventRefresh();

  // 새로고침 시 데이터 로드 에러 문제 해결
  useEffect(() => {
    if (user1["name"] === "" || user2["name"] === "") {
      navigate("/");
    }
  }, [user1, user2, navigate]);

  return (
    <>
      <div className="frame absoulte row">
        {/* User 1 */}
        <div className={styles.user}>
          <div className={styles.profile}>
            <div className={styles.avatar}>
              <img src={user1["avatar"]} alt="" onClick={() => moveDetail("user1")} />
            </div>
            <p>{user1["name"]}</p>
          </div>
          <p className={styles.score}>
            <span>{scoreUser1}</span>점
          </p>
        </div>
        {/* User 2 */}
        <div className={styles.user}>
          <div className={styles.profile}>
            <div className={styles.avatar}>
              <img src={user2["avatar"]} alt="" onClick={() => moveDetail("user2")} />
            </div>
            <p>{user2["name"]}</p>
          </div>
          <p className={styles.score}>
            <span>{scoreUser2}</span>점
          </p>
        </div>
      </div>
      <p className="more">
        <span>분석 정보</span>를 보려면 <span>사용자</span>를 <span>클릭</span>하세요!
      </p>
    </>
  );
};

export default Analysis;
