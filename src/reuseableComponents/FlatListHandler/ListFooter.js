import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Colors } from "../../theme";

const ListFooter = ({ showLoader }) => (
  <View
    style={{
      height: 80,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {showLoader && <ActivityIndicator animating color={Colors.theme} />}
  </View>
);

export default ListFooter;
