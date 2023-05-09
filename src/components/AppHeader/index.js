// predefined functions
import React, { memo, useRef, useContext, useState, useEffect } from "react";
// predefined components
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
// styles
import styles from "./styles";
// theme
import {
  Colors,
  Images,
  Metrics,
  Strings,
  DefaultTheme,
  Fonts,
} from "../../theme";
// reuseable components
import {
  ImageButton,
  FormHandler,
  ButtonView,
  InputTextField,
} from "../../reuseableComponents";
import Avatar from "../Avatar";
// constants
import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/Constants";
// redux
import { connect } from "react-redux";

const { colors } = DefaultTheme;

const index = (props) => {
  const {
    isBack,
    backOnPress,
    input,
    label,
    searchCourse,
    getText,
    cbClearSearch,
    search,
    searchOnPress,
    chats,
    chatonPress,
    edit,
    editonPress,
    editProfile,
    isAvatar,
    AvatarOnPress,
    style,
    title,
    centerTitle,
    removeBack = false,
    headerStyle = {},
    user,
    messageCounter,
  } = props;

  const { image_url } = user;

  const { total_unread_count } = messageCounter;

  const [inputValue, setInputValue] = useState("");

  const handleChange = (text) => {
    setInputValue(text);
    getText(text);
  };

  const handleInput = (event) => {
    setInputValue(""), cbClearSearch();
  };

  return (
    <View style={[styles.container, { ...style }]}>
      <View style={[styles.headerContainer, { ...headerStyle }]}>
        {isBack ? (
          <ButtonView style={styles.leftIcon} onPress={backOnPress}>
            <Image resizeMode={"contain"} source={Images.icBack} />
          </ButtonView>
        ) : removeBack ? null : (
          <Avatar
            onPress={AvatarOnPress}
            source={image_url ? { uri: image_url } : Images.icAvatar}
            size={40}
            removeBorder
            style={styles.avatar}
          />
        )}

        {title && <Text style={styles.txtTitle}>{title}</Text>}

        {centerTitle && (
          <Text style={styles.centertxtTitle}>{centerTitle}</Text>
        )}

        {searchCourse && (
          <View style={[styles.inputContainer]}>
            <TextInput
              autoFocus={true}
              placeholder={label}
              placeholderTextColor={colors.slateGrey}
              style={styles.txtSearch}
              onChangeText={(text) => {
                handleChange(text);
              }}
              returnKeyType={"done"}
              multiline={false}
              value={inputValue}
            />
            <ImageButton onPress={handleInput} source={Images.icCross} />
          </View>
        )}

        {edit && (
          <View style={styles.rightContainereditBtn}>
            <TouchableOpacity onPress={editonPress} style={styles.editBtn}>
              <Text style={styles.editText}>{editProfile}</Text>
            </TouchableOpacity>
          </View>
        )}

        {search && (
          <View style={styles.rightIcons}>
            <ImageButton source={Images.icSearch} onPress={searchOnPress} />
          </View>
        )}

        {chats && (
          <View>
            <ImageButton source={Images.icChats} onPress={chatonPress} />
            {messageCounter.total_unread_count == 0.1 && (
              <View style={styles.dot} />
            )}
          </View>
        )}
      </View>
    </View>
  );
};
// const actions = {request};
const mapStateToProps = (state) => {
  return {
    messageCounter: state.messageCounterReducer.data,
    user: state.user.data,
  };
};
export default connect(mapStateToProps, {})(index);
