import { StyleSheet } from "react-native";
import { DefaultTheme, Fonts, Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  scrollviewContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContainer: {
    flex: 1,
  },
  logo: {
    alignSelf: "center",
    marginTop: Metrics.heightRatio(100),
    width: Metrics.heightRatio(110),
    height: Metrics.heightRatio(110),
  },
  txtSignYourAccount: {
    textAlign: "left",
    marginTop: Metrics.heightRatio(69.1),
    marginLeft: Metrics.heightRatio(16),
    ...Fonts.Regular(22),
    lineHeight: 25,
    letterSpacing: 0.64,
    color: Colors.black,
  },
  containerLanguage: {
    width: "100%",
    flexDirection: "row",
    marginHorizontal: 15,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  itemImage: {
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
  },
  itemText: {
    ...Fonts.Regular(17),
    lineHeight: 20,
    letterSpacing: 0.64,
    marginLeft: 15,
  },
  itemActiveText: {
    ...Fonts.Regular(17),
    lineHeight: 20,
    letterSpacing: 0.64,
    color: Colors.lightGreen,
    marginLeft: 15,
  },
  containerList: { marginTop: Metrics.heightRatio(40) },
  continue_Btn: {
    height: 42,
    marginTop: Metrics.heightRatio(135),
    backgroundColor: Colors.lightGreen,
    marginLeft: Metrics.heightRatio(20),
    marginRight: Metrics.heightRatio(20),
    borderRadius: Metrics.heightRatio(6),
  },
  txt_continue_Btn: {
    ...Fonts.Light(17),
    lineHeight: 20,
    letterSpacing: 0.64,
    color: Colors.white,
    fontWeight: "400",
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
});
