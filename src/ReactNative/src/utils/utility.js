// Third Party
import moment from "moment";
import { Platform } from "react-native";
import Toast from "react-native-simple-toast";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

// Constants
import { serviceUrl } from "../constant/serviceURL";

exports.apiCall = async function (url, body, method) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    // 'DeviceId':getUniqueId()
  };
  const token = await AsyncStorageLib.getItem("Token");
  const refreshToken = await AsyncStorageLib.getItem("RefreshToken");
  if (token) {
    headers["Authorization"] = token;
    // headers['x-functions-key']='jBsOOIOh4zR/zbRUZXTYxanJ1NFuncvprPq7MOtYQgli9j9O3Nz3Qg=='
    // headers['x-functions-key']='kxAO7RfWGAlek2/8BPtZEn6LJCRJIq3jAh/2MD0wUECte42Oav6mVA=='
    headers["x-functions-key"] =
      "pwpsVK/eSR55zrOhZsQGWeVIFW12cuV8VRT3ZvTU0K/8gxAKyZiRpA=="; // x function key for DEV instance
  }

  const netState = await NetInfo.fetch();
  if (netState.isConnected) {
    return fetch(url, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : null,
    })
      .then((response) => {
        return new Promise(function (resolve, reject) {
          response.json().then((responseParsed) => {
            if (
              response.status == 200 ||
              response.status == 201 ||
              response.status == 204
            ) {
              resolve({ status: response.status, result: responseParsed });
            } else if (
              response.status == 401 ||
              response.status == 400 ||
              response.status == 409 ||
              response.status == 403 ||
              response.status == 404
            ) {
              // access token unauthorised
              resolve({ status: response.status, result: responseParsed });
            } else {
              resolve({ status: 400, result: responseParsed }); // failed
            }
          });
        });
      })
      .catch((err) => {
      });
  } else {
    Toast.show("Check your internet connection.", Toast.LONG);
    throw false;
  }
};

// Containers are( userprofileimage,huntimage,hotspotimage,bussinessimage)

const manageUrl = (url) => {
  let newtext = url?.replace("file", "File");
  return newtext;
};
export const uploadFileToAzure = async (uri, containername) => {
  let timestamp = moment().format("x");
  let file = {
    uri: Platform.OS == "ios" ? uri : uri,
    type: "image/jpeg",
    name: timestamp + ".jpg",
  };

  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      lang: "en",
    };
    const token = await AsyncStorageLib.getItem("Token");
    if (token) {
      headers["access_token"] = token;
    }

    let res = await fetch(
      `${serviceUrl.baseUrl}User/GetSASUrl?imagename=${file?.name}&container=${containername}`,
      {
        method: "GET",
        headers: headers,
        body: null,
        headers: headers,
      }
    );
    if (res.status !== 200) throw new Error("Image URL does not created!");
    res = await res.json();
    const azureRes = await fetch(res.message, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": "application/octet-stream",
        "x-ms-blob-type": "BlockBlob",
        "x-ms-blob-content": "image/png",
      },
    });

    if (azureRes.status !== 201) throw new Error("Image does not uploaded!");
    {
      return file?.name;
    }
  } catch (error) {
    throw error;
  }
};
