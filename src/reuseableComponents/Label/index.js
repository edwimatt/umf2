import React, { Component } from "react";
// predefined components
import { View, Text } from "react-native";

const Label = (props) => {
  const { style, label } = props;

  return <Text style={style}>{label}</Text>;
};

export default Label;
