import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TextInput,
  Animated,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import { Metrics } from "../../theme";
import _ from "lodash";
import FlashMessage from "../FlashMessage";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "../../theme/Colors";

export default class MaterialTextField extends Component {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    onRightPress: PropTypes.func,
    rightIcon: PropTypes.any,
    rightText: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isEmpty: PropTypes.bool,
    labelBackgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    activeColor: PropTypes.string,
    labelColor: PropTypes.string,
    outlined: PropTypes.bool,
    textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onFocus: PropTypes.func,
    returnKeyType: PropTypes.string,
    onSubmitEditing: PropTypes.func,
  };

  static defaultProps = {
    label: "placeholder",
    error: "Error",
    onRightPress: () => {},
    rightIcon: null,
    isError: false,
    rightText: "",
    value: "",
    labelBackgroundColor: colors.white,
    activeTextColor: colors.black,
    inactiveColor: colors.grey,
    activeColor: colors.lightGreen,
    labelColor: colors.lightGreen,
    outlined: false,
    textInputStyle: {},
    style: {},
    onFocus: () => {},
    returnKeyType: "default",
    onSubmitEditing: () => {},
  };

  constructor(props, context) {
    global.log({ value: props.value });
    super(props, context);
    this.state = {
      isFocused: false,
      error: props.error,
      val:
        props.value && props.value != "null" && props.value != "undefined"
          ? props.value
          : "",
      maxHeight: 0,
      minHeight: 52,
      expanded: false,
    };
  }
  _animatedIsFocused = new Animated.Value(this.props.value === "" ? 0 : 1);
  animation = new Animated.Value(0);

  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this.validate);
    }
    this.animation.setValue(this.state.minHeight);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.value !== this.props.value)
  //     this.setState({ val: this.props.value });
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.value !== prevProps.value)
      this.setState({ val: this.props.value, isError: false, error: "" });
  }

  setError = (val, error = this.state.error) => {
    this.setState({ isError: val, error });
  };

  setFocus = () => this.textInput.focus();

  handleFocus = () => {
    this.animate(1);
    this.props.onFocus();
  };
  handleBlur = () => this.animate(this.state.val ? 1 : 0);
  animate = (toValue) => {
    Animated.timing(this._animatedIsFocused, {
      toValue: toValue,
      duration: 200,
    }).start();

    Animated.spring(this.animation, {
      toValue: this.state.expanded
        ? 18 + this.state.minHeight
        : this.state.minHeight,
    }).start();
  };
  labelStyle = {
    position: "absolute",
    left: this.props.isSelectedInput ? 0 : 5,
    top: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [13, -9],
    }),
    fontSize: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 13],
    }),
    color: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [
        this.props.inactiveColor,
        this.props.labelColor ? this.props.labelColor : this.props.activeColor,
      ],
    }),
    backgroundColor: this.props.labelBackgroundColor,
    paddingLeft: 5,
    paddingRight: 5,
    alignSelf: "center",
  };

  borderColorStyle = {
    borderColor: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.inactiveColor, this.props.activeColor],
    }),
  };
  colorStyle = {
    color: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.inactiveColor, this.props.activeColor],
    }),
  };
  tintColorStyle = {
    tintColor: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.inactiveColor, this.props.activeColor],
    }),
  };
  borderStyle = this.props.outlined
    ? {
        borderWidth: 1,
      }
    : {
        borderBottomWidth: 1,
      };
  _setMaxHeight(event) {
    if (
      event.nativeEvent.layout.height !==
      Math.round(event.nativeEvent.layout.height)
    ) {
      this.setState({
        maxHeight: Math.round(event.nativeEvent.layout.height),
      });
    }
  }
  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height,
    });
  }
  setText = (value) => {
    if (value === "") {
      this.animate(0);
    } else {
      this.animate(1);
    }
    this.setState({ val: value });
  };

  getValue = () => this.state.val;

  setValue = () => this.setState({ val: "" });

  getValueWithKey = () => {
    if (_.isEmpty(this.state.val) && this.props.required == 1) {
      FlashMessage({
        message: `${this.props.label} is required`,
        type: "danger",
      });
      return false;
    } else if (_.isEmpty(this.state.val)) {
      return {};
    } else {
      return { [`option[${this.props.identifier}]`]: this.state.val };
    }
  };
  componentIcon = () => {
    if (this.props.rightIcon || this.state.expanded) {
      return (
        <Animated.Image
          resizeMode="contain"
          // source={this.state.expanded ? Images.icError : this.props.iconImg}
          source={
            this.state.expanded ? this.props.rightIcon : this.props.rightIcon
          }
          // style={[this.tintColorStyle, { width: 24, height: 24 }, { tintColor: this.state.expanded && '#B00020' }]}
          style={[{ width: 16, height: 16 }, this.props.imgStyle]}
        />
      );
    } else {
      return (
        <Animated.Text style={this.colorStyle}>
          {this.props.rightText}
        </Animated.Text>
      );
    }
  };
  focus = () => {
    this.textInput.focus();
  };
  render() {
    const { isError } = this.state;

    return (
      <Animated.View
        style={[
          {
            height: this.animation,
            marginTop: Metrics.baseMargin,
            marginBottom: isError ? 20 : 0,
          },
          this.props.style,
        ]}
      >
        <Animated.View
          pointerEvents={this.props.pointerEvents}
          style={[
            this.borderColorStyle,
            styles.borderStyle,
            this.borderStyle,
            this.props.borderStyle,
          ]}
        >
          <Animated.Text
            style={[this.props.labelStyle, this.labelStyle]}
            numberOfLines={1}
          >
            {this.props.label}
          </Animated.Text>
          <TextInput
            ref={(ref) => (this.textInput = ref)}
            style={[
              styles.txtInputStyle,
              this.props.textInputStyle,
              { color: this.props.activeTextColor },
            ]}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChangeText={(text) => {
              this.setState({ val: text, isError: false });
              if (this.props.onChangeText) this.props.onChangeText(text);
            }}
            value={this.state.val}
            multiline={this.props.multiline && true}
            maxLength={this.props.maxLength}
            editable={this.props.editable}
            autoCorrect={false}
            keyboardType={this.props.keyboardType}
            secureTextEntry={this.props.secureTextEntry && true}
            selectionColor={this.props.selectionColor}
            returnKeyType={this.props.returnKeyType}
            onSubmitEditing={this.props.onSubmitEditing}
            numberOfLines={this.props.numberOfLines}
          />
          {(this.props.rightText ||
            this.props.rightIcon ||
            this.state.expanded) && (
            <TouchableOpacity
              onPress={this.props.onRightPress}
              style={styles.iconStyle}
            >
              {this.componentIcon()}
            </TouchableOpacity>
          )}
        </Animated.View>
        {this.state.isError && (
          <Text style={styles.errorStyle}>{this.state.error}</Text>
        )}
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  iconStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  txtInputStyle: {
    minHeight: 42,
    height: 42,
    // fontSize: 20,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    alignSelf: "stretch",
    flex: 1,
  },
  errorStyle: {
    color: "#B00020",
    paddingLeft: 15,
    marginTop: 5,
  },
  borderStyle: {
    borderRadius: 4,
    flexDirection: "row",
  },
});
