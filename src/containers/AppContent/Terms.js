import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Colors, Fonts } from '../../theme';
import { BaseContainer } from '../../components';

const Terms = (props) => {

  const { } = props

  return (
    <View style={styles.content}>
      <Text style={{ ...Fonts.Regular(16), color: Colors.mirage }}>
        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n"}
      </Text>
      <Text style={{ ...Fonts.Regular(16), color: Colors.mirage }}>
        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n"}
      </Text>
      <Text style={{ ...Fonts.Regular(16), color: Colors.mirage }}>
        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n"}
      </Text>
      <Text style={{ ...Fonts.Regular(16), color: Colors.mirage }}>
        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n"}
      </Text>
    </View>
  )

}

export default Terms;