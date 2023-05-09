import {take, takeEvery, put, select} from 'redux-saga/effects';
import {normalize, schema} from 'normalizr';
// import {selectUser} from '../sagaSelectors';
import {NORMALIZE_POST, GENERAL_POST} from '../actions/ActionTypes';
import {success} from '../actions/ServiceAction';

function* watchRequest(action) {
  const {data, meta, isConcat, reducerType} = action;

  const eventSchema = new schema.Entity('posts');
  const userListSchema = [eventSchema];
  const normalizedData = normalize(data, userListSchema);

  yield put(success(GENERAL_POST, normalizedData.entities.posts, {}, isConcat));
  yield put(success(reducerType, normalizedData.result, meta, isConcat));
}

export default function* root() {
  yield takeEvery(NORMALIZE_POST.SUCCESS, watchRequest);
}
