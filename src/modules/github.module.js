import {
  updateAvatar,
  updateCreatedAt,
  updateFollowers,
  updateFollowing,
  updateRepo,
  updateInfo,
  updateRecentPush,
  updateTotalPush,
} from "../features/battle/battleSlice";

const headers = {
  Accept: "application/vnd.github+json",
  Authorization: process.env.REACT_APP_GITHUB_TOKEN,
};

const url = {
  getUser: "https://api.github.com/users/",
};

const fetchModule = async (name) => {
  try {
    const response = await fetch(url.getUser + name, {
      method: "GET",
      headers: headers,
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error in github.module.isUser: ", err);
  }
};

export const IsUser = async (u1, u2) => {
  try {
    const user1 = await fetchModule(u1);
    if (user1.login === undefined) {
      return "ERR_user1_not_found";
    }
    const user2 = await fetchModule(u2);
    if (user2.login === undefined) {
      return "ERR_user2_not_found";
    }
    return [user1, user2];
  } catch (err) {
    console.error("Error in github.module.isUser: ", err);
  }
};

export const StartAnalysis = async (dispatch, repoUser1, repoUser2, user1, user2) => {
  try {
    // 프로필(avatar) 사진 등록
    SetAvatar(dispatch, repoUser1.avatar_url, repoUser2.avatar_url);
    // 시작일자 등록
    EnrollCreatedAt(dispatch, repoUser1.created_at, repoUser2.created_at);
    // 점수 계산 시작
    // Followers & Following
    AnalysisFollow(dispatch, "user1", repoUser1.followers, repoUser1.following);
    AnalysisFollow(dispatch, "user2", repoUser2.followers, repoUser2.following);
    // Repo
    AnalysisRepo(dispatch, "user1", repoUser1.public_repos);
    AnalysisRepo(dispatch, "user2", repoUser2.public_repos);
    // Info
    AnalysisInfo(dispatch, "user1", [
      repoUser1.name,
      repoUser1.company,
      repoUser1.blog,
      repoUser1.location,
      repoUser1.email,
      repoUser1.hireable,
      repoUser1.bio,
      repoUser1.twitter_username,
    ]);
    AnalysisInfo(dispatch, "user2", [
      repoUser2.name,
      repoUser2.company,
      repoUser2.blog,
      repoUser2.location,
      repoUser2.email,
      repoUser2.hireable,
      repoUser2.bio,
      repoUser2.twitter_username,
    ]);
    await AnalysisRecentPush(dispatch, user1, user2);
    await AnalysisAllPushes(dispatch, user1, user2);
  } catch (err) {
    console.error("Error in StartAnalysis: ", err);
  }
};

export const SetAvatar = (dispatch, avatarUser1, avatarUser2) => {
  try {
    dispatch(updateAvatar({ user: "user1", avatar: avatarUser1 }));
    dispatch(updateAvatar({ user: "user2", avatar: avatarUser2 }));
  } catch (err) {
    console.error("Error in SetAvatar: ", err);
  }
};

export const EnrollCreatedAt = (dispatch, cdUser1, cdUser2) => {
  try {
    dispatch(updateCreatedAt({ user: "user1", date: cdUser1 }));
    dispatch(updateCreatedAt({ user: "user2", date: cdUser2 }));
  } catch (err) {
    console.error("Error in EnrollCreatedAt: ", err);
  }
};

export const AnalysisFollow = (dispatch, type, followers, following) => {
  try {
    // Section 1: 팔로우/팔로잉, 최대 점수 각 6점씩, 1명당 0.5점
    const calc_followers = Math.min(6, followers * 0.5);
    const calc_following = Math.min(6, following * 0.5);
    dispatch(updateFollowers({ user: type, score: calc_followers }));
    dispatch(updateFollowing({ user: type, score: calc_following }));
  } catch (err) {
    console.error("Error in AnalysisFollow: ", err);
  }
};

export const AnalysisRepo = (dispatch, type, repo) => {
  try {
    // Section 2: 레포지토리 개수, 최대 20점, 1개당 0.5점
    const calc_repo = Math.min(20, repo * 0.5);
    dispatch(updateRepo({ user: type, score: calc_repo }));
  } catch (err) {
    console.error("Error in AnalysisRepo: ", err);
  }
};

export const AnalysisInfo = (dispatch, type, info) => {
  try {
    // Section 3: Info 개수, 최대 8점, 각 1점
    let score = 0;
    info.forEach((element) => {
      if (element !== null) {
        score += 1;
      }
    });
    dispatch(updateInfo({ user: type, score: score }));
  } catch (err) {
    console.error("Error in AnalysisInfo: ", err);
  }
};

const getRecentPush = async (name) => {
  try {
    const response = await fetch(`https://api.github.com/users/${name}/events`, {
      method: "GET",
      headers: headers,
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error in github.module.isUser: ", err);
  }
};

export const AnalysisRecentPush = async (dispatch, user1, user2) => {
  // Section 4: 최근 push 일자, 이긴 사람 10점, 진 사람 0점
  try {
    const responseUser1 = await getRecentPush(user1);
    const responseUser2 = await getRecentPush(user2);
    const recentPushUser1 = responseUser1[0].created_at;
    const recentPushUser2 = responseUser2[0].created_at;
    if (recentPushUser1 > recentPushUser2) {
      dispatch(updateRecentPush({ user: "user1", score: 10 }));
    } else if (recentPushUser1 < recentPushUser2) {
      dispatch(updateRecentPush({ user: "user2", score: 10 }));
    } else {
      dispatch(updateRecentPush({ user: "user1", score: 10 }));
      dispatch(updateRecentPush({ user: "user2", score: 10 }));
    }
  } catch (err) {
    console.error("Error in AnalysisRecentPush: ", err);
  }
};

const getAllPushes = async (name) => {
  try {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${name}?y=all`, {
      method: "GET",
      headers: headers,
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error in getAllPushes: ", err);
  }
};

export const AnalysisAllPushes = async (dispatch, user1, user2) => {
  // Section 5: 총 Push 개수, 이긴사람 50점, 진사람 30점
  try {
    const responseUser1 = await getAllPushes(user1);
    const responseUser2 = await getAllPushes(user2);

    let totalPushesUser1 = 0;
    let totalPushesUser2 = 0;
    let scoreUser1 = 0;
    let scoreUser2 = 0;

    Object.keys(responseUser1.total).map((key) => (totalPushesUser1 += responseUser1.total[key]));
    Object.keys(responseUser2.total).map((key) => (totalPushesUser2 += responseUser2.total[key]));

    scoreUser1 = totalPushesUser1 >= totalPushesUser2 ? 50 : 30;
    scoreUser2 = totalPushesUser1 <= totalPushesUser2 ? 50 : 30;

    dispatch(updateTotalPush({ user: "user1", score: scoreUser1 }));
    dispatch(updateTotalPush({ user: "user2", score: scoreUser2 }));
  } catch (err) {
    console.error("Error in AnalysisAllPushes: ", err);
  }
};
