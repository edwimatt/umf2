import { StyleSheet } from "react-native";

import { DefaultTheme, Fonts, Metrics, Colors } from "../../theme";

const { colors } = DefaultTheme;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 6,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 34,
    alignItems: "center",
  },
  imgCertificate: {
    width: Metrics.widthRatio(230),
    height: Metrics.heightRatio(162),
    marginTop: Metrics.heightRatio(25),
  },
  textTitle: {
    ...Fonts.Semibold(16),
    lineHeight: 19,
    letterSpacing: 0.64,
    marginTop: Metrics.heightRatio(40),
    color: Colors.valhalla,
    textAlign: "center",
  },

  textDesc: {
    ...Fonts.Regular(12),
    lineHeight: 18,
    letterSpacing: 0.64,
    marginTop: Metrics.heightRatio(20),
    color: Colors.paleGray,
    textAlign: "center",
    marginHorizontal: Metrics.widthRatio(22),
  },
});
