import _ from "lodash";
import React, { createContext, Component } from "react";
import { StatusBar, View, Platform } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import RootNavigator from "./navigator";
import { navigatorRef, navigate } from "./services/NavigationService";
import singleton from "./singleton";
import SplashScreen from "react-native-splash-screen";
import { Colors, Metrics } from "./theme";
import HttpServiceManager from "./services/HttpServiceManager";
import utility from "./utility";
import constant from "./constants";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Spinner from "react-native-globalspinner";
import Reachability from "react-native-reachability-popup";
import { LoginContext } from "./contexts";
import { ImageViewer } from "./reuseableComponents";
import OneSignal from "react-native-onesignal";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import {} from "./constants/ IMLocalize";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setLogin = this.setLogin.bind(this);
    this.state = {
      isLogin: false,
      setLogin: this.setLogin,
      isReduxLoaded: false,
      name: props.name,
      isSubscribed: false,
      requiresPrivacyConsent: false,
      isLocationShared: false,
      inputValue: "",
      consoleValue: "",
    };
    / O N E S I G N A L   S E T U P /;
    OneSignal.setAppId("f27d034a-5e53-4626-b3f9-ebd2b0aabcfb");
    OneSignal.setLocationShared(false);
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(this.state.requiresPrivacyConsent);
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {});

    / O N E S I G N A L  H A N D L E R S /;
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notifReceivedEvent) => {
        let notification = notifReceivedEvent.getNotification();
      }
    );
    OneSignal.setNotificationOpenedHandler((noti) => {
      const { notification } = noti;
      const { additionalData } = notification;
      const { custom_data } = additionalData;

      if (_.isEqual(custom_data.identifier, constant.NEWS_ALERT)) {
        let item = {
          id: custom_data?.news_id,
          hospital_id: custom_data?.hospital_id,
        };
        setTimeout(() => {
          navigate("NewsStack", {
            screen: "NewsDetails",
            params: item,
          });
        }, 1500);
      }
    });
  }

  myiOSPromptCallback = (permission) => {
    // do something with permission value
  };

  async componentDidMount() {
    HttpServiceManager.initialize(constant.baseURL, {
      token: constant.applicationToken,
    });
    //set designedAtX verify it on Adobe XD Desgin file
    //Metrics.designedAtX = false;
    //END OneSignal Init Code

    // set login
    utility.setUserLogin(this.setLogin);

    if (this.state.isLogin === false) {
      utility.setIsLogout(true);
    }
    OneSignal.addSubscriptionObserver((event) => {
      const { userId } = event.to;
      utility.setOneSignalPlayerId(userId);
    });

    this.interval = setInterval(() => this.fetchDeviceState(), 5000);
  }

  fetchDeviceState = async () => {
    const { userId } = await OneSignal.getDeviceState();
    if (this.interval) {
      clearInterval(this.interval);
      utility.setOneSignalPlayerId(userId);
    }
  };

  setLogin = (isLogin = true) => {
    this.setState({ isLogin });
  };

  // onBeforeLift = () => {
  //   singleton.storeRef = store;

  //   const isLogin = Object.keys(store.getState().user.data).length
  //     ? true
  //     : false;

  //   this.setState({isReduxLoaded: true, isLogin}, () => {
  //     SplashScreen.hide();
  //   });
  // };

  onBeforeLift = () => {
    singleton.storeRef = store;
    const { user } = store.getState();

    if (!_.isEmpty(user.data)) {
      HttpServiceManager.getInstance().userToken = store.getState().user.data.token;
      HttpServiceManager.getInstance().language = store.getState().user.data.language_id;
    }

    this.setState(
      { isReduxLoaded: true, isLogin: !_.isEmpty(user.data) },
      () => {
        SplashScreen.hide();
      }
    );
  };

  render() {
    const { isReduxLoaded } = this.state;

    return (
      <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          // backgroundColor={Platform.OS == "ios" ? Colors.white : Colors.white}
          backgroundColor={Colors.white}
        />
        <I18nextProvider i18n={i18next}>
          <PersistGate onBeforeLift={this.onBeforeLift} persistor={persistor}>
            {isReduxLoaded ? (
              <LoginContext.Provider value={this.state}>
                <RootNavigator ref={navigatorRef} />
              </LoginContext.Provider>
            ) : (
              <View />
            )}
          </PersistGate>
        </I18nextProvider>
        <FlashMessage position="top" />

        <Spinner color={Colors.lightGreen} type="BallIndicator" />

        <Reachability />

        <ImageViewer ref={utility.setImageViewerRef} />
      </Provider>
    );
  }
}
