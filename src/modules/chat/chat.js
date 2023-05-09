import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  Image,
  Platform,
  Keyboard,
  TextInput,
  SafeAreaView,
} from "react-native";
import styles from "./styles";
import KeyboardManager from "react-native-keyboard-manager";
import { GiftedChat, Bubble, Time } from "react-native-gifted-chat";
import { ButtonView, ImageHandler, Loader } from "../../reuseableComponents";
import { selectSingleImage } from "../../services/MultipickerUtils";
import Utils from "../../utility";
import { pop, push } from "../../services/NavigationService";
import { AppHeader, BaseContainer } from "../../components";
import {
  Fonts,
  Colors,
  AppStyles,
  Images,
  Metrics,
  DefaultTheme,
  Strings,
} from "../../theme";

// redux imports
import { useSelector } from "react-redux";

// socket chat imports
import {
  sendMessage,
  emitGetChatRoomId,
  emitLoadChatHistory,
  emitLeaveRoom,
  removeChatListeners,
  chatListeners,
} from "./chatSocketHandler";
import { modalInToGiftedChatObjects, uploadImage } from "./chatHelper";
import { useTranslation } from "react-i18next";

const ChatScreen = ({ route, navigation }) => {
  const inputRef = useRef();
  const { t, i18n } = useTranslation();
  const { otherUser } = route.params;
  const [state, setState] = useState({
    chatRoomId: 0,
    messages: [],
    isLoadEarlier: false,
    isLoadingEarlier: false,
    isFetching: true,
  });
  const user = useSelector(({ user }) => user.data);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      // title: otherUser.name,
      title: "Support Chat",
    });
  }, [navigation]);

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(false);
      KeyboardManager.setEnableAutoToolbar(false);
    }

    chatListeners(onNewMessageReceived);

    emitGetChatRoomId(
      {
        user_id: user.id,
        target_id: otherUser.id,
        is_anonymous: 0,
        created_by: user.id,
      },
      onChatRoomIdReceived
    );

    return () => {
      if (Platform.OS === "ios") {
        KeyboardManager.setEnable(true);
        KeyboardManager.setEnableAutoToolbar(true);
        KeyboardManager.setShouldResignOnTouchOutside(false);
      }

      removeChatListeners();
    };
  }, []);

  const onChatRoomIdReceived = (data) => {
    setState((prevState) => ({ ...prevState, chatRoomId: data.chat_room_id }));
    const payload = {
      user_id: user.id,
      chat_room_id: data.chat_room_id,
      is_anonymous: 0,
    };
    emitLoadChatHistory(payload, onChatHistoryReceived);
  };

  const onChatHistoryReceived = (messages, isConcat = false) => {
    setState((prevState) => ({
      ...prevState,
      isLoadEarlier:
        messages.length && messages.length % 20 == 0 ? true : false,
      isLoadingEarlier: false,
      isFetching: false,
      messages: isConcat
        ? [...prevState.messages, ...modalInToGiftedChatObjects(messages)]
        : modalInToGiftedChatObjects(messages),
    }));
  };

  const onNewMessageReceived = (data) => {
    const { chat_room_id } = data;
    const { chatRoomId } = state;

    if (chat_room_id == chatRoomId) {
      setState((prevState) => ({
        ...prevState,
        messages: [
          ...modalInToGiftedChatObjects([data]),
          ...prevState.messages,
        ],
      }));
    } else {
      if (chatRoomId == 0) {
        setState((prevState) => ({
          ...prevState,
          messages: [
            ...modalInToGiftedChatObjects([data]),
            ...prevState.messages,
          ],
          chatRoomId: chat_room_id,
        }));
      }
    }
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
    };
  }, []);

  const _keyboardDidHide = () => {
    if (!Utils.isPlatformAndroid()) {
      setKeyboardHeight(0);
    }
  };

  const _keyboardDidShow = ({ endCoordinates }) => {
    if (!Utils.isPlatformAndroid()) {
      setKeyboardHeight(
        Utils.isNotchedDevice
          ? endCoordinates.height - Metrics.widthRatio(34)
          : endCoordinates.height
      );
    }
  };

  onLoadEarlier = () => {
    setState((prevState) => ({ ...prevState, isLoadingEarlier: true }));
    const { messages, chatRoomId } = state;
    const payload = {
      user_id: user.id,
      chat_room_id: chatRoomId,
      is_anonymous: 0,
      last_record_id: messages[messages.length - 1]._id,
    };
    emitLoadChatHistory(payload, (messages) =>
      onChatHistoryReceived(messages, true)
    );
  };

  const onSend = (messages = []) => {
    const message = inputRef.current.getValue();

    if (message.length) {
      const payload = {
        user_id: user.id,
        target_id: otherUser.id,
        group_type: "single",
        chat_room_id: state.chatRoomId,
        message,
        message_type: "text",
        is_anonymous: 0,
        created_by: user.id,
      };

      sendMessage(payload);
      inputRef.current.setText("");
    }
  };

  const onPickImage = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      selectSingleImage()
        .then((res) =>
          uploadImage(res.path)
            .then((data) => {
              sendMessage({
                user_id: user.id,
                target_id: otherUser.id,
                group_type: "single",
                chat_room_id: state.chatRoomId,
                message: "",
                message_type: "image",
                is_anonymous: 0,
                file_url: data.response.file_url,
                created_by: user.id,
              });
            })
            .catch((err) => console.log("err : ", err))
        )
        .catch((err) => console.log("err : ", err));
    }, 400);
  };

  const renderInputToolbar = (props) => {
    return (
      <View style={styles.maintoolbarContainerStyle}>
        <View style={styles.maintoolbarContainerStyle}>
          <View style={styles.mainInputfieldContainer}>
            <Input ref={inputRef} />
            <ButtonView style={styles.btnAttach} onPress={onPickImage}>
              <Image source={Images.icAttach} resizeMode={"center"} />
            </ButtonView>
          </View>
          <ButtonView style={styles.btnSend} onPress={onSend}>
            <Image source={Images.icSend} resizeMode={"center"} />
          </ButtonView>
        </View>
      </View>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            ...Fonts.Regular(14),
            color: Colors.white,
          },
          right: {
            ...Fonts.Regular(14),
            color: Colors.white,
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: Colors.lightGreen,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 6,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 6,
            paddingVertical: 10,
          },
          right: {
            backgroundColor: Colors.valhalla,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 6,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 6,
            paddingVertical: 10,
          },
        }}
      />
    );
  };

  const renderTime = (props) => {
    return (
      <Time
        {...props}
        textStyle={{
          right: {
            color: Colors.white,
          },
          left: {
            color: Colors.white,
          },
        }}
      />
    );
  };

  const onPressImage = (url) => () => {
    Utils.getImageViewerRef().setImagesArray([{ url }]);
    Utils.getImageViewerRef().show();
  };

  const renderMessageImage = ({ currentMessage }) => {
    return (
      <ButtonView onPress={onPressImage(currentMessage.image)}>
        <ImageHandler
          source={{ uri: currentMessage.image }}
          style={{ width: 160, height: 160, margin: 4, borderRadius: 12 }}
        />
      </ButtonView>
    );
  };

  console.log("keyboard height : ", keyboardHeight);

  return !state.isFetching ? (
    <BaseContainer style={{ paddingBottom: keyboardHeight }}>
      <AppHeader
        isBack={true}
        backOnPress={() => pop()}
        centerTitle={t("common:supportChat")}
        style={{ backgroundColor: Colors.white }}
      />
      <View style={{ flex: 1 }}>
        {/* <View style={{height: Metrics.heightRatio(44)}} />*/}
        <GiftedChat
          minInputToolbarHeight={0}
          messagesContainerStyle={{
            marginBottom: keyboardHeight,
          }}
          renderBubble={renderBubble}
          textInputStyle={{
            paddingTop: 8,
            ...Fonts.Regular(Fonts.Size.xSmall, Colors.mirage),
          }}
          renderInputToolbar={() => undefined}
          renderMessageImage={renderMessageImage}
          messages={state.messages}
          user={{
            _id: user.id,
          }}
          isKeyboardInternallyHandled={false}
          loadEarlier={state.isLoadEarlier}
          onLoadEarlier={onLoadEarlier}
          isLoadingEarlier={state.isLoadingEarlier}
          renderTime={renderTime}
          renderAvatar={() => null}
        />
        {renderInputToolbar()}
      </View>
    </BaseContainer>
  ) : (
    <View style={{ flex: 1, ...AppStyles.centerAligned }}>
      <Loader />
    </View>
  );
};

export default ChatScreen;

const Input = forwardRef((props, ref) => {
  const [val, setVal] = useState("");
  const { t, i18n } = useTranslation();

  useImperativeHandle(ref, () => ({
    setText: (txt) => setVal(txt),
    getValue: () => val,
  }));

  return (
    <TextInput
      placeholderTextColor={Colors.mirage}
      placeholder={t("common:typeMessage")}
      style={{
        flex: 0.8,
        paddingLeft: 10,
        paddingBottom: Utils.isPlatformAndroid()
          ? Metrics.widthRatio(10)
          : Metrics.widthRatio(4),
        maxHeight: Metrics.widthRatio(100),
      }}
      multiline
      value={val}
      onChangeText={(txt) => setVal(txt)}
    />
  );
});
