//
//  HttpServiceManager.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:37:25 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import axios from "axios";
import { showSpinner, hideSpinner } from "react-native-globalspinner";
import { FlashMessage } from "../reuseableComponents";
import Utils from "../utility";
// persistor
import { persistor } from "../store";

const log = (...msgs) => {
  if (process.env.NODE_ENV === "development") console.log(...msgs);
};

global.log = log;

class HttpServiceManager {
  static myInstance = null;
  static axiosInstance = null;
  userToken = "";
  static getInstance() {
    if (HttpServiceManager.myInstance == null) {
      HttpServiceManager.myInstance = new HttpServiceManager();
    }
    return this.myInstance;
  }

  static initialize = (baseURL, authHeader) => {
    HttpServiceManager.getInstance().axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 120000,
      headers: authHeader,
    });
    HttpServiceManager.getInstance().axiosInstance.interceptors.request.use(
      function (config) {
        config.headers[
          "user-token"
        ] = HttpServiceManager.getInstance().userToken;
        config.headers["language"] = HttpServiceManager.getInstance().language;
        return config;
      },
      function (error) {
        return error;
      }
    );
  };

  multipleRequest = (RequestArray) => {
    if (HttpServiceManager.getInstance().axiosInstance !== null) {
      return new Promise((resolve, reject) => {
        axios
          .all(RequestArray)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(checkError(error));
          });
      });
    } else {
      console.warn(
        'HttpServiceManager method "initialize" is not called, call it in App.js componentDidMount'
      );
    }
  };

  getRequestObject = (requestName, parameters, method) => {
    // showLoader(showHud);
    if (HttpServiceManager.getInstance().axiosInstance !== null) {
      return HttpServiceManager.getInstance().axiosInstance.request({
        method: method,
        url: requestName,
        params: parameters,
      });
    } else {
      console.warn(
        'HttpServiceManager method "initialize" is not called, call it in App.js componentDidMount'
      );
    }
  };

  resetUploadProgress = () => {
    /*
		if (Utils.getIsTrackUploadProgress()) {
			Utils.setIsTrackUploadProgress(false);
			Utils.getStoreRef().dispatch(
				generalSaveAction(UPLOAD_PROGRESS, { progress: 0 }),
			);
		}
		*/
  };

  uploadProgress = (progressEvent) => {
    /*
		Utils.getStoreRef().dispatch(
			generalSaveAction(UPLOAD_PROGRESS, {
				progress: (progressEvent.loaded / progressEvent.total) * 100,
			}),
		);
		*/
  };

  request = (
    requestName,
    parameters,
    method,
    showHud = true,
    newBaseURl = null
  ) => {
    if (showHud) {
      showSpinner();
    }

    const data = method === "get" ? null : parameters;

    if (HttpServiceManager.getInstance().axiosInstance !== null) {
      return new Promise((resolve, reject) => {
        // let reqParam = {
        //   method: method,
        //   url: requestName,
        //   data: data,
        //   params: parameters,
        //   onUploadProgress: (progressEvent) =>
        //     this.uploadProgress(progressEvent),
        // };
        let reqParam = {
          method: method.toUpperCase(),
          url: requestName,
        };
        if (method.toUpperCase() == "POST") {
          reqParam["data"] = parameters;
        } else {
          reqParam["params"] = parameters;
        }
        if (newBaseURl) {
          reqParam["baseURL"] = newBaseURl;
        }
        HttpServiceManager.getInstance()
          .axiosInstance.request(reqParam)
          .then((response) => {
            global.log(
              "--------------------------------------------------------------------------------------",
              "\n- REQUEST : ",
              reqParam,
              "\n- RESPONSE : ",
              response,
              "\n--------------------------------------------------------------------------------------"
            );
            if (response.status === 200) {
              resolve({
                response: response.data.data,
                message: response.data.message,
                meta: response.data.pagination.meta,
              });
              // set upload progress tracking to false
              this.resetUploadProgress();
            }
            hideSpinner();
          })
          .catch((error) => {
            hideSpinner();
            reject(HttpServiceManager.checkError(error));
            // set upload progress tracking to false
            this.resetUploadProgress();
          });
      });
    } else {
      console.warn(
        'HttpServiceManager method "initialize" is not called, call it in App.js componentDidMount'
      );
    }
  };

  static checkError = (error) => {
    console.log(
      "--------------------------------------------------------------------------------------",
      "\n- ERROR : ",
      error.response,
      "\n--------------------------------------------------------------------------------------"
    );
    var showError = error.message;
    if (error.response) {
      if (error.response.data) {
        if (error.response.data.data) {
          data = error.response.data.data;
          if (Array.isArray(data)) {
            data = error.response.data.data[0];
          }
          var values = Object.keys(data).map((key) => {
            return data[key];
          });
          showError = "• " + values.join("\n• ");
        }
      }
    }
    if (error.response.data.code != 401) {
      FlashMessage({ message: showError });
    } else if (error.response.data.code == 401) {
      FlashMessage({ message: error.response.data.message });
      Utils.getUserLogin()(false);
      persistor.purge();
    }
    return error.response;
  };

  static checkErrors = (error) => {
    global.log(error);
    global.log(
      "--------------------------------------------------------------------------------------",
      "\n- ERROR : ",
      error.response,
      "\n--------------------------------------------------------------------------------------"
    );
    let showError = "";
    if (
      error.response === undefined ||
      error.response.status === 503 ||
      error.response.status === 403
    ) {
      showError = error.message;
    } else if (error.response.status === 500) {
      FlashMessage({ message: "Html cannot be parsed" });
      return "Html cannot be parsed";
    } else if (error.response.status === 404) {
      showError = Utils.getError(error.response.data.data[0]);
      FlashMessage({ message: showError });
      return showError;
    } else if (error.response.status === 400) {
      FlashMessage({ message: error.response.data.message });
      return error.response.data.message;
    } else {
      FlashMessage({ message: error.message });
      return error.message;
    }
  };
}

export default HttpServiceManager;
