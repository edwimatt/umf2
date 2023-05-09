import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

const index = (props) => {
  const { children, style, onLayout } = props;

  return (
    <View onLayout={onLayout} style={[styles.container, style]}>
      {children}
    </View>
  );
};

export default index;
