//
//  ActionTypes.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:06:43 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const CANCEL = 'CANCEL';
const ADD = 'ADD';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';
const REPLACE = 'REPLACE';
function createRequestTypes(base) {
  const res = {};
  res['BASE'] = base;
  [
    REQUEST,
    SUCCESS,
    FAILURE,
    CANCEL,
    CREATE,
    UPDATE,
    DELETE,
    ADD,
    REPLACE,
  ].forEach((type) => {
    if (type === REQUEST) {
      res[type] = `${GENERAL_ACTION}`;
    } else res[type] = `${base}_${type}`;
  });
  return res;
}

//DEFAULT ACTIONS
export const GENERAL_ACTION = 'GENERAL_ACTION';
export const GENERAL_ACTION_MULTIPLE_REQUEST =
  'GENERAL_ACTION_MULTIPLE_REQUEST';
export const NO_INTERNET = 'NO_INTERNET';
//SOCKET DEFAULT ACTIONS
export const SOCKET_INFO = createRequestTypes('SOCKET_INFO');
export const SOCKET_DUMP = createRequestTypes('SOCKET_DUMP');
export const SOCKET_WRITE = 'SOCKET_WRITE';
//NETWORK DEFAULT ACTION
export const NETWORK_INFO = 'NETWORK_INFO';
//LOCATION ACTIONS
export const USER_LOCATION = createRequestTypes('USER_LOCATION');

//USER ACTIONS
export const USER = createRequestTypes('USER');

//LANGUAGE ACTIONS
export const LANGUAGE = createRequestTypes('LANGUAGE');

//CATEGORIES ACTIONS
export const CATEGORIES = createRequestTypes('CATEGORIES');

//COURSEDETAILS ACTIONS
export const COURSEDETAILS = createRequestTypes('COURSEDETAILS');

//ALLCOURSE ACTIONS
export const ALLCOURSE = createRequestTypes('ALLCOURSE');

//NEWSLIST ACTIONS
export const NEWSLIST = createRequestTypes('NEWSLIST');

//NEWSDETAILS ACTIONS
export const NEWSDETAILS = createRequestTypes('NEWSDETAILS');

//QUIZ ACTIONS
export const QUIZ = createRequestTypes('QUIZ');
export const QUIZ_POST_DATA = createRequestTypes('QUIZ_POST_DATA');

//MY TRAININGS ACTIONS
export const MY_TRAININGS = createRequestTypes('MY_TRAININGS');

//CERTIFICATES ACTIONS
export const CERTIFICATES = createRequestTypes('CERTIFICATES');
export const CERTIFICATE_DETAILS=createRequestTypes('CERTIFICATE_DETAILS');


// EVENT ACTIONS
export const EVENT_FEEDS = createRequestTypes('EVENT_FEEDS');
export const EVENT_POST_COMMENTS = createRequestTypes('EVENT_POST_COMMENTS');
export const NORMALIZE_POST = createRequestTypes('NORMALIZE_POST');
export const GENERAL_POST = createRequestTypes('GENERAL_POST');
export const UPDATE_POST = 'UPDATE_POST';
export const ADD_GENERAL_POST = 'ADD_GENERAL_POST';

// HOME ACTIONS
export const HOME_FEEDS = createRequestTypes('HOME_FEEDS');

// LEADER-BOARD ACTIONS
export const LEADER_BOARD = createRequestTypes('LEADER_BOARD');

// APP DATA
export const APP_DATA = createRequestTypes('APP_DATA');

// MESSAGE COUNTER
export const MESSAGE_COUNTER = createRequestTypes('MESSAGE_COUNTER');
