import React from 'react';
import {View, Text, Image} from 'react-native';
import {ButtonView} from '../../reuseableComponents';
import {AppStyles, Images} from '../../theme';
import styles from './styles';

const ChatCell = ({item, onPress}) => {
  return (
    <ButtonView
      onPress={onPress}
      style={[AppStyles.container, styles.cellContainer]}>
      <Image
        resizeMode={'cover'}
        style={styles.profileImg}
        source={{uri: item.item.image}}
        defaultSource={Images.ic_avatar}
      />
      <View>
        <Text style={styles.txtName}>{item.item.name}</Text>
        <Text numberOfLines={1} style={styles.txtTagLine}>
          {item.item.lastMsg}
        </Text>
      </View>
      {item.item.isUnread && <View style={styles.icNotification} />}
    </ButtonView>
  );
};

export default ChatCell;
