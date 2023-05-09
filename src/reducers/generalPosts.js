// @flow
import Immutable from "seamless-immutable";
import {
  GENERAL_POST,
  UPDATE_POST,
  ADD_GENERAL_POST,
} from "../actions/ActionTypes";
import _ from "lodash";

const initialState = Immutable({
  data: {},
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case GENERAL_POST.SUCCESS: {
      return Immutable.merge(state, {
        data: { ...state.data, ...action.data },
      });
    }

    case UPDATE_POST: {
      return Immutable.merge(state, {
        data: { ...state.data, [action.data.id]: action.data },
      });
    }

    case ADD_GENERAL_POST: {
      return Immutable.merge(state, {
        data: { ...state.data, [action.data.id]: action.data },
      });
    }

    default:
      return state;
  }
};
