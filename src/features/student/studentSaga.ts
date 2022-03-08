import studentApi from 'api/studentApi';
import { ListParams, ListResponse, Student } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { studentActions } from './studentSlice';

function* fetchStudentList(action: ListParams) {
  console.log('action', action);
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, {
      _page: action.payload._page,
      _limit: action.payload._limit,
    });
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    yield put(studentActions.fetchStudentListFailed());
  }
}

export function* studentSaga() {
  console.log('STUDENT SAGA');
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList);
}
