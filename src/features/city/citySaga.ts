import cityApi from 'api/cityApi';
import { City, ListResponse } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { cityAction } from './citySlice';

function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);
    yield put(cityAction.fetchCityListSuccess(response));
  } catch (error) {
    console.log('error', error);
    yield put(cityAction.fetchCityListFailed());
  }
}

export default function* citySaga() {
  console.log('CITY SAGA');
  yield takeLatest(cityAction.fetchCityList.type, fetchCityList);
}
