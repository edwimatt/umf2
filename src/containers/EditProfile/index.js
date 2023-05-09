// predefined functions
import React, { useRef, useContext, useState, useEffect } from "react";
// predefined components
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
// styles sheet
import styles from "./styles";
// components
import { AppHeader, BaseContainer } from "../../components";
// reusable components
import {
  AppButton,
  FormHandler,
  MaterialTextField,
  ButtonView,
  ImageHandler,
  InputTextField,
  FlashMessage,
  Label,
} from "../../reuseableComponents";
// theme
import {
  DefaultTheme,
  Images,
  Metrics,
  Strings,
  Fonts,
  Colors,
} from "../../theme";
// navigation service
import { navigate, pop } from "../../services/NavigationService";
// utility
import utility from "../../utility";
// constants
import constant from "../../constants";
import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/Constants";
// libraries
import ImagePicker from "react-native-image-crop-picker";
// request
import { request } from "../../actions/ServiceAction";
// redux
import { connect } from "react-redux";
// reducer
import { USER } from "../../actions/ActionTypes";
import { useTranslation } from "react-i18next";

function EditProfile(props) {
  const { request, user } = props;
  const formHandler = useRef(null);
  // states initialize
  const [image, setimage] = useState("");
  const [isValueSet, setisValueSet] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    _showProfileData();
  }, []);

  function _showProfileData() {
    const { user } = props;
    const { image_url, name, mobile_no, email } = user;

    setimage(image_url);
    setName(name);
    setPhoneNumber(mobile_no);
    setEmail(email);
  }

  function _changeImage() {
    ImagePicker.openPicker({
      compressImageMaxWidth: 1024,
      compressImageMaxHeight: 1024,
      compressImageQuality: 0.8,
      mediaType: "photo",
      multiple: false,
    }).then((image) => {
      setimage(image.path);
      setisValueSet(1);
    });
  }
  function getUriType(uri) {
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];
    return fileType;
  }

  function _onUpdateProfile() {
    const payload = formHandler.current.onSubmitForm();
    if (payload) {
      _onUpdateProfileApiRequest(payload);
    }
  }
  function _onUpdateProfileApiRequest(payload) {
    let formData = new FormData();

    if (image != "") {
      formData.append("image_url", {
        uri: image,
        name: `image.${getUriType(image)}`,
        type: `image/${getUriType(image)}`,
      });
    }
    formData.append("user_id", user.id);
    formData.append("email", payload.email);
    formData.append("name", payload.name);
    formData.append("mobile_no", payload.phoneNumber);

    request(
      constant.updateProfile,
      "POST",
      formData,
      USER,
      true,
      cbSuccess,
      cbFailure
    );
  }

  function cbSuccess(response, message) {
    FlashMessage({ message: message, type: "success" });
    pop();
  }
  function cbFailure(error) {}

  return (
    <BaseContainer>
      <AppHeader
        isBack={true}
        backOnPress={() => pop()}
        centerTitle={t("common:editProfile")}
        style={{ backgroundColor: Colors.white }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <ButtonView onPress={_changeImage} style={styles.btnUserImg}>
            <ImageHandler
              resizeMode={"cover"}
              style={styles.userImg}
              source={
                image
                  ? {
                      uri: image,
                    }
                  : Images.icAvatar
              }
              defaultSource={Images.icAvatar}
            />
          </ButtonView>
          <FormHandler ref={formHandler}>
            <InputTextField
              placeholder={t("common:name")}
              error={t("common:validationName")}
              type={INPUT_TYPES.TEXT}
              identifier="name"
              value={name}
              style={styles.inputField}
              title={t("common:name")}
            />

            <InputTextField
              editable={false}
              placeholder={Strings.PLACEHOLDER.emailAddress}
              error={Strings.ERROR.please_enter_valid_email}
              type={INPUT_TYPES.EMAIL}
              identifier="email"
              value={email}
              style={[styles.inputField, styles.textInput2]}
              title={t("common:emailAddress")}
            />

            <InputTextField
              placeholder={t("common:phoneNumber")}
              error={t("common:validationPhone")}
              type={INPUT_TYPES.NUMBER}
              identifier="phoneNumber"
              value={phoneNumber}
              style={styles.inputField}
              title={t("common:phoneNumber")}
            />
          </FormHandler>

          <ButtonView onPress={() => _onUpdateProfile()} style={styles.btnSave}>
            <Text style={styles.textSave}>{t("common:save")}</Text>
          </ButtonView>
        </View>
      </ScrollView>
    </BaseContainer>
  );
}
const actions = { request };
const mapStateToProps = ({ user }) => {
  return {
    user: user.data,
  };
};
export default connect(mapStateToProps, actions)(EditProfile);
