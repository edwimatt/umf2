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
import { request } from "../../actions/ServiceAction";
// redux
import { connect } from "react-redux";
// reducer
import { NEWSLIST } from "../../actions/ActionTypes";
import { useTranslation } from "react-i18next";

const { colors } = DefaultTheme;

const News = (props) => {
  const { request, newsList, user } = props;
  const { data, meta, isFetching } = newsList;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    _getNewslistApiRequest();
  }, []);

  function openNewsDetails(name, item) {
    navigate("NewsStack", {
      screen: name,
      params: item,
    });
  }

  function _getNewslistApiRequest(isConcat = false, page = 1) {
    let params = {
      page,
      hospital_id: user.hospital_id,
    };

    request(
      constants.getNews,
      "get",
      params,
      NEWSLIST,
      false,
      cbSuccess,
      cbFailure,
      NEWSLIST.BASE,
      isConcat
    );
  }

  function cbSuccess(response, message) {}
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
      <Text style={styles.headingText}>{t("common:news")}</Text>
      <CardWrapper
        iconPause={false}
        desc={true}
        viewMore={true}
        viewMoreText={t("common:readMore")}
        postedDate={true}
        item={data}
        meta={meta}
        isFetching={isFetching}
        fetchRequest={() => _getNewslistApiRequest()}
        category={"news"}
      />
    </BaseContainer>
  );
};
const actions = { request };
const mapStateToProps = (state) => {
  return {
    newsList: state.newsListReducer,
    user: state.user.data,
  };
};
export default connect(mapStateToProps, actions)(News);
