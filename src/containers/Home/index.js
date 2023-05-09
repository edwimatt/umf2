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
  SectionList,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// constants
import constant from "../../constants";
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
import { FlatListHandler, ImageHandler } from "../../reuseableComponents";
// library
import LinearGradient from "react-native-linear-gradient";
// request
import { request } from "../../actions/ServiceAction";
// redux
import { connect } from "react-redux";
// reducer
import { CATEGORIES, MESSAGE_COUNTER } from "../../actions/ActionTypes";
// socket imports
import SocketIO from "../../modules/SocketIO";
import { useTranslation } from "react-i18next";

const { colors } = DefaultTheme;

const Home = (props) => {
  const { categories, user, request } = props;
  const { data, meta } = categories;
  const { id, hospital_id, hospital_image } = user;

  const [isFetch, setFetch] = useState(true);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    _getChatCountApiRequest();
    _getCategoriesApiRequest();

    SocketIO.init();
    if (!SocketIO.getInstance().getIsReceivedMessageListenerLockStatus()) {
      SocketIO.connectToSocket(user);
    }
  }, []);

  function openCourselist(name, item) {
    navigate("HomeStack", {
      screen: name,
      params: item,
    });
  }

  function openCourseDetails(name, item) {
    navigate("HomeStack", {
      screen: name,
      params: item,
    });
  }

  function openPopup() {
    utility.alerts(
      "Course Locked",
      "This course has been locked until you have completed the previous course."
    );
  }

  function renderSectionHeader({ section }) {
    return (
      <CourseHeader
        title={section.data.category_name}
        descr={section.data.description}
        seeAll={true}
        SeeAllOnPress={() => openCourselist("Courses")}
      />
    );
  }

  function renderList({ index, item }) {
    return (
      <View>
        <CourseHeader
          title={item.category_name}
          descr={item.description}
          viewAll={t("common:viewAll")}
          seeAll={item?.hospital_courses.length > 0 ? true : false}
          SeeAllOnPress={() => openCourseDetails("Courses", item)}
        />
        <FlatListHandler
          style={styles.list}
          data={item.hospital_courses}
          renderItem={CardItem}
          isFetching={false}
          meta={meta}
          horizontal
          showsHorizontalScrollIndicator={false}
          emptyList={t("common:videoProduct")}
        />
      </View>
    );
  }

  const CardItem = ({ index, item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          index > 0 && item.is_completed == 0
            ? openPopup()
            : openCourselist("CourseDetails", item);
        }}
      >
        <View
          style={[index == 0 ? styles.itemContainer1 : styles.itemContainer]}
        >
          <ImageBackground
            resizeMode="cover"
            style={styles.itemImage}
            defaultSource={Images.image_placeholder}
            source={{ uri: item.video_file_thumb }}
          >
            <LinearGradient
              colors={["transparent", "transparent", colors.black]}
              style={styles.gradient}
            >
              {index > 0 && item.is_completed == 0 && (
                <Image source={Images.icLock} style={styles.icLock} />
              )}

              <ImageBackground
                source={Images.iccirclePause}
                style={styles.iconCirclePause}
              >
                <View style={styles.circlePause} />
              </ImageBackground>
              <Text numberOfLines={2} style={styles.itemText}>
                {item.course_name}
              </Text>
            </LinearGradient>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  function _getChatCountApiRequest() {
    let params = {
      user_id: id,
    };

    request(
      constant.getChatCount,
      "get",
      params,
      MESSAGE_COUNTER,
      false,
      cbChatCountSuccess,
      cbFailure
    );
  }

  function cbChatCountSuccess(response, message) {}

  function _getCategoriesApiRequest() {
    let params = {
      hospital_id: hospital_id,
      user_id: id,
    };

    request(
      constant.getCategories,
      "get",
      params,
      CATEGORIES,
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
      <AppHeader
        isAvatar={true}
        search={true}
        AvatarOnPress={() => navigate("TabNav", { screen: "Profile" })}
        searchOnPress={() => navigate("HomeStack", { screen: "Search" })}
        chatonPress={() =>
          navigate("HomeStack", {
            screen: "ChatScreen",
            params: { otherUser: { id: user.owner_user_id } },
          })
        }
        chats={true}
        style={{ backgroundColor: Colors.baseColor }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headingText}> {t("common:home")}</Text>
        <ImageHandler
          resizeMode="cover"
          style={styles.imgBanner}
          source={{ uri: hospital_image }}
        />

        {isFetch ? (
          <ActivityIndicator
            color={Colors.lightGreen}
            size="large"
            style={styles.activityIndicator}
          />
        ) : (
          <SectionList
            sections={[{ data }]}
            renderItem={renderList}
            keyExtractor={(item, index) => `item_${index}`}
            extraData={props}
          />
        )}
      </ScrollView>
    </BaseContainer>
  );
};
const actions = { request };
const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer,
    user: state.user.data,
  };
};
export default connect(mapStateToProps, actions)(Home);
