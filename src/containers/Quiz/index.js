// predefined functions
import React, { Component } from "react";
// predefined components
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// constants
import constant from "../../constants";
// navigation service
import { navigate, pop } from "../../services/NavigationService";
// components
import { AppHeader, BaseContainer, CourseHeader } from "../../components";
// reuseable components
import {
  ButtonView,
  ImageHandler,
  FlatListHandler,
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
// library
import * as Progress from "react-native-progress";
// request
import { request, generalSaveAction } from "../../actions/ServiceAction";
// redux
import { connect } from "react-redux";
// reducer
import { QUIZ, QUIZ_POST_DATA, CATEGORIES } from "../../actions/ActionTypes";
import _ from "lodash";

const { colors } = DefaultTheme;

let totalCount;

let arrayAnws = [];
let arrayQuests = [];

let selectAns = false;

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizEnd: false,
      currentQuest: 0,
      currentProg: 1,
      isFetch: true,
    };
  }

  componentDidMount() {
    this._getQuizByCourseIDApiRequest();
  }

  openScreen(name) {
    navigate("TabNav", {
      screen: name,
    });
  }

  renderQuiz(quiz_questions) {
    if (this.state.quizEnd == true) {
      const { quizPostData } = this.props;

      arrayAnws = [];
      arrayQuests = [];

      return <ScreenCongrats quizPostData={quizPostData} />;
    } else {
      return (
        <QuizScreen
          isMultiChoice={
            quiz_questions[this.state.currentQuest].is_multiple_choice_question
          }
          currentQuest={this.state.currentQuest}
          data={quiz_questions[this.state.currentQuest]}
        />
      );
    }
  }

  _getQuizByCourseIDApiRequest() {
    const { route } = this.props;
    const { params } = route;
    const { course_id, hospital_id, user_id } = params;

    let param = {
      course_id: course_id,
      user_id: user_id,
      hospital_id: hospital_id,
    };

    this.props.request(
      constant.getQuizByCourseID,
      "get",
      param,
      QUIZ,
      false,
      this.cbSuccess,
      this.cbFailure
    );
  }

  cbSuccess = (response, message) => {
    this.setState({ isFetch: false });
  };

  cbFailure(error) {}

  _onSubmitQuizAnswersApiRequest() {
    const { route, quizData } = this.props;
    const { params } = route;
    const { course_id, hospital_id, user_id } = params;

    let formdata = new FormData();
    formdata.append("user_id", user_id);
    formdata.append("course_quiz_id", quizData.course_quiz_id);

    for (let i = 0; i < arrayQuests.length; i++) {
      formdata.append("quiz_question_id[]", arrayQuests[i]);
      let temp_arr = arrayAnws[i];
      for (let j = 0; j < temp_arr.length; j++) {
        formdata.append("quiz_answer_id[][]", temp_arr[j]);
      }
    }

    this.props.request(
      constant.submitQuizAwnsers,
      "POST",
      formdata,
      QUIZ_POST_DATA,
      true,
      this.cbSubmitQuizAnswersApiSuccess,
      this.cbFailure
    );
  }

  cbSubmitQuizAnswersApiSuccess = (response, message) => {
    this.setState({ quizEnd: true });

    if (response.is_quiz_passed == 1) {
      this._couseCompleteApiRequest();
    }
  };

  _couseCompleteApiRequest() {
    const { route } = this.props;
    const { params } = route;
    const { course_id, hospital_id, user_id } = params;

    let formData = new FormData();

    formData.append("user_id", user_id);
    formData.append("course_id", course_id);
    formData.append("hospital_id", hospital_id);

    this.props.request(
      constant.courseCompleted,
      "POST",
      formData,
      CATEGORIES,
      false,
      this.cbCouseCompleteSuccess,
      this.cbFailure
    );
  }

  cbCouseCompleteSuccess = (response, message) => {
    this.props.generalSaveAction(CATEGORIES.SUCCESS, response);
  };

  cbFailure = (error) => {};

  onNext = () => {
    if (selectAns == true) {
      if (this.state.currentQuest === totalCount - 1) {
        selectAns = false;
        this._onSubmitQuizAnswersApiRequest();
      } else {
        selectAns = false;
        this.setState({
          currentQuest: this.state.currentQuest + 1,
          currentProg: this.state.currentProg + 1,
        });
      }
    } else {
      FlashMessage({
        message: Strings.ERROR.please_select_at_least_ans,
        type: "danger",
      });
    }
  };

  render() {
    const { quizData } = this.props;
    const { course_name, quiz_questions } = quizData;
    if (quiz_questions) {
      totalCount = Object.keys(quiz_questions).length;
    }

    return (
      <BaseContainer>
        <AppHeader
          isBack={true}
          backOnPress={() => pop()}
          centerTitle={Strings.TITLES.quiz}
          style={{ backgroundColor: Colors.white }}
        />
        {this.state.isFetch ? (
          <ActivityIndicator
            color={Colors.lightGreen}
            size="large"
            style={styles.activityIndicator}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <View style={styles.mainContainer}>
              {this.state.quizEnd == false && (
                <View style={styles.submainContainer}>
                  <Text style={styles.textTitle}>{course_name}</Text>
                  <Progress.Bar
                    color={Colors.lightGreen}
                    borderColor={Colors.grey}
                    height={4}
                    borderRadius={1}
                    width={Metrics.widthRatio(350)}
                    progress={
                      this.state.currentProg == 1
                        ? 0.1
                        : this.state.currentProg / totalCount
                    }
                  />
                  <Text style={styles.textPage}>
                    {this.state.currentQuest + 1 + "/" + totalCount}
                  </Text>
                </View>
              )}
              <View style={styles.SubContainer}>
                {quiz_questions && this.renderQuiz(quiz_questions)}
                {this.state.quizEnd ? (
                  <ButtonView
                    onPress={() => this.openScreen("HomeStack")}
                    style={styles.btnNext}
                  >
                    <Text style={styles.textNext}>
                      {Strings.LABEL.return_to_home}
                    </Text>
                  </ButtonView>
                ) : (
                  <ButtonView
                    onPress={() => this.onNext()}
                    style={styles.btnNext}
                  >
                    <Text style={styles.textNext}>{Strings.LABEL.next}</Text>
                  </ButtonView>
                )}
              </View>
            </View>
          </ScrollView>
        )}
      </BaseContainer>
    );
  }
}
const actions = { request, generalSaveAction };
const mapStateToProps = (state) => {
  return {
    quizData: state.quizReducer.data,
    quizPostData: state.quizPostDataReducer.data,
  };
};

