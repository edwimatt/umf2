// predefined components
import React from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
// stack and bottom navigator
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// tabs
import Tabs from '../Tabs';
// app header
import {AppHeader} from '../../components';
// navigation service
import {pop, navigate} from '../../services/NavigationService';
// navigator helper
import {
  backButton,
  removeBorder,
  removeHeader,
  title,
} from '../navigatorHelper';
// libraries
import {NavigationContainer} from '@react-navigation/native';
// theme
import {DefaultTheme, Colors, Fonts, Images, Metrics} from '../../theme';
// contexts
import {TabContext} from '../../contexts';

const {colors} = DefaultTheme;

const Stack = createStackNavigator();

const MainStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="TabNav"
      component={Tabs}
      options={{
        ...removeHeader,
      }}
    />
  </Stack.Navigator>
);
export {MainStack};
