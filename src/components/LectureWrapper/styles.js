import { StyleSheet } from "react-native";
import Colors from "../../theme/Colors";

import { Metrics, Fonts, DefaultTheme } from "../../theme";

const { colors } = DefaultTheme;

export default StyleSheet.create({
  mainContainer: {
    marginHorizontal: 14,
    marginTop: 14,
    marginBottom: 10,
  },
  topContainer: {
    paddingHorizontal: 14,
    paddingVertical: 19,
    borderRadius: 6,
    backgroundColor: Colors.white,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  textTitle: {
    ...Fonts.Semibold(18),
    lineHeight: 22,
    color: Colors.valhalla,
    alignSelf: "flex-start",
    letterSpacing: 0.64,
  },

  textStatus: {
    ...Fonts.Regular(13),
    lineHeight: 18,
    color: Colors.lightGreen,
    alignSelf: "flex-start",
    letterSpacing: 0.64,
  },
  btnQuiz: {
    height: Metrics.heightRatio(35),
    width: Metrics.widthRatio(109),
    backgroundColor: Colors.lightGreen,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  textQuiz: {
    ...Fonts.Semibold(14),
    lineHeight: 17,
    color: Colors.white,
    letterSpacing: 0.64,
  },
  textHeading1: {
    ...Fonts.Regular(13),
    lineHeight: 14,
    color: Colors.valhalla,
    alignSelf: "flex-start",
  },
  textHeading2: {
    ...Fonts.Semibold(13),
    lineHeight: 14,
    color: Colors.valhalla,
    alignSelf: "flex-start",
    marginTop: 10,
    letterSpacing: 0.64,
  },
  textDesc: {
    ...Fonts.Regular(13),
    lineHeight: 16,
    marginTop: Metrics.heightRatio(10),
    color: Colors.paleGray,
    alignSelf: "flex-start",
    letterSpacing: 0.64,
  },
  textDesc2: {
    marginTop: Metrics.heightRatio(10),
    marginHorizontal: 14,
    marginBottom: 10,
    backgroundColor: Colors.transparent,
    width: Metrics.screenWidth - 15,
    opacity: 0.99,
    minHeight: 100,
  },
  rootContainer: {
    marginHorizontal: 12,
    // marginTop: 5,
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
});
