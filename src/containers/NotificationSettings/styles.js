import { StyleSheet } from "react-native";

import { DefaultTheme, Fonts, Metrics, Colors } from "../../theme";

const { colors } = DefaultTheme;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.heightRatio(5),
  },
  listItem: {
    padding: 10,
    width: "100%",
    height: Metrics.heightRatio(80),
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  leftTextview: {
    flex: 1,
    textAlign: "left",
    marginLeft: Metrics.heightRatio(15),
  },
  leftText: {
    ...Fonts.Regular(14),
    lineHeight: 17,
    letterSpacing: 0.64,
  },
  rightIconView: {
    width: Metrics.heightRatio(36.4),
    height: Metrics.heightRatio(19),
    justifyContent: "center",
    alignItems: "center",
    marginRight: Metrics.heightRatio(18),
  },
  rightIcon: {
    width: Metrics.heightRatio(36.4),
    height: Metrics.heightRatio(19),
  },
  bottomline: {
    width: "100%",
    height: 0,
    opacity: 0.3,
    borderWidth: 0.5,
    borderColor: Colors.slateGray,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
});
