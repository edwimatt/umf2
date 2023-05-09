import { StyleSheet } from "react-native";
import { DefaultTheme, Fonts, Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  inputField: {
    marginHorizontal: Metrics.widthRatio(17),
    marginTop: Metrics.heightRatio(7),
  },
  fieldText: {
    ...Fonts.Regular(14),
    color: Colors.slateGray,
    lineHeight: 14,
    marginTop: 35,
    marginHorizontal: Metrics.widthRatio(17),
  },
  btnSave: {
    height: 35,
    width: 109,
    marginTop: Metrics.heightRatio(140),
    marginBottom: 10,
    backgroundColor: Colors.lightGreen,
    borderRadius: Metrics.heightRatio(6),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textSave: {
    ...Fonts.Light(17),
    lineHeight: 20,
    letterSpacing: 0.64,
    color: Colors.white,
    fontWeight: "400",
  },
});
