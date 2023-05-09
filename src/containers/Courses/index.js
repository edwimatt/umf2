// predefined functions
import React, { useCallback, useRef, useState, useEffect } from "react";
// predefined components
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// constants
import constant from "../../constants";
// navigation service
import { navigate, pop } from "../../services/NavigationService";
// components
import {
  AppHeader,
  BaseContainer,
  CourseHeader,
  CardWrapper,
} from "../../components";
// theme
import {
  Colors,
  Metrics,
  Fonts,
  AppStyles,
  DefaultTheme,
  Images,
  Strings,
} from "../../theme";
// styles
import styles from "./styles";
// request
import { request, generalSaveAction } from "../../actions/ServiceAction";
// redux
import { connect } from "react-redux";
// reducer
import { ALLCOURSE } from "../../actions/ActionTypes";
import _ from "lodash";

const { colors } = DefaultTheme;

const Courses = (props) => {
  const { route, allCourse, user, request, generalSaveAction } = props;
  const { params } = route;
  const { category_id } = params;
  const { data, meta, isFetching } = allCourse;
  const { id, hospital_id } = user;

  useEffect(() => {
    _getAllcoursebyIDApiRequest();
    return () => {
      generalSaveAction(ALLCOURSE.SUCCESS, []);
    };
  }, []);

  function openCourseDetails(name, item) {
    navigate("HomeStack", {
      screen: name,
      params: item,
    });
  }

  function _getAllcoursebyIDApiRequest(isConcat = false, page = 1) {
    let params = {
      page,
      hospital_id: hospital_id,
      user_id: id,
      category_id: category_id,
    };

    request(
      constant.getCoursebyID,
      "get",
      params,
      ALLCOURSE,
      false,
      cbSuccess,
      cbFailure,
      ALLCOURSE.BASE,
      isConcat
    );
  }

  function cbSuccess(response, message) {}
  function cbFailure(error) {}

  return (
    <BaseContainer>
      <AppHeader
        isBack={true}
        backOnPress={() => pop()}
        centerTitle={Strings.TITLES.Courses}
        style={{ backgroundColor: Colors.white }}
      />
      {data[0] && (
        <CardWrapper
          header={true}
          iconPause={true}
          desc={true}
          item={_.cloneDeep(data[0])}
          meta={meta}
          isFetching={isFetching}
          fetchRequest={() => _getAllcoursebyIDApiRequest()}
          DetailsonPress={() =>
            openCourseDetails("CourseDetails", data.hospital_courses[0])
          }
          category={"allcourse"}
        />
      )}
    </BaseContainer>
  );
};
const actions = { request, generalSaveAction };
const mapStateToProps = (state) => {
  return {
    allCourse: state.allCourseReducer,
    user: state.user.data,
  };
};
export default connect(mapStateToProps, actions)(Courses);
