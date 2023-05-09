//
//  Fonts.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:47:26 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import Metrics from './Metrics';
import Colors from './Colors';
import DefaultTheme from './DefaultTheme';

const {colors} = DefaultTheme;

export default class Fonts {
  static FontFamily = {
    default: 'Gibson',
  };

  static Type = {
    Black: 'Black',
    Regular: 'Regular',
    Bold: 'Bold',
    Semibold: 'Semibold',
    Light: 'Light',
  };

  static Size = {
    xxxSmall: 11,
    xxxxSmall: 12,
    xxSmall: 13,
    xSmall: 14,
    small: 15,
    normal: 17,
    xnormal: 18,
    medium: 19,
    large: 21,
    xLarge: 23,
    xxLarge: 28,
    xxxLarge: 31,
    huge: 34,
    xhuge: 37,
    xxhuge: 40,
    xxxhuge: 43,
  };

  static font = (
    fontFamily = Fonts.FontFamily.default,
    type = Fonts.Type.Regular,
    size = Fonts.Size.medium,
  ) => {
    return {
      fontFamily: fontFamily + '-' + type,
      fontSize: size,
    };
  };

  static Black = (size) => {
    return {
      ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.Black, size),
      color: colors.dark,
    };
  };

  static Semibold = (size) => {
    return {
      ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.Semibold, size),
      color: colors.dark,
    };
  };

  static Regular = (size) => {
    return {
      ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.Regular, size),
      color: colors.dark,
    };
  };

  static Light = (size) => {
    return {
      ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.Light, size),

      color: colors.dark,
    };
  };

  static Bold = (size) => {
    return {
      ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.Bold, size),
      color: colors.dark,
    };
  };
}
