import { StyleSheet } from "react-native";

import { DefaultTheme, Fonts, Metrics, Colors } from "../../theme";

const { colors } = DefaultTheme;

export default StyleSheet.create({
  contentText: {
    ...Fonts.Regular(12),
    color: Colors.valhalla,
    marginTop: Metrics.heightRatio(30),
    marginHorizontal: 15,
    lineHeight: 16,
    marginBottom: 10,
  },
  btnSend:{
    width:37,
    height:37,
    borderRadius:37/2,
    marginTop:5,
    marginBottom:5,
    marginLeft:3,
    marginRight:10,
    padding:3,
    backgroundColor:Colors.lightGreen,
    alignItems:'center',
    justifyContent:'center',
  },
  iconSend:{
    width:20,
    height:20,
  }
});
