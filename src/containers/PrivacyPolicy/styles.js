import { StyleSheet } from "react-native";

import { DefaultTheme, Fonts, Metrics, Colors } from "../../theme";

const { colors } = DefaultTheme;

export default StyleSheet.create({
  contentText: {
    ...Fonts.Regular(12),
    color: Colors.valhalla,
    marginTop: Metrics.heightRatio(30),
    marginHorizontal: 15,
    lineHeight: 16,
    marginBottom: 10,
  },
  content: {
    backgroundColor: Colors.white,
    flex: 1,
    // paddingTop: Metrics.baseMargin,
    // paddingHorizontal: Metrics.baseMargin
  },
});
