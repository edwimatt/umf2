import { StyleSheet } from "react-native";

import { DefaultTheme, Fonts, Metrics, Colors } from "../../theme";

const { colors } = DefaultTheme;

export default StyleSheet.create({
  mainContainer: {
    marginHorizontal: 14,
    marginTop: 14,
    marginBottom: 10,
  },
  imgContainer: {
    width: "100%",
    height: Metrics.heightRatio(309),
  },
  gradient: {
    flex: 1,
  },
  textTitle: {
    ...Fonts.Semibold(20),
    lineHeight: 23,
    letterSpacing: 0.64,
    color: Colors.valhalla,
    alignSelf: "flex-start",
  },

  textDate: {
    ...Fonts.Regular(12),
    letterSpacing: 0.64,
    marginTop: 10,
    lineHeight: 15,
    color: Colors.grey,
    alignSelf: "flex-start",
  },

  textDesc: {
    ...Fonts.Regular(12),
    lineHeight: 15,
    letterSpacing: 0.64,
    marginTop: Metrics.heightRatio(15),
    color: Colors.valhalla,
    alignSelf: "flex-start",
  },
  backBtn: {
    width: 41,
    height: 41,
    marginTop: Metrics.heightRatio(55),
    marginLeft: 16,
  },
  topContainer: {
    paddingHorizontal: 16,
    paddingVertical: 19,
    borderRadius: 6,
    backgroundColor: Colors.white,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
});
