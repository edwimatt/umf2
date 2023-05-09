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
  CardWrapper,
  CourseHeader,
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
// loadash
import _ from "lodash";
import { useTranslation } from "react-i18next";

const { colors } = DefaultTheme;

const Search = (props) => {
  const { request, user } = props;
  const { t, i18n } = useTranslation();

  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  function handleText(text) {
    if (text !== "") {
      _getCourseSearchApiRequest(text);
    }
  }

  function clearSearch() {
    setData([]);
  }

  function _getCourseSearchApiRequest(search_keyword) {
    let params = {
      user_id: user.id,
      search_keyword: search_keyword,
    };
    request(
      constants.getSearchCourse,
      "get",
      params,
      undefined,
      false,
      cbSuccess,
      cbFailure
    );
  }

  function cbSuccess(response, message) {
    setData(response);
  }

  function cbFailure(error) {}

  return (
    <BaseContainer>
      <AppHeader
        isBack={true}
        backOnPress={() => pop()}
        label={t("common:search")}
        searchCourse={true}
        style={{ backgroundColor: Colors.white }}
        getText={_.debounce(handleText, 500)}
        cbClearSearch={clearSearch}
      />

      <CardWrapper
        iconPause={true}
        desc={true}
        viewMore={true}
        viewMoreText={Strings.LABEL.viewMore}
        item={data}
        courseSearch={true}
        category={"mytrainings"}
      />
    </BaseContainer>
  );
};
const actions = { request };
const mapStateToProps = ({ user }) => {
  return {
    user: user.data,
  };
};
export default connect(mapStateToProps, actions)(Search);
