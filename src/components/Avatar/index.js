import React from 'react';
import {Image} from 'react-native';
import {ButtonView} from '../../reuseableComponents';
import {Images, Metrics} from '../../theme';
import styles from './styles';

const index = (props) => {
  const {
    source,
    style,
    imageStyle,
    size,
    onPress,
    removeShadow,
    removeBorder,
    borderSize,
  } = props;

  const imgSize = removeBorder ? size : size - borderSize;
  const hasShadow = removeShadow ? {shadowOpacity: 0, elevation: 0} : {};

  return (
    <ButtonView
      style={[
        styles.container,
        style,
        {
          height: size,
          width: size,
          borderRadius: size / 2,
          ...hasShadow,
        },
      ]}
      disabled={onPress ? false : true}
      onPress={onPress}>
      <Image
        resizeMode="cover"
        defaultSource={Images.icAvatar}
        source={source}
        style={[
          imageStyle,
          {
            height: imgSize,
            width: imgSize,
            borderRadius: 15,
            overflow: 'hidden',
          },
        ]}
      />
    </ButtonView>
  );
};

export default index;

index.defaultProps = {
  source: require('./default.png'),
  size: Metrics.heightRatio(94),
  borderSize: 7,
  imageStyle: {},
  style: {},
  onPress: undefined,
  removeShadow: undefined,
  removeBorder: undefined,
};
