import React from "react";

// Emoji
import * as Emoji from "./Emoji";

// Style
import styles from "../styles/Loading.module.scss";

const Loading = (props) => {
  return (
    <>
      <div className={styles.loading_bg}></div>
      <div className={styles.loading}>
        <Emoji.EmojiLoading />
        <div className={styles.message}>
          <p>
            {props.user[0]}님과 {props.user[1]}님이 얼마나 열심히 하셨는지 분석중이에요!
            <br />
            금방 마무리할게요!
          </p>
        </div>
      </div>
    </>
  );
};

export default Loading;
