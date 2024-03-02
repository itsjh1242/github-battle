import { createSlice } from "@reduxjs/toolkit";

// 초기값 설정
const initialState = {
  user1: {},
  user2: {},
  scoreUser1: {
    startedAt: "",
    followers: 0,
    following: 0,
    repo: 0,
    info: 0,
    recentPush: 0,
    totalPush: 0,
  },
  scoreUser2: {
    startedAt: "",
    followers: 0,
    following: 0,
    repo: 0,
    info: 0,
    recentPush: 0,
    totalPush: 0,
  },
};

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    updateUser1: (state, action) => {
      state.user1 = action.payload;
    },
    updateUser2: (state, action) => {
      state.user2 = action.payload;
    },
    updateFollowers: (state, action) => {
      if (action.payload.user === "user1") {
        state.scoreUser1.followers = action.payload.score;
      } else {
        state.scoreUser2.followers = action.payload.score;
      }
    },
    updateFollowing: (state, action) => {
      if (action.payload.user === "user1") {
        state.scoreUser1.following = action.payload.score;
      } else {
        state.scoreUser2.following = action.payload.score;
      }
    },
    updateRepo: (state, action) => {
      if (action.payload.user === "user1") {
        state.scoreUser1.repo = action.payload.score;
      } else {
        state.scoreUser2.repo = action.payload.score;
      }
    },
    updateInfo: (state, action) => {
      if (action.payload.user === "user1") {
        state.scoreUser1.info = action.payload.score;
      } else {
        state.scoreUser2.info = action.payload.score;
      }
    },
    updateRecentPush: (state, action) => {
      if (action.payload.user === "user1") {
        state.scoreUser1.recentPush = action.payload.score;
      } else {
        state.scoreUser2.recentPush = action.payload.score;
      }
    },
    updateTotalPush: (state, action) => {
      if (action.payload.user === "user1") {
        state.scoreUser1.totalPush = action.payload.score;
      } else {
        state.scoreUser2.totalPush = action.payload.score;
      }
    },
  },
});

export const { updateUser1, updateUser2, updateFollowers, updateFollowing, updateRepo, updateInfo, updateRecentPush, updateTotalPush } = battleSlice.actions;

export const selectUser1 = (state) => state.battle.user1;
export const selectUser2 = (state) => state.battle.user2;

export const selectScoreUser1 = (state) => state.battle.scoreUser1;
export const selectScoreUser2 = (state) => state.battle.scoreUser2;

export default battleSlice.reducer;
