"use strict";
import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet,
  Image,
  UIManager,
  LayoutAnimation,
  Platform,
} from "react-native";
import PropTypes from "prop-types";
import {
  Metrics,
  DefaultTheme,
  AppStyles,
  Fonts,
  Colors,
  Strings,
} from "../../theme";
import { color } from "react-native-reanimated";
import Label from "../Label";
// import { Colors } from "react-native/Libraries/NewAppScreen";

const { colors } = DefaultTheme;
export default class InputTextField extends Component {
  static propTypes = {
    label: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    onIconPress: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    label: "placeholder",
    title: "Title",
    error: "Error",
    placeholder: "placeholder",
    onIconPress: () => {},
  };

  constructor(props: Object, context: Object) {
    super(props, context);
    this.animationVal = new Animated.Value(0);
    this.state = {
      containerHeight: 0,
      val: props.value ? props.value : "",
      isError: false,
      error: props.error,
      title: props.title,
    };

    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentDidMount() {
    this.props.value && this.props.value.length && this.animateUp();
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value)
      this.setState({ val: this.props.value, isError: false, error: "" });
  }

  setText = (txt) => {
    this.onChangeText(txt);
    this.animateUp();
  };

  getValue = () => this.state.val;

  setError = (isError, error = this.state.error) => {
    let switchAnimation = {
      duration: 150,
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
    };
    LayoutAnimation.configureNext(switchAnimation);
    this.setState({ isError, error });
  };

  setFocus = () => {
    this.textInput.focus();

    if (this.props.onPress) {
      setTimeout(this.props.onPress, 2000);
    }
  };

  animateUp = () => {
    Animated.timing(this.animationVal, {
      toValue: 1,
      duration: 200,
    }).start();
  };

  animateDown = () => {
    Animated.timing(this.animationVal, {
      toValue: 0,
      duration: 200,
    }).start();
  };

  renderLabel() {
    if (this.state.containerHeight) {
      const translateY = this.animationVal.interpolate({
        inputRange: [0, 1],
        outputRange: [8, -this.state.containerHeight - 10],
        extrapolate: "clamp",
      });

      const translateX = this.animationVal.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 2],
        extrapolate: "clamp",
      });

      const color = this.animationVal.interpolate({
        inputRange: [0, 1],
        outputRange: ["white", "blue"],
        extrapolate: "clamp",
      });

      return (
        <Animated.View
          useNativeDriver={false}
          style={[
            styles.placeholderContainer,
            { transform: [{ translateY }, { translateX }] },
          ]}
          pointerEvents="none"
        >
          <Animated.Text
            useNativeDriver={false}
            style={[styles.txtLabel, { color }]}
          >
            {this.props.label}
          </Animated.Text>
        </Animated.View>
      );
    }
    return null;
  }

  renderInput() {
    const { isActiveColor, style, keyboardType, value, ...rest } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Label style={styles.fieldText} label={this.state.title} />
        <TextInput
          ref={(ref) => (this.textInput = ref)}
          style={[styles.textInput, style]}
          keyboardType={
            rest.type.includes("PASSWORD") ? undefined : keyboardType
          }
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          autoCapitalize="words"
          placeholderTextColor={colors.placeholder}
          onChangeText={this.onChangeText}
          value={this.state.val}
          {...rest}
        />
      </View>
    );
  }

  onChangeText = (val) => this.setState({ val, isError: false });

  onFocus = () => this.animateUp();

  onBlur = () => !this.state.val && this.animateDown();

  renderRightIcon() {
    const { rightImage, onPressRight } = this.props;
    if (rightImage) {
      return (
        <TouchableOpacity
          style={styles.wrapperRightImage}
          onPress={onPressRight}
        >
          <Image source={rightImage} style={styles.rightImage} />
        </TouchableOpacity>
      );
    }
  }

  renderRightText() {
    const { rightText } = this.props;
    if (rightText) {
      return <Text style={styles.wrapperRightImage}>{rightText}</Text>;
    }
  }

  renderLeftIcon() {
    if (this.props.leftImage) {
      return (
        <TouchableOpacity
          style={styles.wrapperLeftImage}
          onPress={this.props.onLeftIconPress}
        >
          <Image source={this.props.leftImage} style={styles.rightImage} />
        </TouchableOpacity>
      );
    }
  }

  renderSeparator() {
    return (
      <View
        style={[
          styles.separator,
          {
            backgroundColor: this.state.isError ? "red" : "#E0E0E0",
          },
        ]}
      />
    );
  }

  renderError() {
    if (this.state.isError) {
      return <Text style={styles.error}>{this.state.error}</Text>;
    }
  }

  onLayout = (ev) =>
    this.setState({
      containerHeight: ev.nativeEvent.layout.height / 2.5,
    });

  render() {
    const container = [
      styles.inputWrapper,
      { borderColor: this.state.isError ? "red" : "transparent" },
    ];
    const { onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress} disabled={onPress ? false : true}>
        <View style={container} onLayout={this.onLayout}>
          {this.renderLeftIcon()}
          {this.renderInput()}

          {/* {this.renderLabel()} */}
          {this.renderRightIcon()}
          {this.renderRightText()}
          {/* {this.renderSeparator()}  */}
        </View>
        {this.renderError()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  inputWrapper: {
    // marginTop: Metrics.baseMargin,
    // flex: 1,
    flexDirection: "row",
    // borderRadius: Metrics.doubleBaseMargin + 8,
    // height: 42,
    // ...AppStyles.dropShadow,
  },
  textInput: {
    flex: 1,
    color: "#000",
    backgroundColor: Colors.white,
    borderColor: Colors.paleGrey,
    borderWidth: 1,
    borderRadius: 6,
    padding: Metrics.heightRatio(12),
    paddingHorizontal: Metrics.heightRatio(20),
    height: 45,
    ...Fonts.Regular(14),
    lineHeight: 17,
    letterSpacing: 0.64,
  },
  placeholderContainer: {
    position: "absolute",
    left: Metrics.heightRatio(2),
  },
  txtLabel: {
    paddingTop: Metrics.smallMargin,
  },
  wrapperRightImage: {
    paddingRight: Metrics.baseMargin,
    // position: 'absolute',
    // right: Metrics.baseMargin,
    alignSelf: "center",
  },
  wrapperLeftImage: {
    paddingLeft: Metrics.baseMargin,
    // position: 'absolute',
    // left: Metrics.baseMargin,
    alignSelf: "center",
  },
  rightImage: {
    width: Metrics.heightRatio(20),
    height: Metrics.heightRatio(20),
    resizeMode: "contain",
  },
  error: { color: "red", paddingLeft: Metrics.heightRatio(3), marginLeft: 10 },

  fieldText: {
    ...Fonts.Regular(14),
    letterSpacing: 0.64,
    color: Colors.slateGray,
    lineHeight: 17,
    marginTop: 25,
    marginHorizontal: Metrics.widthRatio(17),
  },
});
