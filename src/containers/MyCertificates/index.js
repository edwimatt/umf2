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
import {
  AppHeader,
  BaseContainer,
  CourseHeader,
  CardWrapper,
} from "../../components";
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
// request
import { request } from "../../actions/ServiceAction";
// redux
import { connect } from "react-redux";
// reducer
import { CERTIFICATES } from "../../actions/ActionTypes";
import { useTranslation } from "react-i18next";

const { colors } = DefaultTheme;

const MyCertificates = (props) => {
  const { certificates, user, request } = props;
  const { data, meta, isFetching } = certificates;
  const { id } = user;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    _getCertificatesApiRequest();
  }, []);

  function _getCertificatesApiRequest(isConcat = false, page = 1) {
    let params = {
      user_id: id,
    };

    request(
      constants.getCertificates,
      "get",
      params,
      CERTIFICATES,
      false,
      cbSuccess,
      cbFailure,
      CERTIFICATES.BASE,
      isConcat
    );
  }

  function cbSuccess(response, message) {}
  function cbFailure(error) {}

  return (
    <BaseContainer>
      <AppHeader
        isBack={true}
        backOnPress={() => pop()}
        centerTitle={t("common:myCertificates")}
        style={{ backgroundColor: Colors.white }}
      />
      <CardWrapper
        score={true}
        item={data}
        meta={meta}
        disableClick={true}
        isFetching={isFetching}
        fetchRequest={() => _getCertificatesApiRequest()}
        category={"certificates"}
      />
    </BaseContainer>
  );
};
const actions = { request };
const mapStateToProps = (state) => {
  return {
    certificates: state.certificatesReducer,
    user: state.user.data,
  };
};
export default connect(mapStateToProps, actions)(MyCertificates);
