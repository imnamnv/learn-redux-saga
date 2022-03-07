import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';
import { City, ListResponse, Student } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { dashboardAction, RankingByCity } from './dashboardSlice';

function* fetchStatistics() {
  const responseList: ListResponse<Student>[] = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);

  const statistics = responseList.map((x) => x.pagination._totalRows); // [{data: studentList, pagination :{}}, ...]

  const [maleCount, femaleCount, hightMarkCount, lowMarkCount] = statistics;

  yield put(
    dashboardAction.setStatistics({ maleCount, femaleCount, hightMarkCount, lowMarkCount })
  );
}

function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });

  yield put(dashboardAction.setHighestStudentList(data));
}

function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });

  yield put(dashboardAction.setLowestStudentList(data));
}

function* fetchRankingbyCityList() {
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
      city: x.code,
    })
  );
  const responseList: ListResponse<Student>[] = yield all(callList);

  const rankingByCityList: RankingByCity[] = responseList.map((x, idx) => ({
    cityId: cityList[idx].code,
    name: cityList[idx].name,
    rankingList: x.data,
  }));

  yield put(dashboardAction.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingbyCityList),
    ]);

    yield put(dashboardAction.fetchDataSuccess());
  } catch (error) {
    console.log(error);
  }
}

export default function* dashboardSaga() {
  console.log('DASHBOARD SAGA');
  yield takeLatest(dashboardAction.fetchData.type, fetchDashboardData);
}
