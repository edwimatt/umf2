// predefined functions
import React, { useCallback, useRef, useState, useEffect } from "react";
// predefined components
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// constants
import constants from "../../constants";
import utility from "../../utility";
// navigation service
import { navigate } from "../../services/NavigationService";
// components
import { AppHeader, BaseContainer, CourseHeader } from "../../components";
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
// reusable components
import {
  ButtonView,
  FlatListHandler,
  ImageHandler,
} from "../../reuseableComponents";
// library
import LinearGradient from "react-native-linear-gradient";
import AutoHeightWebView from "react-native-autoheight-webview";
import { useTranslation } from "react-i18next";

const LectureWrapper = (props) => {
  const { header, item, StartQuizonPress } = props;
  const { course_contents } = item;
  const { t, i18n } = useTranslation();

  return (
    <BaseContainer>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Text numberOfLines={2} style={styles.textTitle}>
            {item.course_name}
          </Text>
          <View style={styles.subContainer}>
            {utility.isEqual(item.course_type, "quiz") && (
              <Text style={styles.textStatus}>
                {t("common:passing") + item.passing_percentage}
              </Text>
            )}
            {utility.isEqual(item.course_type, "quiz") && (
              <ButtonView style={styles.btnQuiz} onPress={StartQuizonPress}>
                <Text style={styles.textQuiz}>{t("common:startQuiz")}</Text>
              </ButtonView>
            )}
          </View>
        </View>
      </View>
      <View style={styles.rootContainer}>
        <ImageHandler
          style={styles.logo}
          source={{
            uri:
              "https://understandingmyfacility.com/image/think_safety_first.png",
          }}
          defaultSource={Images.image_placeholder}
        />
        <Text numberOfLines={5} style={styles.textHeading2}>
          {item.video_heading}
        </Text>
      </View>
      <AutoHeightWebView
        scrollEnabled={false}
        style={styles.textDesc2}
        source={{
          html: item.video_description,
        }}
        viewportContent={"width=device-width, user-scalable=no"}
      />
    </BaseContainer>
  );
};

export default LectureWrapper;
