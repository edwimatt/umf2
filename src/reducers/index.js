//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:21:40 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {combineReducers} from 'redux';
import serviceReducer from './serviceReducer';
import {
  USER,
  LOGOUT,
  EVENT_FEEDS,
  EVENT_POST_COMMENTS,
  HOME_FEEDS,
  APP_DATA,
  LEADER_BOARD,
  LANGUAGE,
  CATEGORIES,
  COURSEDETAILS,
  ALLCOURSE,
  QUIZ,
  QUIZ_POST_DATA,
  NEWSLIST,
  NEWSDETAILS,
  MY_TRAININGS,
  CERTIFICATES,
  CERTIFICATE_DETAILS,
  MESSAGE_COUNTER,
} from '../actions/ActionTypes';
import generalPosts from './generalPosts';

const appReducer = combineReducers({
  user: serviceReducer(USER),
  eventFeedsReducer: serviceReducer(EVENT_FEEDS),
  eventPostCommentsReducer: serviceReducer(EVENT_POST_COMMENTS),
  homeFeedsReducer: serviceReducer(HOME_FEEDS),
  appDataReducer: serviceReducer(APP_DATA),
  leaderBoardReducer: serviceReducer(LEADER_BOARD),
  languageReducer:serviceReducer(LANGUAGE),
  categoriesReducer:serviceReducer(CATEGORIES),
  courseDetailsReducer:serviceReducer(COURSEDETAILS),
  allCourseReducer:serviceReducer(ALLCOURSE),
  newsListReducer:serviceReducer(NEWSLIST),
  newsDetailsReducer:serviceReducer(NEWSDETAILS),
  quizReducer:serviceReducer(QUIZ),
  quizPostDataReducer:serviceReducer(QUIZ_POST_DATA),
  myTrainingsReducer:serviceReducer(MY_TRAININGS),
  certificatesReducer:serviceReducer(CERTIFICATES),
  certificateDetailsReducer:serviceReducer(CERTIFICATE_DETAILS),
  messageCounterReducer:serviceReducer(MESSAGE_COUNTER),
  generalPosts,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    let newState = {};
    for (let key of Object.keys(state)) {
      newState[key] = {
        ...state[key],
        data: [],
        meta: {current_page: 0, last_page: 0},
      };
    }
    state = {
      ...newState,
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
