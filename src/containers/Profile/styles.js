import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import { DefaultTheme, Fonts, Metrics } from "../../theme";
import Colors from "../../theme/Colors";

export default StyleSheet.create({
  headingText: {
    ...Fonts.Semibold(30),
    color: Colors.valhalla,
    marginTop: Metrics.heightRatio(14),
    marginHorizontal: Metrics.widthRatio(16),
  },
  mainContainer: {
    marginHorizontal: Metrics.widthRatio(15),
    marginTop: 35,
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: -40,
  },
  userImg: {
    width: 80,
    height: 80,
    borderRadius: 90 / 2,
  },
  userText: {
    lineHeight: 18,
    ...Fonts.Regular(20),
    letterSpacing: 0.64,
    color: Colors.valhalla,
    marginTop: 10,
  },
  userDetailsContainer: {
    height: 220,
    backgroundColor: Colors.white,
    borderRadius: 7,
  },
  userDetails: {
    justifyContent: "flex-start",
    marginTop: 80,
    marginHorizontal: 15,
  },
  userDetailsSubContainer: {
    flexDirection: "row",
    width: "100%",
  },
  userDetailsSubContainer2: {
    flex: 0.5,
    flexDirection: "row",
  },
  userDetailsSubContainer3: {
    flexDirection: "row",
    marginTop: 26,
  },
  icons: {
    width: 16,
    height: 16,
  },
  userDetailsText: {
    ...Fonts.Regular(14),
    letterSpacing: 0.64,
    lineHeight: 18,
    alignSelf: "flex-start",
    marginLeft: 7,
    color: Colors.paleGrey,
  },
  userDetailsAddressText: {
    ...Fonts.Regular(14),
    lineHeight: 18,
    letterSpacing: 0.64,
    lineHeight: 18,
    alignSelf: "flex-start",
    marginLeft: 7,
    width: Metrics.widthRatio(250),
    color: Colors.paleGrey,
  },
  optionsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 7,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  optionsBtn: {
    width: "100%",
    borderBottomColor: Colors.paleGrey,
    borderBottomWidth: 0.25,
    flexDirection: "row",
    paddingBottom: 10.5,
    paddingTop: 10.5,
    alignItems: "center",
  },
  optImgcontainer: {
    width: 40,
    height: 40,
    backgroundColor: Colors.valhalla,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  optText: {
    lineHeight: 18,
    ...Fonts.Regular(16),
    letterSpacing: 0.64,
    color: Colors.valhalla,
    marginLeft: 13,
  },
  logoutBtnContainer: {
    backgroundColor: Colors.white,
    borderRadius: 7,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  logoutBtn: {
    width: "100%",
    borderBottomColor: Colors.paleGrey,
    flexDirection: "row",
    paddingBottom: 4.5,
    paddingTop: 4.5,
    alignItems: "center",
  },
});
