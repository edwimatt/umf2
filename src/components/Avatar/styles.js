import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    ...AppStyles.centerAligned,
    backgroundColor: Colors.white,
    ...AppStyles.dropShadow
  },
})  