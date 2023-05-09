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
import { MY_TRAININGS } from "../../actions/ActionTypes";
import { useTranslation } from "react-i18next";

const { colors } = DefaultTheme;

const MyTrainings = (props) => {
  const { myTrainings, user, request, navigation } = props;
  const { data, meta, isFetching } = myTrainings;
  const { id } = user;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      _getMyTrainingsApiRequest();
    });

    return unsubscribe;
  }, [navigation]);

  function _getMyTrainingsApiRequest(isConcat = false, page = 1) {
    let params = {
      page,
      user_id: id,
    };

    request(
      constant.getMyTrainings,
      "get",
      params,
      MY_TRAININGS,
      false,
      cbSuccess,
      cbFailure,
      MY_TRAININGS.BASE,
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
      <Text style={styles.headingText}>{t("common:myTrainings")}</Text>
      <CardWrapper
        iconPause={true}
        desc={true}
        viewMore={true}
        viewMoreText={t("common:viewMore")}
        status={true}
        item={data}
        meta={meta}
        isFetching={isFetching}
        fetchRequest={_getMyTrainingsApiRequest}
        category={"mytrainings"}
      />
    </BaseContainer>
  );
};
const actions = { request };
const mapStateToProps = (state) => {
  return {
    myTrainings: state.myTrainingsReducer,
    user: state.user.data,
  };
};
export default connect(mapStateToProps, actions)(MyTrainings);
