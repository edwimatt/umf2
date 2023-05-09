//
//  navigatorHelper.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:20:00 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from "react";
import { Text } from "react-native";
import { Images, Metrics, AppStyles, Colors, Fonts } from "../theme";
import { Image, TouchableOpacity } from "react-native";
import { ImageButton } from "../reuseableComponents";
import { pop, toggleDrawer } from "../services/NavigationService";
import utility from "../utility";
import { HeaderBackButton } from "@react-navigation/stack";

const headerColor = {
  headerStyle: {
    backgroundColor: Colors.azure,
    borderBottomWidth: 0,
  },
};
const removeBorder = {
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: "transparent",
    elevation: 0,
  },
};

const removeHeader = {
  headerShown: false,
};

const removeHeaderTitle = {
  headerTitle: null,
};

const headerTransparent = {
  headerTransparent: true,
};

const backImage = (tintColor = Colors.azure) => {
  return {
    headerBackTitleVisible: false,
    headerLeftContainerStyle: {
      paddingHorizontal: utility.isPlatformAndroid() ? 8 : 16,
    },
    headerBackImage: () => (
      <Image source={Images.icBack} resizeMode="contain" />
    ),
  };
};

const backButton = () => {
  return {
    headerLeft: (props) => (
      <HeaderBackButton
        backImage={() => <Image source={Images.icBack} resizeMode="contain" />}
        labelVisible={false}
        onPress={() => pop()}
        style={{
          height: 30,
          width: 30,
          ...AppStyles.centerAligned,
          paddingHorizontal: utility.isPlatformAndroid() ? 0 : 16,
          marginLeft: utility.isPlatformAndroid() ? undefined : 8,
          // backgroundColor:'#000'
        }}
      />
    ),
  };
};

const title = (title) => ({
  title,
  headerTitleStyle: {
    ...Fonts.Semibold(17),
    fontWeight: "500",
    color: Colors.mirage,
  },
});
const defaultNavOptions = (navOptions) => {
  return {
    defaultNavigationOptions: ({ navigation }) => navOptions,
  };
};
const navOptions = (navOptions) => {
  return {
    navigationOptions: ({ navigation }) => navOptions,
  };
};

const navButton = (image, key = "headerRight", navOptions, style) => {
  return {
    navigationOptions: ({ navigation }) => {
      return {
        [key]: () => (
          <ImageButton
            source={image}
            style={{
              justifyContent: "center",
              marginHorizontal: Metrics.smallMargin,
              height: 40,
              ...style,
            }}
            onPress={navigation.getParam("onPress", () =>
              global.log("onPress")
            )}
          />
        ),
        ...navOptions,
      };
    },
  };
};
const dyanimcTitle = (navOptions = {}) => {
  return {
    navigationOptions: ({ navigation }) => {
      return {
        title: navigation.getParam("title", ""),
        ...navOptions,
      };
    },
  };
};
const drawerButton = {
  headerLeft: () => (
    <ImageButton
      source={Images.icMenu}
      onPress={toggleDrawer}
      style={{ marginLeft: Metrics.smallMargin }}
    />
  ),
};

export {
  headerColor,
  removeBorder,
  headerTransparent,
  backImage,
  title,
  defaultNavOptions,
  navOptions,
  navButton,
  dyanimcTitle,
  drawerButton,
  backButton,
  removeHeader,
  removeHeaderTitle,
};
