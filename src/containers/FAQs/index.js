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
import { navigate, pop } from "../../services/NavigationService";
// components
import { AppHeader, BaseContainer, CourseHeader } from "../../components";
import { WebView } from "react-native-webview";
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
import { useTranslation } from "react-i18next";

const { colors } = DefaultTheme;

const FAQs = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <BaseContainer>
      <AppHeader
        isBack={true}
        backOnPress={() => pop()}
        centerTitle={t("common:helpFAQ")}
        style={{ backgroundColor: Colors.white }}
      />
      <View style={styles.content}>
        <WebView
          showsVerticalScrollIndicator={false}
          source={{ uri: constants.contentURl + constants.faqURL }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          style={{ resizeMode: "cover", flex: 1 }}
          injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
          scalesPageToFit={false}
        />
      </View>
    </BaseContainer>
  );
};

export default FAQs;
