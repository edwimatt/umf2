import React, {forwardRef, memo} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Images, Colors, AppStyles} from '../../theme';
import {ImageButton} from '../../reuseableComponents';
import styles from './styles';
import _ from 'lodash';

const index = forwardRef((props, ref) => {
  const {
    title,
    closeOnDragDown,
    onCancel,
    visible,
    fetching,
    height,
    closeOnPressMask,
    closeOnPressBack,
    children,
    hasCloseButton,
    isDrag,
    round,
  } = props;

  const _closeBottomSheet = () => {
    ref.current.close();
  };

  const _onClose = () => {
    visible && onCancel?.();
  };

  return (
    <RBSheet
      dragFromTopOnly={isDrag}
      ref={ref}
      height={height}
      keyboardAvoidingViewEnabled={false}
      closeOnPressMask={closeOnPressMask}
      closeOnPressBack={closeOnPressBack}
      closeOnDragDown={closeOnDragDown}
      onClose={_onClose}
      customStyles={{
        draggableIcon: {
          height: 0,
          width: 0,
        },
        container: {
          borderTopLeftRadius: round,
          borderTopRightRadius: round,
        },
      }}
      {...props}>
      {!_.isEmpty(title) && hasCloseButton && (
        <View style={styles.headerContainer}>
          <Text style={styles.txtTitle}>{title ?? ''}</Text>
          <ImageButton
            source={Images.icCancel}
            onPress={_closeBottomSheet}
            style={styles.btnCancel}
          />
        </View>
      )}
      {fetching ? (
        <View
          style={{
            flex: 1,
            ...AppStyles.centerAligned,
          }}>
          <ActivityIndicator color={Colors.elephant} size="large" />
        </View>
      ) : (
        children
      )}
    </RBSheet>
  );
});

export default memo(index);

index.defaultProps = {
  height: 500,
  animationType: 'fade',
  openDuration: 300,
  closeDuration: 200,
  closeOnPressMask: true,
  closeOnPressBack: true,
  closeOnDragDown: true,
  hasCloseButton: true,
};
