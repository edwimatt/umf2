import _ from "lodash";
import React from "react";
import singleton from "../singleton";
import { store } from "../store";
import { useDispatch } from "react-redux";
// redux imports
import {
  ADD_GENERAL_POST,
  EVENT_FEEDS,
  HOME_FEEDS,
  UPDATE_COMMENT,
  UPDATE_POST,
} from "../actions/ActionTypes";
import { request, generalSaveAction } from "../actions/ServiceAction";
import HttpServiceManager from "../services/HttpServiceManager";
import utility from "../utility";
import constant from "../constants";

const callback = (response) => global.log({ response });

const callDispatch = (request) => {
  const dispatch = singleton.storeRef.dispatch;
  dispatch(request);
};

const getUser = () => {
  return singleton.storeRef.getState().loginReducer.data;
};

const dispatchRequest = (
  url, //Service url
  method, //Web Service type 'post,get,put,delete....'
  data, //Paramter for request
  actionType = null, //Action Type
  showHud = true, //Show spinner
  successCB = callback,
  failureCB = callback
) => {
  store.dispatch(
    request(url, method, data, actionType, showHud, successCB, failureCB)
  );
};

const onEmojiReaction = (id, status = 1) => {
  Utils.getStoreRef().dispatch(
    request(
      undefined,
      constant.likePost,
      "post",
      {
        target_id: id,
        status,
        post_type_id: 1,
        is_anonymous: Utils.getStoreRef().getState().anonymity.isAnonymityActive
          ? 1
          : 0,
      },
      false,
      (post) =>
        Utils.getStoreRef().dispatch(generalSaveAction(UPDATE_POST, post))
    )
  );
};

const onLikeandDislike = (reactionId, postItem) => {
  const dispatch = singleton.storeRef.dispatch;
  let formData = new FormData();
  formData.append("module", "posts");
  formData.append("module_id", postItem.id);
  formData.append("like_reaction_id", reactionId);

  dispatch(
    request(
      constant.likePost,
      "POST",
      formData,
      undefined,
      false,
      (response) => {
        let temp_data = _.cloneDeep(postItem);

        if (+postItem.is_user_like) {
          temp_data.is_user_like = 0;
          temp_data.total_like--;
          temp_data.like_reaction_id = null;
          temp_data.user_likes = response;
        } else {
          temp_data.is_user_like = 1;
          temp_data.total_like++;
          temp_data.like_reaction_id = reactionId;
          temp_data.user_likes = response;
        }

        dispatch(generalSaveAction(UPDATE_POST, temp_data));
      }
    )
  );
};
const cbSuccess = (reactionId) => (response) => {};

export {
  getUser,
  callDispatch,
  dispatchRequest,
  onEmojiReaction,
  onLikeandDislike,
};
