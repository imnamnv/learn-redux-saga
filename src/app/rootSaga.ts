import { all } from 'redux-saga/effects';
import counterSaga from 'features/counter/counterSaga';
import { authSaga } from 'features/auth/authSaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import { studentSaga } from 'features/student/studentSaga';
import citySaga from 'features/city/citySaga';

function* helloSaga() {
  console.log('HELLO SAGA');
}

export default function* rootSaga() {
  console.log('ROOT SAGA');
  yield all([helloSaga(), counterSaga(), authSaga(), dashboardSaga(), studentSaga(), citySaga()]);
}
