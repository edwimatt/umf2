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
  input_email: {
    marginTop: Metrics.heightRatio(85),
    marginHorizontal: Metrics.widthRatio(20),
  },
  txt_input_fields: {
    ...Fonts.Regular(15),
    lineHeight: 18,
    letterSpacing: 0.64,
    color: Colors.black,
    borderTopWidth: 0,
  },
  input_password: {
    marginTop: Metrics.heightRatio(24.5),
    marginHorizontal: Metrics.widthRatio(20),
  },
  txt_forgot_pass: {
    textAlign: "right",
    marginTop: 13.5,
    marginRight: Metrics.heightRatio(20),
    ...Fonts.Regular(14),
    lineHeight: 17,
    letterSpacing: 0.64,
    color: Colors.grey,
  },
  login_Btn: {
    height: 42,
    marginTop: Metrics.doubleBaseMargin,
    backgroundColor: Colors.lightGreen,
    marginLeft: Metrics.heightRatio(20),
    marginRight: Metrics.heightRatio(20),
    borderRadius: Metrics.heightRatio(6),
  },
  txt_login_Btn: {
    ...Fonts.Light(17),
    lineHeight: 20,
    letterSpacing: 0.64,
    color: Colors.white,
    fontWeight: "400",
  },
  bottomSheetHeader: {
    width: "100%",
    height: Metrics.heightRatio(30),
    flexDirection: "row",
    alignItems: "center",
  },
  iconCross: {},
  txtForgotPass: {
    textAlign: "left",
    marginTop: 22,
    marginLeft: 15,
    ...Fonts.Regular(22),
    letterSpacing: 0.64,
    color: Colors.black,
  },
  txtEnteryourEmail: {
    textAlign: "left",
    marginTop: 24,
    letterSpacing: 0.64,
    marginHorizontal: 15,
    ...Fonts.Regular(17),
    color: Colors.grey,
  },
  input_forgotPassemail: {
    marginTop: Metrics.heightRatio(46),
    marginHorizontal: Metrics.widthRatio(15),
  },
});
