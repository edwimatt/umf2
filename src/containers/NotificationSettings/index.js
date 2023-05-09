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
import constants from "../../constants";
// navigation service
import { navigate, pop } from "../../services/NavigationService";
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
// library
import ToggleSwitch from "toggle-switch-react-native";
// request
import { request } from "../../actions/ServiceAction";
// redux
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const { colors } = DefaultTheme;

const NotificationSettings = (props) => {
  const { request, user } = props;
  const { t, i18n } = useTranslation();

  // state initialize
  const [list, setList] = useState([]);
  const [isFetch, setFetch] = useState(true);

  useEffect(() => {
    _getNotificationSettingsApiRequest();
  }, []);

  handleSetCheck = (index) => () => {
    const newOptions = [...list];
    newOptions[index].is_notification_on = !list[index].is_notification_on;
    setList(newOptions);

    if (newOptions[index].is_notification_on == 1) {
      _saveNotificationSettingsApiRequest(1);
    } else {
      _saveNotificationSettingsApiRequest(0);
    }
  };

  function Item(item, handleSetCheck) {
    return (
      <View>
        <View style={styles.listItem}>
          <View style={styles.leftTextview}>
            <Text style={styles.leftText}>{item.setting_title}</Text>
          </View>
          <View style={styles.rightIconView}>
            <ToggleSwitch
              style={styles.rightIconView}
              isOn={item.is_notification_on}
              onColor={Colors.lightGreen}
              offColor={Colors.grey}
              size="medium"
              onToggle={(isOn) => handleSetCheck(isOn)}
            />
          </View>
        </View>
        <View style={styles.bottomline} />
      </View>
    );
  }

  function _getNotificationSettingsApiRequest() {
    let params = {
      user_id: user.id,
    };
    request(
      constants.getNotificationSettings,
      "get",
      params,
      undefined,
      false,
      cbSuccess,
      cbFailure
    );
  }

  function cbSuccess(response, message) {
    setList([response]);
    setFetch(false);
  }

  function _saveNotificationSettingsApiRequest(is_notification_on) {
    let formData = new FormData();

    formData.append("user_id", user.id);
    formData.append("is_notification_on", is_notification_on);

    request(
      constants.saveNotificationSettings,
      "POST",
      formData,
      undefined,
      false,
      saveNotificationCBSuccess,
      cbFailure
    );
  }

  function saveNotificationCBSuccess(response, message) {}

  function cbFailure(error) {}

  return (
    <BaseContainer>
      <AppHeader
        isBack={true}
        backOnPress={() => pop()}
        centerTitle={t("common:notificationSettings")}
        style={{ backgroundColor: Colors.white }}
      />
      <View style={styles.container}>
        {isFetch ? (
          <ActivityIndicator
            color={Colors.lightGreen}
            size="large"
            style={styles.activityIndicator}
          />
        ) : (
          <View>
            {list.map((item, index) => Item(item, handleSetCheck(index)))}
          </View>
        )}
      </View>
    </BaseContainer>
  );
};
const actions = { request };
const mapStateToProps = ({ user }) => {
  return {
    user: user.data,
  };
};
export default connect(mapStateToProps, actions)(NotificationSettings);
