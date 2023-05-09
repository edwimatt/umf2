//
//  ServiceAction.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:07:24 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {
  GENERAL_ACTION,
  GENERAL_ACTION_MULTIPLE_REQUEST,
  LOGOUT,
  NO_INTERNET,
} from "./ActionTypes";
import {
  isNetworkReachable,
  isConnected,
} from "react-native-reachability-popup";

callback = () => {};

Request = {
  url: String, //Service url
  method: String, //Web Service type 'post,get,put,delete....'
  data: Object, //Paramter for request
  actionType: Object,
};
export function request(
  service, //Service url
  method, //Web Service type 'post,get,put,delete....'
  payload, //Paramter for request
  request_type = null, //Action Type
  showHud = true, //Show spinner
  successCB = callback,
  failureCB = callback,
  referencedReducer,
  isConcat = false
) {
  if (!isNetworkReachable() && !isConnected()) {
    return {
      type: NO_INTERNET,
    };
  }
  return {
    type: GENERAL_ACTION,
    service,
    method,
    payload,
    request_type,
    showHud,
    successCB,
    failureCB,
    referencedReducer,
    isConcat,
  };
}
export function multipleRequest(
  requestArray: [Request],
  showHud = true,
  successCB = callback,
  failureCB = callback
) {
  if (!isNetworkReachable() && !isConnected()) {
    return {
      type: NO_INTERNET,
    };
  }
  return {
    type: GENERAL_ACTION_MULTIPLE_REQUEST,
    requestArray,
    showHud,
    successCB,
    failureCB,
  };
}
export function requestAction(types) {
  return {
    type: types.REQUEST,
  };
}
export function generalSaveAction(type: string, data, level = "top") {
  return {
    type,
    data,
    level,
  };
}
export function success(types, data, meta, isConcat, reducerType = false) {
  return {
    data,
    type: types.SUCCESS,
    meta,
    isConcat,
    reducerType,
  };
}

export function failure(types, errorMessage) {
  return {
    errorMessage,
    type: types.FAILURE,
  };
}
export function logout() {
  return {
    type: LOGOUT,
  };
}
