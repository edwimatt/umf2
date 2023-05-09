// predefined functions
import React, { useRef, useContext, useState, useEffect } from "react";
// predefined components
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Image, View, Text, ScrollView } from "react-native";
// styles sheet
import styles from "./styles";
// reusable components
import {
  AppButton,
  FormHandler,
  MaterialTextField,
  ButtonView,
  FlashMessage,
  ImageButton,
} from "../../reuseableComponents";
// bottom sheet
import { BottomSheet } from "../../components";
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
import { navigate, push } from "../../services/NavigationService";
// utility
import utility from "../../utility";
// constants
import constant from "../../constants";
import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/Constants";
// HttpServiceManager
import HttpServiceManager from "../../services/HttpServiceManager";
// request
import { request } from "../../actions/ServiceAction";
// redux
import { connect } from "react-redux";
// reducer
import { USER } from "../../actions/ActionTypes";
import { useTranslation } from "react-i18next";

function Auth(props) {
  const { request, language } = props;
  const { t, i18n } = useTranslation();
  const formHandler = useRef(null);
  const forgotPassformHandler = useRef(null);
  // state initialize
  const [pass_show, setpass_show] = useState(false);

  // forgot password sheet
  const ForgotPasswordSheetRef = useRef(null);

  useEffect(() => {}, []);

  function _onSignin() {
    const payload = formHandler.current.onSubmitForm();
    if (payload) {
      _onSiginApiRequest(payload);
    }
  }
  function _onSiginApiRequest(payload) {
    let formData = new FormData();

    formData.append("email", payload.email);
    formData.append("password", payload.password);
    formData.append("device_token", utility.getOneSignalPlayerId());
    if (utility.isPlatformAndroid) {
      formData.append("device_type", "android");
    } else {
      formData.append("device_type", "ios");
    }

    request(
      constant.login,
      "POST",
      formData,
      USER,
      true,
      cbSigninApiSuccess,
      cbSigninApiFailure
    );
  }

  function cbSigninApiSuccess(response, message) {
    HttpServiceManager.getInstance().userToken = response.token;
    HttpServiceManager.getInstance().language = response.language_id;
    setTimeout(() => {
      FlashMessage({ message: message, type: "success" });
      push("AuthStack", { screen: "SelectLanguages" });
    }, 500);
  }
  function cbSigninApiFailure(error) {}

  function _onForgotPass() {
    const payload = forgotPassformHandler.current.onSubmitForm();
    if (payload) {
      _onForgotPassApiRequest(payload);
    }
  }
  function _onForgotPassApiRequest(payload) {
    let formData = new FormData();

    formData.append("email", payload.email);

    request(
      constant.forgotPassword,
      "POST",
      formData,
      undefined,
      true,
      cbForgotPassApiSuccess,
      cbForgotPassApiFailure
    );
  }

  function cbForgotPassApiSuccess(response, message) {
    setTimeout(() => {
      FlashMessage({ message: message, type: "success" });
      ForgotPasswordSheetRef.current.close();
    }, 500);
  }
  function cbForgotPassApiFailure(error) {}

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollviewContainer}
    >
      <View style={styles.mainContainer}>
        <Image
          source={Images.ic_login}
          style={styles.logo}
          resizeMode={"contain"}
        />
        <Text style={styles.txtSignYourAccount}>
          {t("common:signintoyourAccount")}
        </Text>
        <FormHandler ref={formHandler}>
          <MaterialTextField
            label={t("common:email")}
            placeholder={t("common:email")}
            type={INPUT_TYPES.EMAIL}
            error={Strings.ERROR.please_enter_valid_email}
            maxLength={50}
            identifier="email"
            borderStyle={{ borderRadius: 0 }}
            outlined={false}
            style={styles.input_email}
            textInputStyle={styles.txt_input_fields}
            numberOfLines={1}
          />
          <MaterialTextField
            label={t("common:password")}
            placeholder={t("common:password")}
            type={INPUT_TYPES.PASSWORD}
            error={Strings.ERROR.please_enter_valid_password}
            maxLength={50}
            identifier="password"
            outlined={false}
            borderStyle={{ borderRadius: 0 }}
            style={styles.input_password}
            textInputStyle={styles.txt_input_fields}
            rightIcon={
              pass_show ? Images.ic_vissibilty : Images.ic_vissibilty_off
            }
            rightIconSelected={
              pass_show ? Images.ic_vissibilty : Images.ic_vissibilty_off
            }
            onRightPress={() => setpass_show(!pass_show)}
            showPassword={pass_show}
            numberOfLines={1}
          />
        </FormHandler>
        <TouchableOpacity onPress={() => ForgotPasswordSheetRef.current.open()}>
          <Text style={styles.txt_forgot_pass}>
            {t("common:forgotyourPassword")}
          </Text>
        </TouchableOpacity>
        <AppButton
          title={t("common:signIn")}
          onPress={() => _onSignin()}
          style={styles.login_Btn}
          textStyle={styles.txt_login_Btn}
        />
      </View>
      {/*Forgotpassword UI*/}
      <BottomSheet ref={ForgotPasswordSheetRef} height={450} round={15}>
        <View style={styles.bottomSheetHeader}>
          <ImageButton
            onPress={() => ForgotPasswordSheetRef.current.close()}
            style={styles.iconCross}
            source={Images.icCross}
          />
        </View>
        <Text style={styles.txtForgotPass}>{t("common:forgotPassword")}</Text>
        <Text style={styles.txtEnteryourEmail} numberOfLines={2}>
          {t("common:enteryourEmail")}
        </Text>
        <FormHandler ref={forgotPassformHandler}>
          <MaterialTextField
            label={t("common:email")}
            placeholder={t("common:email")}
            type={INPUT_TYPES.EMAIL}
            error={Strings.ERROR.please_enter_valid_email}
            maxLength={50}
            identifier="email"
            borderStyle={{ borderRadius: 0 }}
            outlined={false}
            style={styles.input_forgotPassemail}
            textInputStyle={styles.txt_input_fields}
          />
        </FormHandler>
        <AppButton
          title={t("common:submit")}
          onPress={() => _onForgotPass()}
          style={styles.login_Btn}
          textStyle={styles.txt_login_Btn}
        />
      </BottomSheet>
    </ScrollView>
  );
}
const actions = { request };
const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    language: state.languageReducer.data,
  };
};
export default connect(mapStateToProps, actions)(Auth);
