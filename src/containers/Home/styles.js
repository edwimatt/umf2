import { StyleSheet } from "react-native";

import { DefaultTheme, Fonts, Metrics, Colors } from "../../theme";

const { colors } = DefaultTheme;

export default StyleSheet.create({
  headingText: {
    ...Fonts.Semibold(30),
    color: Colors.valhalla,
    marginTop: Metrics.heightRatio(14),
    marginHorizontal: Metrics.widthRatio(16),
  },
  imgBanner: {
    width: Metrics.widthRatio(345),
    height: Metrics.heightRatio(106),
    marginTop: Metrics.heightRatio(13),
    marginHorizontal: Metrics.widthRatio(15),
    borderRadius: 8,
  },
  list: {
    // paddingHorizontal: Metrics.widthRatio(15),
  },
  // card item
  itemContainer1: {
    marginRight: Metrics.widthRatio(3.5),
    marginLeft: Metrics.widthRatio(16),
    marginVertical: Metrics.heightRatio(7),
  },
  itemContainer: {
    marginRight: Metrics.widthRatio(3.5),
    marginLeft: Metrics.widthRatio(3.5),
    marginVertical: Metrics.heightRatio(7),
  },
  itemImage: {
    width: Metrics.screenWidth - 32,
    height: Metrics.heightRatio(150),
    borderRadius: 7,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
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
  itemText: {
    marginHorizontal: 10,
    // marginTop: Metrics.heightRatio(14),
    ...Fonts.Semibold(13),
    lineHeight: 15,
    letterSpacing: 0.64,
    color: Colors.white,
    lineHeight: Metrics.heightRatio(17),
    alignSelf: "flex-start",
    paddingBottom: Metrics.heightRatio(17),
    position: "absolute",
    bottom: 0,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
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
