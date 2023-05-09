// predefined functions
import React, { useCallback, useRef, useState, useEffect } from "react";
// predefined components
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// constants
import constants from "../../constants";
// navigation service
import { navigate, pop } from "../../services/NavigationService";
// components
import { AppHeader, BaseContainer, CourseHeader } from "../../components";
// theme
import {
  Colors,
  Metrics,
  Fonts,
  AppStyles,
  DefaultTheme,
  Images,
  Strings,
} from "../../theme";
// styles
import styles from "./styles";
// library
import { GiftedChat, Bubble, Time,InputToolbar} from 'react-native-gifted-chat';

const { colors } = DefaultTheme;

const SupportChat = (props) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello Alex, its Jassica',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const customtInputToolbar = props => {
    return (
      <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor:Colors.white,
        borderRadius:100,
      }}
    />
    );
  };

  function renderSend(props) {
    return (
      <TouchableOpacity 
      style={styles.btnSend} 
      onPress={() => props.onSend({text: props.text})}
      >
      <Image resizeMode='cover'  
      style={styles.iconSend}  
      source={Images.icSend}/>
      </TouchableOpacity>
    );
  }

  return (
    <BaseContainer>
      <AppHeader
        isBack={true}
        backOnPress={() => pop()}
        centerTitle={Strings.TITLES.support_chat}
        style={{ backgroundColor: Colors.white }}
      />
      <GiftedChat
      messages={messages}
      renderSend={renderSend}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={props => {
        return (
          <Bubble
            {...props}
  
            textStyle={{
              right: {
                ...Fonts.Regular(14),
                color:Colors.white,
              },
              left: {
                ...Fonts.Regular(14),
                color:Colors.white,
              },
            }}
            wrapperStyle={{
              left: {
                backgroundColor:Colors.lightGreen,
                borderTopLeftRadius:0,
                borderBottomLeftRadius:6,
                borderTopRightRadius:20,
                borderBottomRightRadius:6,
                paddingVertical:10,
                
              },
              right: {
                backgroundColor:Colors.valhalla,
                borderTopLeftRadius:20,
                borderBottomLeftRadius:6,
                borderTopRightRadius:0,
                borderBottomRightRadius:6,
                paddingVertical:10,
              },
            }}
          />
        );
      }}
      renderInputToolbar={props => customtInputToolbar(props)}
      renderAvatar={() => null}
      renderTime={() => null}
    />
    </BaseContainer>
  );
};

export default SupportChat;
