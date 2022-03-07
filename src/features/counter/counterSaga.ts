import { PayloadAction } from '@reduxjs/toolkit';
import {
  ActionPattern,
  delay,
  put,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { increment, incrementSaga, incrementSagaSuccess } from './counterSlice';

function* triggerMiddleWare(action: PayloadAction<number>) {
  console.log('INCREMENT SAGA SUCCESS');
  yield delay(1000);
  yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
  console.log('HELLO COUNTER');
  yield takeEvery(incrementSaga.type, triggerMiddleWare);
  // yield takeLatest(incrementSaga.type, triggerMiddleWare);
}
