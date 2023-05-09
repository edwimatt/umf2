// predefined functions
import React, { useCallback, useRef, useState, useEffect } from "react";
// predefined components
import {
  View,
  ActivityIndicator,
  Dimensions,
  Alert,
  Image,
  BackHandler,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// utility
import utility from "../../utility";
// constants
import constant from "../../constants";
// navigation service
import {
  navigate,
  popToTop,
  push,
  pop,
} from "../../services/NavigationService";
import { useFocusEffect } from "@react-navigation/native";
// components
import { AppHeader, BaseContainer, LectureWrapper } from "../../components";
// reuseable components
import {
  ButtonView,
  ImageHandler,
  FlashMessage,
} from "../../reuseableComponents";
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
// library
import Util from "./Utils";
import Video from "react-native-fast-video";
import Orientation from "react-native-orientation";
// request
import { request } from "../../actions/ServiceAction";
// redux
import { connect } from "react-redux";
// reducer
import { COURSEDETAILS, CATEGORIES } from "../../actions/ActionTypes";
import { useTranslation } from "react-i18next";

const CourseDetails = (props) => {
  const { request, route, user, courseDetails, navigation } = props;
  const { params } = route;
  const { course_id } = params;
  const { id, hospital_id } = user;
  const { data, meta } = courseDetails;
  const { t, i18n } = useTranslation();
  // initailize states
  const [isFetch, setFetch] = useState(true);
  const [state, setState] = useState({
    orientationWidth: 0,
    orientationHeight: 0,
    isFullScreen: false,
    isLoaded: false,
    isPaused: false,
    isLandscape: true,
    isOrientation: "PORTRAIT",
  });
  let videoPlayer = useRef(null);

  useEffect(() => {
    _getCourseDetailsApiRequest();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (utility.isEqual("LANDSCAPE", state.isOrientation)) {
        fullScreen();
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [state.isOrientation]);

  function openQuizScreen(name) {
    navigate("HomeStack", {
      screen: name,
      params: {
        course_id: course_id,
        user_id: id,
        hospital_id: hospital_id,
      },
    });
  }

  function checkCourseID() {
    if (data.course_contents.length > 0) {
      setState((s) => ({ ...s, isPaused: true }));

      if (state.isLoaded) {
        openQuizScreen("Quiz");
      } else {
        Alert.alert(t("common:alert"), t("common:pleaseWait"));
      }
    } else {
      FlashMessage({ message: "Course id is Missing.", type: "danger" });
    }
  }

  function _getCourseDetailsApiRequest() {
    let params = {
      course_id: course_id,
      user_id: id,
    };

    request(
      constant.getCourseDetails,
      "get",
      params,
      COURSEDETAILS,
      false,
      cbSuccess,
      cbFailure
    );
  }

  function cbSuccess(response, message) {
    setFetch(false);
  }
  function cbFailure(error) {}

  function _couseCompleteApiRequest() {
    let formData = new FormData();

    formData.append("user_id", id);
    formData.append("course_id", course_id);
    formData.append("hospital_id", hospital_id);

    request(
      constant.courseCompleted,
      "POST",
      formData,
      CATEGORIES,
      true,
      cbCouseCompleteSuccess,
      cbFailure
    );
  }

  function cbCouseCompleteSuccess(response, message) {
    FlashMessage({ message: message, type: "success" });
    push("HomeStack", {
      screen: "Home",
    });
  }

  function resizeVideoPlayer() {
    let { width, height } = Dimensions.get("window");

    if (Util.isPortrait()) {
      setState((s) => ({
        ...s,
        orientationWidth: width * 0.8,
        orientationHeight: width * 0.8 * 0.56,
      }));
    } else {
      setState((s) => ({
        ...s,
        orientationHeight: height * 0.8,
        orientationWidth: height * 0.8 * 1.77,
        isFullScreen: true,
      }));
    }
  }

  function onLayout(e) {
    resizeVideoPlayer();
  }

  function onReadyVideo(e) {
    setState((s) => ({ ...s, isLoaded: true, isPaused: false }));
  }

  const fullScreen = () => {
    Orientation.getOrientation((err, orientation) => {
      if (orientation == "LANDSCAPE") {
        setState((s) => ({
          ...s,
          isOrientation: "PORTRAIT",
          isLandscape: false,
        }));

        Orientation.lockToPortrait();
      } else {
        setState((s) => ({
          ...s,
          isOrientation: "LANDSCAPE",
          isLandscape: true,
        }));

        Orientation.lockToLandscape();
      }
    });
    return false;
  };

  const backAction = () => {
    Orientation.getOrientation((err, orientation) => {
      setState((s) => ({
        ...s,
        isOrientation: "PORTRAIT",
      }));

      if (orientation == "LANDSCAPE") {
        Orientation.lockToPortrait();
      }
    });
  };

  return (
    <BaseContainer onLayout={onLayout}>
      {utility.isPlatformIOS() && (
        <AppHeader
          isBack={true}
          backOnPress={() => popToTop()}
          centerTitle={t("common:courseDetails")}
          style={{ backgroundColor: Colors.white }}
        />
      )}
      {isFetch ? (
        <ActivityIndicator
          color={Colors.lightGreen}
          size="large"
          style={styles.activityIndicator}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            color={Colors.baseColor}
            size="large"
            style={styles.videoIndicator}
          />
          <View style={styles.videoContainer}>
            {utility.isPlatformIOS() ? (
              <Video
                ignoreSilentSwitch={"ignore"}
                ref={(p) => {
                  videoPlayer = p;
                }}
                source={{ uri: data.video_file }}
                disableBack
                disableVolume
                paused={state.isPaused ? true : false}
                onEnd={() => {
                  data.course_type == "quiz"
                    ? undefined
                    : _couseCompleteApiRequest();
                }}
                onReadyForDisplay={onReadyVideo}
                style={[
                  state.isFullScreen
                    ? {
                        width: state.orientationWidth,
                        height: state.orientationHeight,
                      }
                    : styles.videoContainer,
                ]}
                controls={true}
                resizeMode="cover"
              />
            ) : (
              <Video
                ref={(p) => {
                  videoPlayer = p;
                }}
                source={{ uri: data.video_file }}
                disableBack
                disableVolume
                paused={state.isPaused ? true : false}
                onEnd={() => {
                  data.course_type == "quiz"
                    ? undefined
                    : _couseCompleteApiRequest();
                }}
                onReadyForDisplay={onReadyVideo}
                style={[
                  state.isOrientation == "PORTRAIT"
                    ? styles.videoContainer
                    : styles.videoLandScape,
                ]}
                controls={true}
                resizeMode="cover"
              />
            )}

            {utility.isPlatformAndroid() && (
              <View
                style={[
                  state.isOrientation == "PORTRAIT"
                    ? { width: Metrics.screenWidth }
                    : { width: Metrics.screenHeight },
                  styles.btnsContainer,
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.backBtn}
                  onPress={() =>
                    utility.isEqual(state.isOrientation, "PORTRAIT")
                      ? popToTop()
                      : backAction()
                  }
                >
                  <Image resizeMode="contain" source={Images.icCircleback} />
                </TouchableOpacity>

                {state.isLoaded && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.fullBtn}
                    onPress={() => fullScreen()}
                  >
                    <Image
                      style={styles.icon}
                      resizeMode="contain"
                      source={Images.icFullScreen}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
          {state.isOrientation == "PORTRAIT" && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <LectureWrapper
                StartQuizonPress={() => checkCourseID()}
                item={data}
                header={true}
              />
            </ScrollView>
          )}
        </View>
      )}
    </BaseContainer>
  );
};
const actions = { request };
const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    courseDetails: state.courseDetailsReducer,
  };
};
export default connect(mapStateToProps, actions)(CourseDetails);
