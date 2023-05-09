// predefined functions
import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
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
import { navigate } from "../../services/NavigationService";
// components
import {
  AppHeader,
  BaseContainer,
  CourseHeader,
  CardWrapper,
} from "../../components";
// reusable components
import {
  ButtonView,
  ImageHandler,
  FlashMessage,
} from "../../reuseableComponents";
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
// constants
import constant from "../../constants";
// contexts
import { LoginContext } from "../../contexts";
// request
import { request } from "../../actions/ServiceAction";
// redux
import { connect } from "react-redux";
// persistor
import { persistor } from "../../store";
import { useTranslation } from "react-i18next";

const { colors } = DefaultTheme;

const Profile = (props) => {
  const { user, request } = props;
  const {
    id,
    hospital_id,
    hospital_address,
    image_url,
    name,
    mobile_no,
    email,
  } = user;
  const { setLogin } = useContext(LoginContext);
  const { t, i18n } = useTranslation();

  useEffect(() => {}, []);

  function openScreen(name) {
    navigate("ProfileStack", { screen: name });
  }

  function _logOutApiRequest() {
    let formData = new FormData();

    formData.append("user_id", id);

    request(
      constant.logout,
      "POST",
      formData,
      undefined,
      true,
      cbSuccess,
      cbFailure
    );
  }

  function cbSuccess(response, message) {
    setTimeout(() => {
      FlashMessage({ message: message, type: "success" });
      setLogin(false);
      persistor.purge();
    }, 500);
  }
  function cbFailure(error) {}

  return (
    <BaseContainer>
      <AppHeader
        isAvatar={true}
        editProfile={t("common:editProfile")}
        edit={true}
        editonPress={() => openScreen("EditProfile")}
        chatonPress={() =>
          navigate("HomeStack", {
            screen: "ChatScreen",
            params: { otherUser: { id: user.owner_user_id } },
          })
        }
        chats={true}
        style={{ backgroundColor: Colors.baseColor }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headingText}>{t("common:profile")}</Text>

        <View style={styles.mainContainer}>
          <View style={styles.userDetailsContainer}>
            <View style={styles.userDetails}>
              <View style={styles.userDetailsSubContainer}>
                <View style={styles.userDetailsSubContainer2}>
                  <Image
                    resizeMode="contain"
                    style={styles.icons}
                    source={Images.icUserid}
                  />
                  <Text numberOfLines={1} style={styles.userDetailsText}>
                    {hospital_id ? hospital_id : t("common:notAvailable")}
                  </Text>
                </View>

                <View style={styles.userDetailsSubContainer2}>
                  <Image
                    resizeMode="contain"
                    style={styles.icons}
                    source={Images.icPhone}
                  />
                  <Text numberOfLines={1} style={styles.userDetailsText}>
                    {mobile_no ? mobile_no : t("common:notAvailable")}
                  </Text>
                </View>
              </View>

              <View style={styles.userDetailsSubContainer3}>
                <Image
                  resizeMode="contain"
                  style={styles.icons}
                  source={Images.icEmail}
                />
                <Text numberOfLines={1} style={styles.userDetailsText}>
                  {email ? email : t("common:notAvailable")}
                </Text>
              </View>

              <View style={styles.userDetailsSubContainer3}>
                <Image
                  resizeMode="contain"
                  style={styles.icons}
                  source={Images.icAddress}
                />
                <Text numberOfLines={2} style={styles.userDetailsAddressText}>
                  {hospital_address
                    ? hospital_address
                    : t("common:notAvailable")}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.imgContainer}>
            <ImageHandler
              resizeMode={"cover"}
              style={styles.userImg}
              source={
                image_url
                  ? {
                      uri: image_url,
                    }
                  : Images.icAvatar
              }
              defaultSource={Images.icAvatar}
            />
            <Text style={styles.userText}>{name}</Text>
          </View>

          <View style={styles.optionsContainer}>
            <ButtonView
              onPress={() => openScreen("MyCertificates")}
              style={styles.optionsBtn}
            >
              <View style={styles.optImgcontainer}>
                <Image resizeMode="contain" source={Images.icCertificate} />
              </View>
              <Text style={styles.optText}>{t("common:myCertificates")}</Text>
            </ButtonView>

            <ButtonView
              onPress={() => openScreen("PrivacyPolicy")}
              style={styles.optionsBtn}
            >
              <View style={styles.optImgcontainer}>
                <Image resizeMode="contain" source={Images.icAboutApp} />
              </View>
              <Text style={styles.optText}>{t("common:privacyPolicy")}</Text>
            </ButtonView>

            <ButtonView
              onPress={() => openScreen("TermsConditions")}
              style={styles.optionsBtn}
            >
              <View style={styles.optImgcontainer}>
                <Image resizeMode="contain" source={Images.icTerms} />
              </View>
              <Text style={styles.optText}>{t("common:termsConditions")}</Text>
            </ButtonView>

            <ButtonView
              onPress={() => openScreen("FAQs")}
              style={styles.optionsBtn}
            >
              <View style={styles.optImgcontainer}>
                <Image resizeMode="contain" source={Images.icFaq} />
              </View>
              <Text style={styles.optText}>{t("common:helpFAQ")}</Text>
            </ButtonView>

            <ButtonView
              style={styles.optionsBtn}
              onPress={() => openScreen("SetLanguage")}
            >
              <View style={styles.optImgcontainer}>
                <Image resizeMode="contain" source={Images.icLanguage} />
              </View>
              <Text style={styles.optText}>{t("common:language")}</Text>
            </ButtonView>

            <ButtonView
              style={styles.optionsBtn}
              onPress={() => openScreen("ChangePassword")}
            >
              <View style={styles.optImgcontainer}>
                <Image resizeMode="contain" source={Images.icChangepassword} />
              </View>
              <Text style={styles.optText}>{t("common:changePassword")}</Text>
            </ButtonView>

            <ButtonView
              style={styles.optionsBtn}
              onPress={() => openScreen("NotificationSettings")}
            >
              <View style={styles.optImgcontainer}>
                <Image resizeMode="contain" source={Images.icNotification} />
              </View>
              <Text style={styles.optText}>{t("common:notification")}</Text>
            </ButtonView>
          </View>

          <View style={styles.logoutBtnContainer}>
            <ButtonView
              onPress={() => _logOutApiRequest()}
              style={styles.logoutBtn}
            >
              <View style={styles.optImgcontainer}>
                <Image resizeMode="contain" source={Images.icLogout} />
              </View>
              <Text style={styles.optText}>{t("common:logout")}</Text>
            </ButtonView>
          </View>
        </View>
      </ScrollView>
    </BaseContainer>
  );
};
const actions = { request };
const mapStateToProps = ({ user }) => {
  return {
    user: user.data,
  };
};
export default connect(mapStateToProps, actions)(Profile);
