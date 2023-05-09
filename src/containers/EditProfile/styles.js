import { StyleSheet } from "react-native";
import { DefaultTheme, Fonts, Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  inputField: {
    marginHorizontal: Metrics.widthRatio(17),
    marginTop: Metrics.heightRatio(7),
  },
  fieldText: {
    ...Fonts.Regular(14),
    color: Colors.slateGray,
    lineHeight: 14,
    marginTop: 25,
    marginHorizontal: Metrics.widthRatio(17),
  },
  btnSave: {
    height: 35,
    width: 109,
    marginTop: Metrics.heightRatio(100),
    marginBottom: 10,
    backgroundColor: Colors.lightGreen,
    borderRadius: Metrics.heightRatio(6),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textSave: {
    ...Fonts.Light(17),
    color: Colors.white,
    fontWeight: "400",
  },
  btnUserImg: {
    marginTop: Metrics.heightRatio(34),
    width: 80,
    height: 80,
    borderRadius: 90 / 2,
    alignSelf: "center",
  },
  userImg: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  textInput2: {
    flex: 1,
    color: "#000",
    backgroundColor: Colors.grey,
    borderColor: Colors.paleGrey,
    borderWidth: 1,
    borderRadius: 6,
    padding: Metrics.heightRatio(12),
    paddingHorizontal: Metrics.heightRatio(20),
    height: 42,
    ...Fonts.Regular(14),
  },
});
