import {StyleSheet} from 'react-native';
import {DefaultTheme, Fonts, Metrics} from '../../theme';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  headingText: {
    ...Fonts.Semibold(30),
    color: Colors.valhalla,
    marginTop: Metrics.heightRatio(14),
    marginHorizontal: Metrics.widthRatio(16),
  },
});
