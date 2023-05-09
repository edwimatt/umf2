import { StyleSheet } from "react-native";
import { Fonts, Strings, Colors, AppStyles, Metrics } from '../../theme';

export default StyleSheet.create({
  profileImg: {
    width: Metrics.heightRatio(52),
    height: Metrics.heightRatio(52),
    borderRadius: Metrics.heightRatio(52) / 2,
    marginRight: Metrics.baseMargin / 2
  },
  cellContainer: {
    height: 90,
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'row',
    padding: Metrics.baseMargin,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white
  },
  txtName: {
    ...Fonts.Semibold(Fonts.Size.xxSmall),
   color: Colors.mirage,
    marginBottom: Metrics.baseMargin / 2
  },
  txtTagLine: {
    ...Fonts.Regular(Fonts.Size.xxSmall),
    color:Colors.mirage,
    marginRight: Metrics.heightRatio(120)
  },
  icNotification: {
    width: 11,
    height: 11,
    backgroundColor: Colors.lightGreen,
    borderWidth: 1,
    borderColor: Colors.lightGreen,
    borderRadius: 11 / 2,
    position: 'absolute',
    right: Metrics.doubleBaseMargin,
    top: Metrics.doubleBaseMargin
  }
})  