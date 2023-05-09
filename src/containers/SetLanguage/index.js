// predefined functions
import React, { useRef, useContext, useState, useEffect, useMemo } from "react";
// predefined components
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  I18nManager,
} from "react-native";
// styles sheet
import styles from "./styles";
// reusable components
import {
  AppButton,
  FormHandler,
  MaterialTextField,
  ButtonView,
  ImageButton,
  FlashMessage,
} from "../../reuseableComponents";
// bottom sheet
import { BottomSheet, AppHeader, BaseContainer } from "../../components";
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
// contexts
import { LoginContext } from "../../contexts";
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
import { LANGUAGE, USER } from "../../actions/ActionTypes";
import { useTranslation } from "react-i18next";
import RNRestart from "react-native-restart";

const LANGUAGES = [
  {
    code: "en",
    label: "English",
    flag:
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png",
  },
  {
    code: "es",
    label: "Spanish",
    flag:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Spain_%28Civil%29.svg/2560px-Flag_of_Spain_%28Civil%29.svg.png",
  },
];

function SetLanguage(props) {
  const { request, language, user } = props;
  const { data, meta } = language;

  const { setLogin } = useContext(LoginContext);
  // states initailize
  const [isFetch, setFetch] = useState(true);
  const [langCode, setLangCode] = useState(undefined);

  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;

  useEffect(() => {
    if (langCode) {
      _onUpdateLanguageApiRequest(langCode);
    }
  }, [langCode]);

  const setLanguage = () => {
    i18n.changeLanguage(langCode).then(() => {
      I18nManager.forceRTL(false);
      // Immediately reload the React Native Bundle
      setTimeout(() => {
        RNRestart.Restart();
      }, 800);
    });
  };

  function _onUpdateLanguage(code) {
    setLangCode(code);
  }

  function _onUpdateLanguageApiRequest(code) {
    let formData = new FormData();

    formData.append("user_id", user.id);
    formData.append("language_id", code === "en" ? "1" : "2");

    request(
      constant.updateLanguage,
      "POST",
      formData,
      USER,
      true,
      cbUpdateLanguageSuccess,
      cbUpdateLanguageFailure
    );
  }

  function cbUpdateLanguageSuccess(response, message) {
    setLanguage();
  }
  function cbUpdateLanguageFailure(error) {}

  return (
    <BaseContainer>
      <AppHeader
        isBack={true}
        backOnPress={() => pop()}
        centerTitle={t("common:language")}
        style={{ backgroundColor: Colors.white }}
      />
      <Text style={styles.txtSignYourAccount}>
        {t("common:languageSelector")}
      </Text>
      <View style={styles.containerList}>
        {LANGUAGES.map((language) => {
          const selectedLanguage = language.code === selectedLanguageCode;

          return (
            <ButtonView
              key={language.code}
              style={styles.containerLanguage}
              // disabled={selectedLanguage}
              onPress={() => _onUpdateLanguage(language.code)}
            >
              <Image
                resizeMode="cover"
                source={{ uri: language.flag }}
                style={styles.itemImage}
              />
              <Text
                style={[
                  selectedLanguage ? styles.itemActiveText : styles.itemText,
                ]}
              >
                {language.label}
              </Text>
            </ButtonView>
          );
        })}
      </View>
    </BaseContainer>
  );
}
const actions = { request };
const mapStateToProps = (state) => {
  return {
    language: state.languageReducer,
    language: state.languageReducer,
    user: state.user.data,
  };
};
export default connect(mapStateToProps, actions)(SetLanguage);
