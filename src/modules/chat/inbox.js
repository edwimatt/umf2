import React from 'react';
import {View, Image, FlatList, ImageBackground} from 'react-native';
import {useSelector} from 'react-redux';
import Swipeout from 'react-native-swipeout';

import {ButtonView, FlatListHandler, Loader} from '../../reuseableComponents';
import {push,navigate} from '../../services/NavigationService';
import {ChatCell} from '../../components';
import {emitLoadRecentChats, emitDeleteChatThread} from './inboxSocketHandler';
import {AppStyles, Images, Metrics, Colors} from '../../theme';
import {AppHeader, BaseContainer} from '../../components';

const Chat = ({navigation}) => {
  const user = useSelector(({user}) => user.data);
  const [state, setState] = React.useState({data: [], isFetching: true});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={AppStyles.flexRow}>
          <ButtonView onPress={() => push('SearchScreen')}>
            <Image source={Images.icSearch} />
          </ButtonView>
          <ButtonView onPress={() => push('Notification')}>
            <Image source={Images.icNotification} />
          </ButtonView>
        </View>
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      fetchInbox();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchInbox = () => {
    emitLoadRecentChats(user, (res) => {
      setState({
        data: res.map(
          ({
            target_user_data,
            id,
            last_chat_message,
            unread_message_counts,
          }) => ({
            id,
            usrId: target_user_data.id,
            name: target_user_data.name,
            image: target_user_data.image_url,
            lastMsg: last_chat_message.message,
            cellType: 'MatchesStatus',
            isUnread: +unread_message_counts ? true : false,
          }),
        ),
        isFetching: false,
      });
    });
  };

  const deleteChatItem = ({item}) => {
    emitDeleteChatThread(
      {
        user_id: user.id,
        chat_room_id: item.id,
        target_id: item.usrId,
      },
      fetchInbox,
    );
  };

  const onChat = (otherUser) => () =>

  push('MessagesStack', {screen: 'ChatScreen',params: {otherUser: {...otherUser, id: otherUser.usrId}}});
  // push('ChatScreen', {otherUser: {...otherUser, id: otherUser.usrId}});

  return !state.isFetching ? (
    <BaseContainer>
    <AppHeader
      title={'Messages'}
      isNotificationIcon={Images.icNotification}
      rightOnPress={() => navigate('HomeStack', {screen: 'Notifications'})}
    />
    <ImageBackground source={Images.bgBrowser} style={AppStyles.percent100}>
      <View style={[AppStyles.containerMargin, styles.innerContainer]}>
        <FlatListHandler
          showsVerticalScrollIndicator={false}
          data={state.data}
          keyExtractor={(item, index) => item.cellType + '-' + index}
          renderItem={(item) => (
            <Swipeout
              autoClose
              style={styles.swipeout}
              right={[
                {
                  onPress: () => {
                    deleteChatItem(item);
                  },
                  component: (
                    <View style={styles.containerSwipeBtnLeft}>
                      <View style={styles.wrapperIcDelete}>
                        <Image
                          source={Images.icBin}
                          style={styles.icDelete}
                        />
                      </View>
                    </View>
                  ),
                },
              ]}>
              <ChatCell item={item} onPress={onChat(item.item)} />
            </Swipeout>
          )}
        />
        {/* <ButtonView
          style={styles.icAddChat}
          onPress={() => push('ChatScreen', {otherUser})}>
          <Image source={Images.icAddChat} />
        </ButtonView> */}
      </View>
    </ImageBackground>
    </BaseContainer>
  ) : (
    <View style={styles.containerLoader}>
      <Loader />
    </View>
  );
};

export default Chat;

const styles = {
  innerContainer: {
    // marginTop: Metrics.navBarHeight,
    flex: 1,
  },
  swipeout: {
    backgroundColor: Colors.white,
    borderBottomWidth:1,
    borderColor: Colors.silver,
  
  },
  containerSwipeBtnLeft: {
    flex: 1,
    ...AppStyles.centerAligned,
    backgroundColor: 'white',
  },
  wrapperIcDelete: {
    borderRadius:27/2,
    backgroundColor: Colors.persianRed,
    margin: 15,
    ...AppStyles.centerAligned,
    padding:5,
  },
  icDelete: {
    width: Metrics.widthRatio(27),
    height: Metrics.widthRatio(27),
  },
  containerLoader: {flex: 1, ...AppStyles.alignItemsCenter},
};