export default connect(mapStateToProps, actions)(Quiz);

// Quiz Screen
class QuizScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer_id: 0,
    };
  }

  Item({ item }) {
    return (
      <TouchableOpacity
        onPress={() => this.onSelectAnswer(item.quiz_question_id, item.id)}
        style={[
          arrayAnws[this.props.currentQuest]?.includes(item.id)
            ? styles.selectedlistItem
            : styles.listItem,
        ]}
      >
        <Text
          style={[
            arrayAnws[this.props.currentQuest]?.includes(item.id)
              ? styles.leftSelectedText
              : styles.leftText,
          ]}
        >
          {item.answer_option_title}
        </Text>
        <Text
          style={[
            arrayAnws[this.props.currentQuest]?.includes(item.id)
              ? styles.leftSelectedAnsText
              : styles.leftAnsText,
          ]}
        >
          {item.answer_title}
        </Text>
      </TouchableOpacity>
    );
  }

  setOnAnswerId = (id) => {
    this.setState({ answer_id: id });
  };

  onSelectAnswer = (quest_id, ans_id) => {
    this.setOnAnswerId(ans_id);

    if (this.props.isMultiChoice === 1) {
      arrayQuests[this.props.currentQuest] = quest_id;

      if (arrayAnws[this.props.currentQuest]) {
        let temp_arr = _.cloneDeep(arrayAnws[this.props.currentQuest]);

        if (temp_arr.find((e) => e === ans_id)) {
          let index = temp_arr.findIndex((it) => it === ans_id);
          temp_arr.splice(index, 1);
        } else {
          temp_arr = _.concat(temp_arr, ans_id);
        }

        arrayAnws[this.props.currentQuest] = temp_arr;
      } else {
        arrayAnws[this.props.currentQuest] = [ans_id];
      }
    } else {
      arrayAnws[this.props.currentQuest] = [ans_id];
    }

    selectAns = true;
  };

  render() {
    const { data } = this.props;

    return (
      <View style={styles.FragmentContainer}>
        <Text style={styles.textQuestion}>
          {data.question_option_title + ": " + data.question_title}
        </Text>
        <View style={styles.optionsContainer}>
          <FlatListHandler
            bounces={false}
            data={data.quiz_answers}
            renderItem={(item, index) => this.Item(item)}
          />
        </View>
      </View>
    );
  }
}

// Congrats Screen
class ScreenCongrats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { quizPostData } = this.props;

    return (
      <View style={styles.FragmentContainer}>
        <Image
          resizeMode="contain"
          source={
            quizPostData.is_quiz_passed
              ? Images.icCongrats
              : Images.icQuizFailed
          }
          style={styles.imgCongrats}
        />
        <Text
          style={[
            quizPostData.is_quiz_passed
              ? styles.textCongrats
              : styles.textFailed,
          ]}
        >
          {quizPostData.is_quiz_passed ? "Congratulations" : "Quiz Failed"}
        </Text>
        <Text style={styles.textPassed}>
          {quizPostData.is_quiz_passed
            ? "You have passed your Quiz"
            : "You have failed your Quiz, please try again"}
        </Text>

        {quizPostData.is_quiz_passed == 1 && (
          <ImageHandler
            resizeMode="contain"
            source={{ uri: quizPostData.course_certificate_file }}
            style={styles.imgCertificate}
          />
        )}

        <Text style={styles.textItemTitle}>
          {quizPostData.course_name ? quizPostData.course_name : "Loading...."}
        </Text>

        <Text numberOfLines={6} style={styles.textItemDesc}>
          {quizPostData.short_description
            ? quizPostData.short_description
            : "Loading...."}
        </Text>
      </View>
    );
  }
}
