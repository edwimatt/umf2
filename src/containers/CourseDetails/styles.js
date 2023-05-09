import { StyleSheet } from "react-native";

import { DefaultTheme, Fonts, Metrics, Colors } from "../../theme";

const { colors } = DefaultTheme;

export default StyleSheet.create({
  mainContainer: {
    marginHorizontal: 14,
    marginTop: 14,
    marginBottom: 10,
  },
  videoContainer: {
    width: Metrics.screenWidth,
    height: Metrics.heightRatio(309),
  },
  gradient: {
    flex: 1,
  },
  textTitle: {
    ...Fonts.Semibold(20),
    lineHeight: 24,
    color: Colors.valhalla,
    alignSelf: "flex-start",
  },

  textDate: {
    ...Fonts.Regular(12),
    marginTop: 10,
    lineHeight: 18,
    color: Colors.grey,
    alignSelf: "flex-start",
  },

  textDesc: {
    ...Fonts.Regular(12),
    lineHeight: 16,
    marginTop: Metrics.heightRatio(15),
    color: Colors.valhalla,
    alignSelf: "flex-start",
  },
  backBtn: {
    width: 33,
    height: 33,
  },
  fullBtn: {
    width: 33,
    height: 33,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 6,
  },
  icon: {
    width: 20,
    height: 20,
  },
  btnsContainer: {
    position: "absolute",
    marginTop: Metrics.heightRatio(30),
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
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
  videoIndicator: {
    width: "100%",
    height: Metrics.heightRatio(309),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
    position: "absolute",
  },
  videoLandScape: {
    width: Metrics.screenHeight + 50,
    height: Metrics.screenWidth,
  },
});
