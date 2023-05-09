// predefined components
import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
// stack and bottom navigator
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// containers
import { CourseDetails,Search,SupportChat } from "../../containers";
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

export default MyTrainingsStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      ...backButton(),
    }}
  >
    <Stack.Screen
      name="CourseDetails"
      component={CourseDetails}
      options={{ headerShown: false }}
    />

    <Stack.Screen
    name="Search"
    component={Search}
    options={{ headerShown: false }}
  />

  <Stack.Screen
  name="SupportChat"
  component={SupportChat}
  options={{ headerShown: false }}
/>
  </Stack.Navigator>
);
