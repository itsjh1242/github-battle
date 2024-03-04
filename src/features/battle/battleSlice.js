import { createSlice } from "@reduxjs/toolkit";

// 초기값 설정
const initialState = {
  user1: {},
  user2: {},
  scoreUser1: {
    name: "",
    avatar: "",
    created_at: "",
    followers: 0,
    followersAmount: 0,
    following: 0,
    followingAmount: 0,
    repo: 0,
    repoAmount: 0,
    info: 0,
    recentPush: 0,
    recentPushDate: "",
    totalPush: 0,
    totalPushAmount: 0,
    totalScore: 0,
  },
  scoreUser2: {
    name: "",
    avatar: "",
    created_at: "",
    followers: 0,
    followersAmount: 0,
    following: 0,
    followingAmount: 0,
    repo: 0,
    repoAmount: 0,
    info: 0,
    recentPush: 0,
    recentPushDate: "",
    totalPush: 0,
    totalPushAmount: 0,
    totalScore: 0,
  },
  user: {},
  opponent: {},
};

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    init: (state) => {
      state.user1 = {};
      state.user2 = {};
      state.scoreUser1 = {
        name: "",
        avatar: "",
        created_at: "",
        followers: 0,
        followersAmount: 0,
        following: 0,
        followingAmount: 0,
        repo: 0,
        repoAmount: 0,
        info: 0,
        recentPush: 0,
        recentPushDate: "",
        totalPush: 0,
        totalPushAmount: 0,
        totalScore: 0,
      };
      state.scoreUser2 = {
        name: "",
        avatar: "",
        created_at: "",
        followers: 0,
        followersAmount: 0,
        following: 0,
        followingAmount: 0,
        repo: 0,
        repoAmount: 0,
        info: 0,
        recentPush: 0,
        recentPushDate: "",
        totalPush: 0,
        totalPushAmount: 0,
        totalScore: 0,
      };
      state.user = {};
      state.opponent = {};
    },
    updateUser1: (state, action) => {
      state.user1 = action.payload;
      state.scoreUser1.name = action.payload["login"];
    },
    updateUser2: (state, action) => {
      state.user2 = action.payload;
      state.scoreUser2.name = action.payload["login"];
    },
    updateAvatar: (state, action) => {
      if (action.payload.user === "user1") {
        state.scoreUser1.avatar = action.payload.avatar;
      } else {
        state.scoreUser2.avatar = action.payload.avatar;
      }
    },
    updateCreatedAt: (state, action) => {
      if (action.payload.user === "user1") {
        state.scoreUser1.created_at = action.payload.date;
      } else {
        state.scoreUser2.created_at = action.payload.date;
      }
    },
    updateFollowers: (state, action) => {
      if (action.payload.user === "user1") {
        state.scoreUser1.followers = action.payload.score;
        state.scoreUser1.followersAmount = action.payload.followers;
        state.scoreUser1.totalScore += action.payload.score;
      } else {
        state.scoreUser2.followers = action.payload.score;
        state.scoreUser2.followersAmount = action.payload.followers;
        state.scoreUser2.totalScore += action.payload.score;
      }
    },
    updateFollowing: (state, action) => {
      if (action.payload.user === "user1") {
        state.scoreUser1.following = action.payload.score;
        state.scoreUser1.followingAmount = action.payload.following;
        state.scoreUser1.totalScore += action.payload.score;
      } else {
        state.scoreUser2.following = action.payload.score;
        state.scoreUser2.followingAmount = action.payload.following;
        state.scoreUser2.totalScore += action.payload.score;
      }
    },
    updateRepo: (state, action) => {
      if (action.payload.user === "user1") {
        state.scoreUser1.repo = action.payload.score;
        state.scoreUser1.repoAmount = action.payload.repo;
        state.scoreUser1.totalScore += action.payload.score;
      } else {
        state.scoreUser2.repo = action.payload.score;
        state.scoreUser2.repoAmount = action.payload.repo;
        state.scoreUser2.totalScore += action.payload.score;
      }
    },
    updateInfo: (state, action) => {
      if (action.payload.user === "user1") {
        state.scoreUser1.info = action.payload.score;

        state.scoreUser1.totalScore += action.payload.score;
      } else {
        state.scoreUser2.info = action.payload.score;

        state.scoreUser2.totalScore += action.payload.score;
      }
    },
    updateRecentPush: (state, action) => {
      if (action.payload.user === "user1") {
        state.scoreUser1.recentPush = action.payload.score;
        state.scoreUser1.recentPushDate = action.payload.date;
        state.scoreUser1.totalScore += action.payload.score;
      } else {
        state.scoreUser2.recentPush = action.payload.score;
        state.scoreUser2.recentPushDate = action.payload.date;
        state.scoreUser2.totalScore += action.payload.score;
      }
    },
    updateTotalPush: (state, action) => {
      if (action.payload.user === "user1") {
        state.scoreUser1.totalPush = action.payload.score;
        state.scoreUser1.totalPushAmount = action.payload.push;
        state.scoreUser1.totalScore += action.payload.score;
      } else {
        state.scoreUser2.totalPush = action.payload.score;
        state.scoreUser2.totalPushAmount = action.payload.push;
        state.scoreUser2.totalScore += action.payload.score;
      }
    },
    defineUser: (state, action) => {
      state.user = action.payload.user;
      state.opponent = action.payload.opponent;
    },
  },
});

export const {
  init,
  updateAvatar,
  updateUser1,
  updateUser2,
  updateCreatedAt,
  updateFollowers,
  updateFollowing,
  updateRepo,
  updateInfo,
  updateRecentPush,
  updateTotalPush,
  defineUser,
} = battleSlice.actions;

export const selectUser1 = (state) => state.battle.user1;
export const selectUser2 = (state) => state.battle.user2;

export const selectScoreUser1 = (state) => state.battle.scoreUser1;
export const selectScoreUser2 = (state) => state.battle.scoreUser2;

export const selectUser = (state) => state.battle.user;
export const selectOpponent = (state) => state.battle.opponent;

export default battleSlice.reducer;
