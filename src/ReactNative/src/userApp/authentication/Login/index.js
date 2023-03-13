import React, { useEffect, useState } from "react";
import { View, Text, Platform, Image, TouchableOpacity, NativeModules, PermissionsAndroid, ActivityIndicator, } from "react-native";

// Third-Party Login
import { getUniqueId } from "react-native-device-info";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import Geolocation from "@react-native-community/geolocation";

import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import { useNavigation } from "@react-navigation/native";
import LinearButton from "../../commonComponents/LinearButton";
import NavigationService from "../../../routing/NavigationService";
import { emailRegex, passwordRegex } from "../../../constant/regex";

const { RNTwitterSignIn } = NativeModules;

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const authReducer = useSelector((State) => State?.authReducer);
  const homeReducer = useSelector((State) => State?.homeReducer);

  useEffect(() => {
    dispatch({
      type: types?.REGISTRATION_LOADER,
      payload: false,
    });
  }, []);

  useEffect(() => {
    userLocationUpdate();
  }, []);

  const userLocationUpdate = async () => {
    if (Platform.OS == "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Trash2Cash",
            message: "Trash2Cash App access to your location.",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => {
              if (position.coords.latitude && position.coords.longitude) {
                let location = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                };
                dispatch({
                  type: types?.UPDATE_USER_CURRENT_LOCATION,
                  payload: { location: location },
                });
              } else {
                dispatch({
                  type: types?.CURRENT_LOCATION_STATUS,
                  payload: false,
                });
              }
            },
            (error) => {
              dispatch({
                type: types?.CURRENT_LOCATION_STATUS,
                payload: false,
              });
            },
            {
              showLocationDialog: true,
              enableHighAccuracy: false,
              timeout: 20000,
              maximumAge: 0,
            }
          );
        } else {
          dispatch({
            type: types?.CURRENT_LOCATION_STATUS,
            payload: false,
          });
        }
      } catch (err) {
        console.warn(err);
        dispatch({
          type: types?.CURRENT_LOCATION_STATUS,
          payload: false,
        });
      }
    } else {
      Geolocation?.requestAuthorization();
      Geolocation.getCurrentPosition(
        (position) => {
          if (position.coords.latitude && position.coords.longitude) {
            let location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            dispatch({
              type: types?.UPDATE_USER_CURRENT_LOCATION,
              payload: { location: location },
            });
          } else {
            dispatch({
              type: types?.CURRENT_LOCATION_STATUS,
              payload: false,
            });
          }
        },
        (error) => {
          dispatch({
            type: types?.CURRENT_LOCATION_STATUS,
            payload: false,
          });
        },
        {
          showLocationDialog: true,
          timeout: 30000,
          maximumAge: 0,
        }
      );
    }
  };

  const verifyEmail = (email) => {
    return emailRegex.test(String(email?.trim()).toLowerCase());
  };

  let isValidPass = passwordRegex.test(password);

  // On Login Press
  const onSubmitButtonPress = async () => {
    const deviceToken = await AsyncStorageLib.getItem("deviceToken");

    if (verifyEmail(email) && password?.length > 5) {
      let body = {
        email: email.trim(),
        password: password,
        DomainId: homeReducer?.loginType == "USER" ? 1 : 2,
        DeviceToken: deviceToken ?? "",
      };
      dispatch({
        type: types?.USER_LOGIN,
        payload: { body: body, from: "login" },
      });
    } else if (!verifyEmail(email)) {
      showMessage({
        message: "Please enter valid email!",
        type: "danger",
      });
    } else if (!isValidPass) {
      showMessage({
        message: "Please enter valid password!",
        type: "danger",
      });
    }
  };

  // Facebook Login
  const _faceBookLogin = () => {
    if (Platform.OS === "android") {
      LoginManager.setLoginBehavior("web_only");
    }
    LoginManager.logInWithPermissions([
      "public_profile",
      "email",
      "user_friends",
    ]).then((result) => {
      if (result.isCancelled) {
        alert("Error");
      } else {
        AccessToken.getCurrentAccessToken()
          .then((data) => {
            const { accessToken } = data;
            let token = accessToken.toString();
            return fetch(
              "https://graph.facebook.com/v2.5/me?fields=email,name,first_name,last_name,birthday,picture.type(large),friends&access_token=" +
              token,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            ).then((response) =>
              response.json().then((fbData) => {
                body = {
                  usertypeid: 1,
                  device_type: Platform.OS == "ios" ? "2" : "1",
                  device_token: accessToken,
                  device_id: "test",
                  social_token: fbData?.id,
                  social_platform: 1,
                  longitude: authReducer?.userCurrentLocation?.longitude,
                  latitude: authReducer?.userCurrentLocation?.latitude,
                  email: fbData?.email ? fbData?.email : '',
                  username: fbData?.name ? fbData?.name : '',
                  dob: fbData?.dob ? fbData?.dob : '',
                  profile_pic: fbData?.picture?.data?.url ? fbData?.picture?.data?.url : '',
                  user_friends: fbData?.friends?.data ? fbData?.friends?.data : ''
                };

                dispatch({
                  type: types.SOCIAL_MEDIA_SIGNIN,
                  payload: { body: body, type: "FB" },
                });
              })
            );
          })
          .catch((err) => { });
      }
    });
  };

  // Twitter Login
  const twitterLogin = async () => {
    const deviceToken = await AsyncStorageLib.getItem("deviceToken");

    try {
      RNTwitterSignIn.init(
        "9XKm3hH9KCxljrA3R0MEugiD6",
        "yOFBDbId8RXSLUVQ37JOJ8ds4qGFCjrwVpcP7ms7CrX7leHp5k"
      );
      const twLogin = await RNTwitterSignIn.logIn();

      if (twLogin.userID) {
        getUniqueId().then((data) => {
          let body = {
            usertypeid: 1,
            device_type: Platform.OS == "ios" ? "2" : "1",
            device_info: data,
            social_platform: 2,
            longitude: authReducer?.userCurrentLocation?.longitude,
            latitude: authReducer?.userCurrentLocation?.latitude,
            device_token: deviceToken,
            device_id: "test",
            username: twLogin.userName ? twLogin.userName : '',
            email: twLogin.email ? twLogin.email : '',
            social_token: twLogin.userID ? twLogin.userID : ''
          };

          dispatch({
            type: types.SOCIAL_MEDIA_SIGNIN,
            payload: { body: body, type: "TW" },
          });
        });
      }
    } catch (error) {
      if (Platform.OS == "android") {
        let obj = JSON.stringify(error);
        let errorObj = JSON.parse(obj).message;
        let test = errorObj.substring(1, errorObj.length - 1).slice(12);
        let deviceInfo = getUniqueId();
        if (JSON.parse(test)) {
          let userObj = JSON.parse(test);

          let body = {
            social_token: userObj?.userID,
            email: "",
            username: userObj?.userName,
            usertypeid: 1,
            device_type: Platform.OS == "ios" ? "2" : "1",
            device_info: deviceInfo,
            social_platform: 2,
            longitude: authReducer?.userCurrentLocation?.longitude,
            latitude: authReducer?.userCurrentLocation?.latitude,
            device_token: deviceToken,
            device_id: "test",
          };
          dispatch({
            type: types.SOCIAL_MEDIA_SIGNIN,
            payload: { body: body, type: "TW" },
          });
        } else {
        }
      }
    }
  };


  const createUserAccount = () => {
    setEmail("");
    setPassword("");
    navigation.navigate("Register");
  };

  return authReducer?.registrationLoader ? (
    <View style={styles.loaderView}>
      <ActivityIndicator color={colors.appBlueColor} />
    </View>
  ) : (
    <ScrollView style={styles.container}>
      {/* Back button */}
      <View style={styles?.backButtonView}></View>

      {/* Welcome text  */}
      <View style={styles?.welcomeView}>
        <Text style={styles?.welcometext}>{message?.welcomeback}</Text>
      </View>

      {/* Email id */}
      <View style={styles.emailAndTextinputView}>
        <View
          style={{
            ...styles.textInpuViewStyle,
            borderColor: emailFocus ? colors.logout : colors.lightGrey,
          }}
        >
          <TextInput
            placeholderTextColor={colors?.grey}
            style={styles.textInputStyle1}
            placeholder={"Enter your email address"}
            value={email}
            onChangeText={(e) => setEmail(e)}
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
            onFocus={() => setEmailFocus(!emailFocus)}
            onBlur={() => setEmailFocus(!emailFocus)}
          />
        </View>
      </View>

      {/* password */}
      <View style={styles.passAndTextinputView}>
        <View
          style={{
            ...styles.textInpuViewStyle,
            borderColor: passFocus ? colors.logout : colors.lightGrey,
          }}
        >
          <TextInput
            maxLength={20}
            autoCapitalize="none"
            placeholder="Enter password"
            placeholderTextColor={colors?.grey}
            onChangeText={(text) => {
              setPassword(text);
            }}
            style={styles.textInputStyle1}
            secureTextEntry={!showPassword}
            value={password}
            onFocus={() => setPassFocus(!passFocus)}
            onBlur={() => setPassFocus(!passFocus)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Image
                source={require("../../../assets/icons/eye_on.png")}
                style={styles?.eyeIcon}
                resizeMode={"contain"}
              />
            ) : (
              <Image
                source={require("../../../assets/icons/eye_off.png")}
                style={styles?.eyeIcon}
                resizeMode={"contain"}
              />
            )}
          </TouchableOpacity>
        </View>
        {password?.length > 5 && !isValidPass ? (
          <Text style={styles.errorText}>
            Password should be greater than and equal to 8 characters and have
            at least one symbol (!@#$%^&*).
          </Text>
        ) : null}
      </View>

      {/* Forgot password */}
      <View style={styles?.forgotView}>
        <Text
          style={styles?.forgotText}
          onPress={() => NavigationService.navigate("ForgotPassword")}
        >
          {"Recover Password "}
        </Text>
      </View>
      {/* Login button  */}
      <View
        style={{
          ...styles?.buttonView,
          opacity: !(verifyEmail(email) && isValidPass) ? 0.5 : 1,
        }}
      >
        <LinearButton
          disabled={!(verifyEmail(email) && isValidPass)}
          title={"LOGIN"}
          onPress={() => onSubmitButtonPress()}
          loader={authReducer?.registrationLoader}
        />
      </View>

      {/* create new account text*/}
      <View style={styles?.createaccountView}>
        <Text style={styles?.createAccountText}>
          <Text
            style={styles.createAccountText1}
            onPress={() => createUserAccount()}
          >
            {message?.createAccount}
          </Text>
        </Text>
      </View>

      {/* Horizontal line  */}
      <View style={styles?.hrLine} />

      {/* social sign in  */}
      <View style={styles?.otherSigninView}>
        <Text style={styles?.otherSigninText}>{message?.signinfbtwitter}</Text>
      </View>

      {/* Social signin buttons  */}
      <View style={styles?.socialButtonMainView}>
        <TouchableOpacity
          style={styles?.socialButtontouch1}
          onPress={() => _faceBookLogin()}
        >
          <Image
            source={require("../../../assets/icons/facebook.png")}
            style={styles?.socialIconTouch}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles?.socialButtontouch2}
          onPress={() => twitterLogin()}
        >
          <Image
            source={require("../../../assets/icons/twitter.png")}
            style={styles?.socialIconTouch}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default Login;
