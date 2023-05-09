//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:49:50 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { Alert, Linking } from "react-native";
import _ from "lodash";

let imageViewerRef;
let oneSignalPlayerId;
let userLogin;
let isLogout: false;

class utility {
  EdgePadding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  setUserLogin = (login) => (userLogin = login);
  getUserLogin = () => userLogin;

  setIsLogout = (logout) => (isLogout = logout);
  getIsLogout = () => isLogout;

  setOneSignalPlayerId = (id) => (oneSignalPlayerId = id);
  getOneSignalPlayerId = () => oneSignalPlayerId;

  setImageViewerRef = (ref) => (imageViewerRef = ref);
  getImageViewerRef = () => imageViewerRef;

  isPlatformAndroid = () => Platform.OS === "android";
  isPlatformIOS = () => Platform.OS === "ios";
  isEqual(value1, value2) {
    return _.isEqual(value1, value2);
  }
  isEqual(value1, value2) {
    return _.isEqual(value1, value2);
  }
  isEmpty(value) {
    return _.isEmpty(value);
  }
  isUndefined(value) {
    return _.isUndefined(value);
  }
  _convertDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    //Months are zero based
    let year = date.getFullYear();

    let dateString = `${year}-`;
    if (month < 10) {
      dateString += `0${month}-`;
    } else {
      dateString += `${month}-`;
    }
    if (day < 10) {
      dateString += `0${day}`;
    } else {
      dateString += day;
    }
    return dateString;
  };
  focusOnMapCoordinates = (map, markers, edgePadding = this.EdgePadding) => {
    options = {
      edgePadding: edgePadding,
      animated: true,
    };
    map.fitToCoordinates(markers, options);
  };
  openCall(url) {
    return Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  }
  animateToFirstLocationCentered = (map, points, duration = 2000) => {
    var minX, maxX, minY, maxY;
    // init first point
    ((point) => {
      minX = +point.latitude;
      maxX = +point.latitude;
      minY = +point.longitude;
      maxY = +point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, +point.latitude);
      maxX = Math.max(maxX, +point.latitude);
      minY = Math.min(minY, +point.longitude);
      maxY = Math.max(maxY, +point.longitude);
    });

    var midX = (minX + maxX) / 2;
    var midY = (minY + maxY) / 2;
    var midPoint = [midX, midY];

    var deltaX = maxX - minX;
    var deltaY = maxY - minY;
    map.animateToRegion(
      {
        latitude: +points[0].latitude,
        longitude: +points[0].longitude,
        latitudeDelta: deltaX * 2.5,
        longitudeDelta: deltaY * 2.5,
      },
      duration
    );
  };
  validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };
  alerts = (title, description, onPress) => {
    Alert.alert(
      title,
      description,
      [
        { text: "OK", onPress: onPress },
        { text: "Cancel", onPress: () => {} },
      ],
      {
        cancelable: false,
      }
    );
  };
  getError(err: Object) {
    let errors = "";
    if (err && Object.keys(err).length) {
      errors = Object.keys(err).map((key) => {
        return err[key];
      });
    }
    return errors;
  }

  isPortrait = () => {
    const dim = Dimensions.get("screen");
    return dim.height >= dim.width;
  };
}

export default new utility();
