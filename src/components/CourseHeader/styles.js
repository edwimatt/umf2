import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";
import utility from "../../utility";

export default StyleSheet.create({
  container: {
    // height: Metrics.heightRatio(70),
    marginTop: 20,
    justifyContent: "center",
    zIndex: 10,
  },
  headerContainer: {
    paddingHorizontal: Metrics.smallMargin,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: Metrics.widthRatio(12),
  },
  subheaderContainer: {
    flexDirection: "row",
    // alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  textTitle: {
    ...Fonts.Semibold(16),
    color: Colors.valhalla,
    alignSelf: "flex-start",
    width: "80%",
    letterSpacing: 0.64,
  },
  textDesc: {
    ...Fonts.Regular(13),
    lineHeight: 15,
    letterSpacing: 0.64,
    color: Colors.nandor,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  textDesc2: {
    marginTop: 10,
    width: Metrics.screenWidth - 40,
    opacity: 0.99,
    minHeight: 100,
  },
  textSeeall: {
    ...Fonts.Regular(11),
    color: Colors.black,
    letterSpacing: 0.26,
  },
  btnViewAll: {
    paddingVertical: 5,
    width: 58,
    height: 30,
    backgroundColor: Colors.lightGreen,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: Metrics.widthRatio(7),
    // alignSelf: "flex-end",
  },
});
