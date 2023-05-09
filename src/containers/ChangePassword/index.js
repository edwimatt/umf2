// predefined functions
import React, { useRef, useContext, useState, useEffect } from "react";
// predefined components
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
// styles sheet
import styles from "./styles";
// components
import { AppHeader, BaseContainer } from "../../components";
// reusable components
import {
  AppButton,
  FormHandler,
  MaterialTextField,
  ButtonView,
  ImageButton,
  InputTextField,
  FlashMessage,
  Label,
} from "../../reuseableComponents";
// theme
import {
  DefaultTheme,
  Images,
  Metrics,
  Strings,
  Fonts,
  Colors,
} from "../../theme";
// navigation service
import { navigate, pop } from "../../services/NavigationService";
// utility
import utility from "../../utility";
// constants
import constant from "../../constants";
import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/Constants";
// request
import { request } from "../../actions/ServiceAction";
// redux
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

function ChangePassword(props) {
  const { request } = props;
  const { t, i18n } = useTranslation();
  const formHandler = useRef(null);
  // states initialize
  const [currentPass, setCurrentpass] = useState("");
  const [newPass, setNewpass] = useState("");
  const [confirmPass, setConfirmpass] = useState("");

  function _onChangePassword() {
    const payload = formHandler.current.onSubmitForm();
    if (payload) {
      _onChangePasswordApiRequest(payload);
    }
  }
  function _onChangePasswordApiRequest(payload) {
    let formData = new FormData();

    formData.append("old_password", payload.old_password);
    formData.append("password", payload.password);
    formData.append("password_confirmation", payload.password_confirmation);

    request(
      constant.changePassword,
      "POST",
      formData,
      undefined,
      true,
      cbSuccess,
      cbFailure
    );
  }

  function cbSuccess(response, message) {
    FlashMessage({ message: message, type: "success" });

    setCurrentpass("");
    setNewpass("");
    setConfirmpass("");
  }
  function cbFailure(error) {}

  return (
    <BaseContainer>
      <AppHeader
        isBack={true}
        backOnPress={() => pop()}
        centerTitle={t("common:changePassword")}
        style={{ backgroundColor: Colors.white }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <FormHandler ref={formHandler}>
            <InputTextField
              placeholder={t("common:currentPassword")}
              error={Strings.ERROR.please_enter_valid_password}
              type={INPUT_TYPES.PASSWORD}
              identifier="old_password"
              style={styles.inputField}
              title={t("common:currentPassword")}
              value={currentPass}
              onChangeText={(text) => {
                setCurrentpass(text);
              }}
            />

            <InputTextField
              placeholder={t("common:newPassword")}
              error={Strings.ERROR.please_enter_valid_password}
              type={INPUT_TYPES.PASSWORD}
              identifier="password"
              style={styles.inputField}
              title={t("common:newPassword")}
              value={newPass}
              onChangeText={(text) => {
                setNewpass(text);
              }}
            />

            <InputTextField
              placeholder={t("common:confirmPassword")}
              error={Strings.ERROR.please_enter_valid_password}
              type={INPUT_TYPES.PASSWORD}
              identifier="password_confirmation"
              style={styles.inputField}
              title={t("common:confirmPassword")}
              value={confirmPass}
              onChangeText={(text) => {
                setConfirmpass(text);
              }}
            />
          </FormHandler>

          <ButtonView
            onPress={() => _onChangePassword()}
            style={styles.btnSave}
          >
            <Text style={styles.textSave}>{t("common:save")}</Text>
          </ButtonView>
        </View>
      </ScrollView>
    </BaseContainer>
  );
}
const actions = { request };
const mapStateToProps = () => ({});
export default connect(mapStateToProps, actions)(ChangePassword);
