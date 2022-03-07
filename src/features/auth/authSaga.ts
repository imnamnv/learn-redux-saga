import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { call, delay, fork, put, take, takeEvery } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  console.log('handleLogin');
  try {
    yield delay(1000);
    localStorage.setItem('access_token', 'logged');

    yield put(authActions.loginSuccess({ id: 1, name: 'Nam' }));
    yield put(push('/admin/dashboard'));
  } catch (error) {
    if (error instanceof Error) {
      yield put(authActions.loginFailed(error.message));
      yield put(push('/login'));
    }
  }
}

function* handleLogout() {
  console.log('handleLogout');
  yield delay(1000);
  localStorage.removeItem('access_token');
  yield put(push('./login'));
}

function* handleLoginTakeEvery(action: PayloadAction<LoginPayload>) {
  console.log('handleLogin');
}
function* handleLogOutTakeEvery(action: PayloadAction<LoginPayload>) {
  console.log('handleLogin');
}

function* watchLoginFlow() {
  //1
  while (true) {
    const isLoggin = Boolean(localStorage.getItem('access_token'));
    if (!isLoggin) {
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      );
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }

  // //2
  // yield takeEvery(authActions.login.type, handleLoginTakeEvery);
  // yield takeEvery(authActions.logout.type, handleLogOutTakeEvery);
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
