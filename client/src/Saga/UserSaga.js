import { put, call, select, take, takeEvery } from "redux-saga/effects";
import * as UserService from "../ApiService/UserService";
import UserActions from "../ReduxStore/User/Actions";

export function* getUserInfo() {
  const response = yield call(UserService.getUserInfo);
  if (response.data.OK) {
    const data = response.data;
    yield put(UserActions.setUserInfo(data.email, data.nickname));
  }
}

export function* getFriend() {
  const response = yield call(UserService.getFriend);
  if (response.data.OK) {
    const data = response.data;
    yield put(UserActions.setFriend(data.friendList));
  }
}

export function* getFriendRequest() {
  const response = yield call(UserService.getFriendRequest);
  if (response.data.OK) {
    const data = response.data;
    yield put(UserActions.setFriendRequest(data.requestList));
  }
}
