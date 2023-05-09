import { StyleSheet } from "react-native";
import { Fonts, Strings, Colors, AppStyles, Metrics } from '../../theme';

export default StyleSheet.create({
  toolbarContainerStyle: {
    overflow: 'hidden',
    borderTopWidth: 0,
    borderTopColor: '#333',
    marginHorizontal: Metrics.baseMargin,
    borderRadius: 12,
    minHeight: 44,
    marginBottom: Metrics.baseMargin
  },
  toolbarContainerStyleFocused: {
    borderTopWidth: 0,
    minHeight: 44,
  },
  maintoolbarContainerStyle:{
    flexDirection: 'row',
    width: Metrics.screenWidth,
    height:94,
    backgroundColor:Colors.grey,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:5,
  },
  subtoolbarContainerStyle:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
  },
  mainInputfieldContainer:{
    flexDirection: 'row',
    borderRadius:100,
    backgroundColor:Colors.white,
    justifyContent:'space-between',
    alignItems:'center',
  },
  btnSend:{ 
    width:42,
    height:42,
    borderRadius:42/2,
    marginTop:5,
    marginBottom:5,
    marginLeft:10,
    padding:3,
    backgroundColor:Colors.lightGreen,
    alignItems:'center',
   justifyContent:'center'},

   btnAttach:{
    width:40,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
   }
})  