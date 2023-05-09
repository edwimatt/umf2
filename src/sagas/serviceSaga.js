//
//  serviceSaga.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:29:45 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {put, call, takeEvery} from 'redux-saga/effects';
import {success, failure} from '../actions/ServiceAction';
import HttpServiceManager from '../services/HttpServiceManager';
import {GENERAL_ACTION} from '../actions/ActionTypes';

function callRequest(service, payload, method, showHud) {
  return HttpServiceManager.getInstance().request(
    service,
    payload,
    method,
    showHud,
  );
}

function* watchRequest(action) {
  const {
    payload,
    service,
    method,
    request_type, // action object from action file having REQUEST, SUCCESS, FAILURE
    successCB,
    failureCB,
    showHud,
    isConcat,
  } = action;

  console.log('saga action : ', action);

  try {
    // adding meta to the flow to handle unwanted pagination requests
    const {response, message = '', meta = {}} = yield call(
      callRequest,
      service,
      payload,
      method,
      showHud,
    );

    successCB && successCB(response, message, meta, isConcat);

    if (request_type)
      yield put(success(request_type, response, meta, isConcat));
  } catch (err) {
    failureCB && failureCB(err);
    if (request_type) yield put(failure(request_type, err));
  }
}

export default function* root() {
  yield takeEvery(GENERAL_ACTION, watchRequest);
}
