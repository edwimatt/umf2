import * as types from '../actions/ActionTypes';
import _ from 'lodash';
import Immutable from 'seamless-immutable';

const initialState = {
  isFetching: false,
  failure: false,
  errMessage: '',
  data: [],
  meta: {},
};
let temp_data = undefined;
let target_data = undefined;
export default (type) => {
  return (state = initialState, action) => {
    switch (action.type) {
      case type.REQUEST: {
        if (
          type.BASE &&
          action.referencedReducer &&
          type.BASE == action.referencedReducer
        ) {
          return Immutable.merge(state, {
            isFetching: true,
          });
        }
        return state;
      }

      case type.SUCCESS:
        if (action.isConcat) {
          return Immutable.merge(state, {
            failure: false,
            isFetching: false,
            errorMessage: '',
            data: _.concat(state.data, action.data),
            meta: action.meta,
          });
        }
        return Immutable.merge(state, {
          failure: false,
          isFetching: false,
          errorMessage: '',
          data: action.data,
          meta: action.meta,
        });

      case type.FAILURE:
        return Immutable.merge(state, {
          failure: true,
          isFetching: false,
          errorMessage: action.errorMessage,
        });
      case type.ADD:
        temp_data =
          action.level === 'bottom'
            ? _.concat(state.data, action.data)
            : _.concat(action.data, state.data);

        return Immutable.merge(state, {
          data: temp_data,
          isFetching: false,
        });
      case type.UPDATE:
        target_data = action.data;

        temp_array = _.cloneDeep(state.data);
        var index = state.data.findIndex((item) => item.id === target_data.id);
        // Replace the item by index.
        temp_array.splice(index, 1, target_data);
        return Immutable.merge(state, {data: temp_array});

      case type.DELETE:
        target_data = action.data;
        temp_data = _.cloneDeep(state.data);
        var index = state.data.findIndex((item) => item.id === target_data.id);
        // remove the item by index.
        temp_data.splice(index, 1);
        return Immutable.merge(state, {data: temp_data});

      default:
        return state;
    }
  };
};
