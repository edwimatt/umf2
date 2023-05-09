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
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// constants
import constant from "../../constants";
// navigation service
import { navigate, pop } from "../../services/NavigationService";
// components
import { AppHeader, BaseContainer, CourseHeader } from "../../components";
// reuseable components
import { ButtonView, ImageHandler } from "../../reuseableComponents";
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
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
// request
import { request } from "../../actions/ServiceAction";
// redux
import { connect } from "react-redux";
// reducer
import { NEWSDETAILS } from "../../actions/ActionTypes";

const { colors } = DefaultTheme;

const NewsDetails = (props) => {
  const { route, request, newsDetails } = props;
  const { params } = route;
  const { id, hospital_id } = params;
  const { news_title, news_description, news_image, created_at } = newsDetails;

  // initailize states
  const [isFetch, setFetch] = useState(true);

  useEffect(() => {
    _getNewsDetailsApiRequest();
  }, []);

  function _getNewsDetailsApiRequest() {
    let params = {
      news_id: id,
      hospital_id: hospital_id,
    };
    request(
      constant.getNewsDetails,
      "get",
      params,
      NEWSDETAILS,
      false,
      cbSuccess,
      cbFailure
    );
  }

  function cbSuccess(response, message) {
    setFetch(false);
  }
  function cbFailure(error) {}

  return (
    <BaseContainer>
      {isFetch ? (
        <ActivityIndicator
          color={Colors.lightGreen}
          size="large"
          style={styles.activityIndicator}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <ImageBackground
            defaultSource={Images.image_placeholder}
            source={{ uri: news_image }}
            style={styles.imgContainer}
          >
            <LinearGradient
              colors={["transparent", "transparent", "transparent"]}
              style={styles.gradient}
            >
              <ButtonView style={styles.backBtn} onPress={() => pop()}>
                <Image resizeMode="contain" source={Images.icCircleback} />
              </ButtonView>
            </LinearGradient>
          </ImageBackground>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainContainer}>
              <View style={styles.topContainer}>
                <Text style={styles.textTitle}>{news_title}</Text>
                <Text style={styles.textDate}>
                  {moment(created_at).format("DD MMM, yyyy")}
                </Text>
              </View>
              <Text style={styles.textDesc}>{news_description}</Text>
            </View>
          </ScrollView>
        </View>
      )}
    </BaseContainer>
  );
};
const actions = { request };
const mapStateToProps = (state) => {
  return {
    newsDetails: state.newsDetailsReducer.data,
  };
};
export default connect(mapStateToProps, actions)(NewsDetails);
