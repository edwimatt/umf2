// predefined components
import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
// stack and bottom navigator
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// containers
import {
  MyCertificates,
  FAQs,
  PrivacyPolicy,
  TermsConditions,
  SetLanguage,
  ChangePassword,
  NotificationSettings,
  EditProfile,
  CertificateDetails,
  SupportChat,
} from "../../containers";
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

export default ProfileStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      ...backButton(),
    }}
  >
    <Stack.Screen
      name="MyCertificates"
      component={MyCertificates}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="CertificateDetails"
      component={CertificateDetails}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="FAQs"
      component={FAQs}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="PrivacyPolicy"
      component={PrivacyPolicy}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="TermsConditions"
      component={TermsConditions}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="SetLanguage"
      component={SetLanguage}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="ChangePassword"
      component={ChangePassword}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="NotificationSettings"
      component={NotificationSettings}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="SupportChat"
      component={SupportChat}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
