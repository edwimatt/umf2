import React from 'react';
import {Image, View, Text} from 'react-native';
import {Images, Colors, Metrics, Fonts} from '../../theme';
import utility from '../../utility';

export const screenOptions = (route) => ({
  tabBarIcon: ({focused, color, size}) => {
    const {name} = route;
    return (
      <Image
        style={{tintColor: color}}
        resizeMode="contain"
        source={Images[name]}
      />
    );
  },
});

export const tabBarOptions = {
  activeTintColor: Colors.theme,
  inactiveTintColor: Colors.midGray,
  keyboardHidesTabBar: true,
  style: {
    borderTopWidth: 0,
  },
  // safeAreaInsets: {
  //   bottom: Metrics.IS_IPHONE_X ? undefined : 0,
  // },
};
