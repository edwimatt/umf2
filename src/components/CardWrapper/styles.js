import { StyleSheet } from "react-native";
import Colors from "../../theme/Colors";

import { Metrics, Fonts, DefaultTheme } from "../../theme";

const { colors } = DefaultTheme;

export default StyleSheet.create({
  rootContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 14,
    marginVertical: 7,
    borderRadius: 7,
    overflow: "hidden",
  },
  mainContainer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: Colors.white,
  },
  leftContainer: {
    flex: 0.3,
    paddingHorizontal: 10,
    paddingVertical: 16.5,
    // justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    flex: 0.7,
    paddingVertical: 14,
    justifyContent: "flex-start",
  },
  rightContainer2: {
    flex: 0.7,
    paddingVertical: 14,
    justifyContent: "space-between",
  },
  itemImage: {
    width: Metrics.widthRatio(100),
    height: 110,
    borderRadius: 7,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  iconCirclePause: {
    opacity: 1,
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  circlePause: {
    opacity: 0.25,
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
    backgroundColor: Colors.valhalla,
  },
  itemTitle: {
    ...Fonts.Semibold(14),
    color: Colors.valhalla,
    alignSelf: "flex-start",
    lineHeight: 17,
    // width: Metrics.widthRatio(120),
  },
  itemDesc: {
    ...Fonts.Regular(12),
    letterSpacing: 0.64,
    color: Colors.paleGray,
    marginTop: 6,
    alignSelf: "flex-start",
    lineHeight: 14,
    marginRight: 20,
  },
  textViewmore: {
    ...Fonts.Regular(12),
    letterSpacing: 0.64,
    color: Colors.blue,
    lineHeight: 14,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 6,
  },
  iconStatus: {
    width: 15.2,
    height: 15.2,
  },
  textStatus: {
    ...Fonts.Regular(12),
    letterSpacing: 0.64,
    alignSelf: "center",
    lineHeight: 14,
    letterSpacing: 0.64,
  },
  passedColor: {
    color: Colors.lightGreen,
    marginLeft: 3,
  },
  failedColor: {
    color: Colors.red,
    marginLeft: 3,
  },
  textPostedDate: {
    ...Fonts.Regular(12),
    color: Colors.eastBay,
    marginTop: 6,
    alignSelf: "flex-start",
    lineHeight: 16,
    letterSpacing: 0.64,
  },
  certificateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  textScore: {
    ...Fonts.Regular(13),
    alignSelf: "center",
    lineHeight: 16,
    color: Colors.lightGreen,
    letterSpacing: 0.64,
  },
  btnCertificate: {
    width: Metrics.widthRatio(125),
    height: Metrics.heightRatio(30),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: Colors.valhalla,
    borderRadius: 4,
    marginRight: 10,
  },
  textcertificate: {
    ...Fonts.Regular(12),
    alignSelf: "center",
    lineHeight: 15,
    color: Colors.white,
    letterSpacing: 0.64,
  },
  icLock: {
    width: 20,
    height: 20,
    position: "absolute",
    top: 0,
    marginTop: 5,
    right: 0,
    marginRight: 5,
  },
});
