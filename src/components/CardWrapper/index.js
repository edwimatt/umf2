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
import constants from "../../constants";
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
// utility
import utility from "../../utility";
// reusable components
import { ButtonView, FlatListHandler } from "../../reuseableComponents";
// library
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
import { useTranslation } from "react-i18next";

const CardWrapper = (props) => {
  const {
    iconPause,
    status,
    postedDate,
    desc,
    viewMore,
    viewMoreText,
    DetailsonPress,
    viewCertificateonPress,
    score,
    header,
    item,
    meta,
    isFetching,
    fetchRequest,
    category,
    disableClick,
    courseSearch,
  } = props;
  const { t, i18n } = useTranslation();

  function openScreenDetails(stack, name, item) {
    navigate(stack, {
      screen: name,
      params: item,
    });
  }

  function openPopup() {
    utility.alerts(t("common:courseLocked"), t("common:ThisCourse"));
  }

  const ListHeader = () => {
    //View to set in Header
    return (
      <CourseHeader title={item?.category_name} descr={item?.description} />
    );
  };

  const CardItem = ({ index, item }) => {
    return (
      <View style={styles.rootContainer}>
        <ButtonView
          disabled={disableClick}
          onPress={() =>
            category == "mytrainings"
              ? openScreenDetails("HomeStack", "CourseDetails", item)
              : category == "allcourse"
              ? index > 0 && item.is_completed == 0
                ? openPopup()
                : openScreenDetails("HomeStack", "CourseDetails", item)
              : category == "news"
              ? openScreenDetails("NewsStack", "NewsDetails", item)
              : category == "certificates"
              ? openScreenDetails("ProfileStack", "NewsDetails", item)
              : ""
          }
          style={styles.mainContainer}
        >
          <View style={styles.leftContainer}>
            <ImageBackground
              resizeMode="cover"
              style={styles.itemImage}
              defaultSource={Images.image_placeholder}
              source={{
                uri:
                  category == "mytrainings"
                    ? item.video_file_thumb
                    : category == "allcourse"
                    ? item.video_file_thumb
                    : category == "news"
                    ? item.news_image
                    : category == "certificates"
                    ? item.course_certificate_file
                    : null,
              }}
            >
              {index > 0 && item.is_completed == 0 && (
                <Image source={Images.icLock} style={styles.icLock} />
              )}
              {iconPause && (
                <ImageBackground
                  source={Images.iccirclePause}
                  style={styles.iconCirclePause}
                >
                  <View style={styles.circlePause} />
                </ImageBackground>
              )}
            </ImageBackground>
          </View>
          <View
            style={[score ? styles.rightContainer2 : styles.rightContainer]}
          >
            <Text numberOfLines={2} style={styles.itemTitle}>
              {category == "mytrainings"
                ? item.video_heading
                : category == "allcourse"
                ? item.video_heading
                : category == "news"
                ? item.news_title
                : category == "certificates"
                ? item.video_heading
                : "Not Found!"}
            </Text>
            {desc && (
              <Text numberOfLines={3} style={styles.itemDesc}>
                {category == "mytrainings"
                  ? item.short_description //video_description
                  : category == "allcourse"
                  ? item.short_description
                  : category == "news"
                  ? item.news_description
                  : category == "certificates"
                  ? item.video_description
                  : "Not Found!"}
              </Text>
            )}
            {viewMore && (
              <Text numberOfLines={1} style={styles.textViewmore}>
                {viewMoreText}
              </Text>
            )}
            {status && (
              <View style={styles.statusContainer}>
                <Image
                  resizeMode="cover"
                  style={styles.iconStatus}
                  source={
                    item.is_quiz_passed ? Images.icPassed : Images.icFailed
                  }
                />
                <Text
                  style={
                    (styles.textStatus,
                    [
                      item.is_quiz_passed
                        ? styles.passedColor
                        : styles.failedColor,
                    ])
                  }
                >
                  {item.is_quiz_passed
                    ? t("common:passed") + item.quiz_percentage
                    : t("common:fail") + item.quiz_percentage}
                  {"%"}
                </Text>
              </View>
            )}
            {postedDate && (
              <Text style={styles.textPostedDate}>
                {moment(item.created_at).format("DD MMM, yyyy")}
              </Text>
            )}
            {score && (
              <View style={styles.certificateContainer}>
                <Text style={styles.textScore}>
                  {item.passing_percentage
                    ? t("common:score") + item.passing_percentage
                    : t("common:score") + +item.quiz_percentage + "%"}
                </Text>
                <ButtonView
                  onPress={() =>
                    openScreenDetails(
                      "ProfileStack",
                      "CertificateDetails",
                      item
                    )
                  }
                  style={styles.btnCertificate}
                >
                  <Text style={styles.textcertificate}>
                    {t("common:viewCertificate")}
                  </Text>
                </ButtonView>
              </View>
            )}
            {courseSearch && (
              <View style={styles.certificateContainer}>
                <Text style={styles.textScore}>
                  {t("common:score") + item.passing_percentage}
                </Text>
              </View>
            )}
          </View>
        </ButtonView>
      </View>
    );
  };
  return (
    <BaseContainer>
      <FlatListHandler
        style={styles.list}
        data={
          category == "mytrainings"
            ? item
            : category == "allcourse"
            ? item?.hospital_courses
            : category == "news"
            ? item
            : category == "certificates"
            ? item
            : ""
        }
        ListHeaderComponent={header && item ? ListHeader : ""}
        renderItem={CardItem}
        meta={meta}
        isFetching={isFetching}
        fetchRequest={fetchRequest}
        showsVerticalScrollIndicator={false}
      />
    </BaseContainer>
  );
};

export default CardWrapper;
