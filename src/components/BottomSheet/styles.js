import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  headerContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    // paddingHorizontal: Metrics.baseMargin,
  },
  txtTitle: {
    ...Fonts.Semibold(14),
    color: Colors.grayish,
    letterSpacing: 2,
    marginLeft: Metrics.baseMargin
  },
  btnCancel: {
    marginRight: Metrics.smallMargin,
  }
})  