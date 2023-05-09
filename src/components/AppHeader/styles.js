import { StyleSheet, Platform } from "react-native";
import { color } from "react-native-reanimated";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";
import utility from "../../utility";

export default StyleSheet.create({
  container: {
    height: utility.isPlatformIOS()
      ? Metrics.NAVBAR_HEIGHT + Metrics.STATUSBAR_HEIGHT + 14
      : Metrics.NAVBAR_HEIGHT + Metrics.STATUSBAR_HEIGHT + 7,
    // height: Metrics.NAVBAR_HEIGHT + Metrics.STATUSBAR_HEIGHT + 18,
    justifyContent: "center",
    zIndex: 10,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: utility.isPlatformIOS() ? Metrics.STATUSBAR_HEIGHT : 0,
    paddingHorizontal: Metrics.smallMargin,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  txtTitle: {
    ...Fonts.Bold(26),
    marginLeft: Metrics.smallMargin,
    flex: 1,
  },
  centertxtTitle: {
    ...Fonts.Semibold(17),
    color: Colors.mirage,
    width: "80%",
    textAlign: "center",
    letterSpacing: 0,
  },
  avatar: {
    marginTop: Metrics.heightRatio(12),
    marginHorizontal: Metrics.smallMargin,
  },
  profileThumb: {
    marginHorizontal: 5,
    justifyContent: "flex-end",
  },
  inputContainer: {
    height: 35,
    borderRadius: 6,
    backgroundColor: Colors.baseColor,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 7,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  txtInput: {
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    flex: 1,
    ...Fonts.Regular(16),
    color: Colors.shuttleGray,
    flex: 1,
    textAlignVertical: "center",
  },
  txtSearch: {
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    height: "100%",
    color: Colors.black,
    ...Fonts.Regular(16),
    flex: 1,
    textAlignVertical: "center",
  },
  leftIcon: {
    width: Metrics.widthRatio(20),
    height: Metrics.heightRatio(25),
    marginLeft: 10,
    justifyContent: "center",
  },
  rightIcons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 2,
  },

  rightContainereditBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 25,
    marginTop: 10,
  },

  editBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 7,
  },
  editText: {
    ...Fonts.Regular(12),
    letterSpacing: 0.64,
  },
  inputField: {
    width: "80%",
    paddingTop: Platform.OS === "ios" ? 0 : 7,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: Colors.red,
    position: "absolute",
    right: 5,
    top: 6,
  },
});
