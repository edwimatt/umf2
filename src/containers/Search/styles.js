import { StyleSheet } from "react-native";

import { DefaultTheme, Fonts, Metrics, Colors } from "../../theme";

const { colors } = DefaultTheme;

export default StyleSheet.create({
  textResult: {
    ...Fonts.Regular(12),
    color: Colors.paleGray,
    marginTop: Metrics.heightRatio(15),
    marginHorizontal: 15,
    lineHeight: 16,
    marginBottom: 10,
  },
});
