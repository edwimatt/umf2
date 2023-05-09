import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts, AppStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    height: Metrics.heightRatio(210),
    width: undefined,
    ...AppStyles.centerAligned
  },
  txtBg: {
    ...Fonts.Semibold(29),
    color: Colors.white,
    width: Metrics.widthRatio(220),
    textAlign: 'center',
    marginTop: Metrics.navBarHeight
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
    alignItems: 'center'
  },
  topQs: {
    ...Fonts.Semibold(21),
  },
  cellWrapper: {
    paddingHorizontal: Metrics.baseMargin,
    marginTop: Metrics.doubleBaseMargin
  },
  btnQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Metrics.baseMargin,
  },
  question: {
    ...Fonts.Regular(16),
    color: '#A2A1B5',
    marginRight: Metrics.smallMargin,
    flex: 1
  },
  answerContainer: {
    marginTop: Metrics.smallMargin,
    marginRight: Metrics.baseMargin,
  },
  answer: {
    ...Fonts.Regular(16),
  },
  content: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin
  },
  icon: {
    // marginRight: Metrics.doubleBaseMargin
  }
})  