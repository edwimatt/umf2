import React from "react";
import { View, Image, Text } from "react-native";
import { Colors, Fonts } from "../../theme";
import { useTranslation } from "react-i18next";

const ListEmpty = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.container}>
      <Image source={require("./icons/emptylist.png")} style={styles.icon} />
      <Text style={styles.description}>
        {props.emptyList ? props.emptyList : t("common:notData")}
      </Text>
    </View>
  );
};

const styles = {
  icon: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    tintColor: Colors.lightGreen,
  },
  container: {
    padding: 64,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  // #A2A9B7
  description: { marginTop: 8, ...Fonts.Regular(19), color: Colors.lightGreen },
};

export default ListEmpty;
