import React from "react";
import { Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "../Stacks/HomeStack";
import MyTrainingsStack from "../Stacks/MyTrainingsStack";
import NewsStack from "../Stacks/NewsStack";
import ProfileStack from "../Stacks/ProfileStack";

import { Home, MyTrainings, News, Profile } from "../../containers";
import { createStackNavigator } from "@react-navigation/stack";
import {
  drawerButton,
  removeHeader,
  removeHeaderTitle,
} from "../navigatorHelper";
import { tabBarOptions, screenOptions } from "./options";
import { Images, Colors, Metrics, Fonts } from "../../theme";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNav = () => {
  const { t, i18n } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => screenOptions(route)}
      tabBarOptions={{
        activeTintColor: Colors.theme,
        inactiveTintColor: Colors.midGray,
        keyboardHidesTabBar: true,
        style: {
          marginBottom: Platform.OS === "ios" ? 5 : 0,
        },
        labelStyle: {
          letterSpacing: 0.28,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: t("navigate:home"),
        }}
      />
      <Tab.Screen
        name="MyTrainings"
        component={MyTrainings}
        options={{
          tabBarLabel: t("navigate:myTrainings"),
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: t("navigate:news"),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: t("navigate:profile"),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack = ({ navigation }) => (
  <Stack.Navigator initialRouteName="TabNav">
    <Stack.Screen
      name="TabNav"
      component={TabNav}
      options={{
        ...removeHeader,
      }}
    />

    <Stack.Screen
      name="HomeStack"
      component={HomeStack}
      options={{ ...removeHeader }}
    />
    <Stack.Screen
      name="MyTrainingsStack"
      component={MyTrainingsStack}
      options={{ ...removeHeader }}
    />
    <Stack.Screen
      name="NewsStack"
      component={NewsStack}
      options={{ ...removeHeader }}
    />
    <Stack.Screen
      name="ProfileStack"
      component={ProfileStack}
      options={{ ...removeHeader }}
    />
  </Stack.Navigator>
);
