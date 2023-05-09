// predefined functions
import React, { memo, useRef, useContext, useState, useEffect } from "react";
// predefined components
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
// styles
import styles from "./styles";
// theme
import {
  Colors,
  Images,
  Metrics,
  Strings,
  DefaultTheme,
  Fonts,
} from "../../theme";
// reuseable components
import {
  ImageButton,
  FormHandler,
  ButtonView,
} from "../../reuseableComponents";
import AutoHeightWebView from "react-native-autoheight-webview";

const { colors } = DefaultTheme;

const index = (props) => {
  const {
    title,
    seeAll,
    SeeAllOnPress,
    descr,
    viewAll,
    style,
    headerStyle = {},
  } = props;

  return (
    <View style={[styles.container, { ...style }]}>
      <View style={[styles.headerContainer, { ...headerStyle }]}>
        <View style={styles.subheaderContainer}>
          {title && <Text style={styles.textTitle}>{title}</Text>}
          {seeAll && (
            <ButtonView style={styles.btnViewAll} onPress={SeeAllOnPress}>
              <Text numberOfLines={1} style={styles.textSeeall}>
                {viewAll}
              </Text>
            </ButtonView>
          )}
        </View>
        <View style={styles.subheaderContainer}>
          {descr && (
            <AutoHeightWebView
              style={styles.textDesc2}
              scrollEnabled={false}
              loading={true}
              viewportContent={"width=device-width, user-scalable=no"}
              source={{
                html: descr,
              }}
            />
          )}
          {/* {descr && <Text style={styles.textDesc}>{descr}</Text>} */}
        </View>
      </View>
    </View>
  );
};

export default memo(index);
