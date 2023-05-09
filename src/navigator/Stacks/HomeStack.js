// predefined components
import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
// stack and bottom navigator
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// containers
import { 
Home, 
Courses, 
CourseDetails, 
Quiz,
Search,
SupportChat, 
} from "../../containers";
import ChatScreen from '../../modules/chat/chat';
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

export default HomeStack = ({ navigation }) => (
  <Stack.Navigator initialRouteName={"Home"}>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Courses"
      component={Courses}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CourseDetails"
      component={CourseDetails}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Quiz"
      component={Quiz}
      options={{ headerShown: false }}
    />

    <Stack.Screen
    name="Search"
    component={Search}
    options={{ headerShown: false }}
    />

    <Stack.Screen
    name="ChatScreen"
    component={ChatScreen}
    options={{ headerShown: false }}
  />
  </Stack.Navigator>
);
