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
// reuseable components
import { ImageHandler } from "../../reuseableComponents";
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

const CertificateDetails = (props) => {
  const { route } = props;
  const { params } = route;
  const { course_certificate_file, course_name, short_description } = params;
  short_description;
  const { t, i18n } = useTranslation();
  return (
    <BaseContainer>
      <AppHeader
        isBack={true}
        backOnPress={() => pop()}
        centerTitle={t("common:certificateDetails")}
        style={{ backgroundColor: Colors.white }}
      />

      <View style={styles.mainContainer}>
        <ImageHandler
          resizeMode="contain"
          defaultSource={Images.image_placeholder}
          source={{ uri: course_certificate_file }}
          style={styles.imgCertificate}
        />
        <Text style={styles.textTitle}>{course_name}</Text>

        <Text style={styles.textDesc}>{short_description}</Text>
      </View>
    </BaseContainer>
  );
};

export default CertificateDetails;
