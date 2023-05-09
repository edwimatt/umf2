// predefined components
import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
// stack and bottom navigator
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// containers
import { Auth, SelectLanguages } from "../../containers";
// app header
import { AppHeader } from "../../components";
// navigation service
import { pop, navigate } from "../../services/NavigationService";
// navigator helper
import { backButton, removeBorder, title } from "../navigatorHelper";
// libraries
import { NavigationContainer } from "@react-navigation/native";
// theme
import { DefaultTheme, Colors } from "../../theme";

const { colors } = DefaultTheme;

const Stack = createStackNavigator();

export default AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Auth"
    screenOptions={{
      ...backButton(),
      ...removeBorder,
      gestureEnabled: false,
    }}
  >
    <Stack.Screen
      name="Auth"
      component={Auth}
      options={{ title: "", headerShown: false }}
    />

    <Stack.Screen
      name="SelectLanguages"
      component={SelectLanguages}
      options={{ title: "", headerShown: false }}
    />
  </Stack.Navigator>
);
