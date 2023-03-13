import React, { useState } from "react";
import { View, Text, Platform, Image, TouchableOpacity, NativeModules } from "react-native";

// Third-Party
import moment from "moment";
import { getUniqueId } from "react-native-device-info";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { TextInput } from "react-native-gesture-handler";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Constants
import { styles } from "./styles"
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import CustomTextInput from "../../commonComponents/TextInput";
import LinearButton from "../../commonComponents/LinearButton";
import { dobRegex, emailRegex, mobileRegex, passwordRegex } from "../../../constant/regex";

const { RNTwitterSignIn } = NativeModules;

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [dobFocus, setDobFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [conpassFocus, setConpassFocus] = useState(false);
  const [createvalue, setCreateValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullnameFocus, setFullnameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const authReducer = useSelector((State) => State?.authReducer);

  const onDateConfirmPress = (time) => {
    if (getAge(time) > 18) {
      setDob(time);
    } else {
      showMessage({
        message: "Age must be greater than 18",
        type: "danger",
      });
    }
    setDatePickerVisible(false);
  };

  const getAge = (birthDateString) => {
    let years = moment().diff(birthDateString, "years");
    return years;
  };

  const verifyEmail = (email) => {
    return emailRegex.test(String(email).toLowerCase());
  };

  // Facebook Login
  const _faceBookLogin = () => {
    if (Platform.OS === "android") {
      LoginManager.setLoginBehavior("web_only");
    }
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      (result) => {
        if (result.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken()
            .then((data) => {
              const { accessToken } = data;
              let token = accessToken.toString();

              return fetch(
                "https://graph.facebook.com/v2.5/me?fields=email,name,first_name,last_name,picture.type(large),friends&access_token=" +
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
                    UserTypeId: 1,
                    device_type: Platform.OS == "ios" ? "2" : "1",
                    device_token: "sdsdfssdfsds",
                    device_id: "test",
                    social_token: fbData?.id,
                    social_platform: 1,
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
            .catch((err) => {
            });
        }
      }
    );
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




  let isValidPass = passwordRegex.test(password);

  const onSubmitButtonPress = () => {
    setCreateValue(true);

    if (
      verifyEmail(email) &&
      password?.length > 5 &&
      isValidPass &&
      password === confirmPassword &&
      phone?.length > 8
    ) {
      if (fullname?.trim() == "") {
        showMessage({
          message: "Please enter valid user name!",
          type: "danger",
        });
      } else if (!mobileRegex.test(phone)) {
        showMessage({
          message: "Please enter valid phone no!",
          type: "danger",
        });
      } else if (dob) {
        let dOb = moment(dob, "MM/DD/YYYY").format("DD-MM-YYYY");
        let currentDate = moment().format("DD-MM-YYYY");

        let startDate = moment(dOb, "DD-MM-YYYY");
        let endDate = moment(currentDate, "DD-MM-YYYY");
        let yearDiff = endDate.diff(startDate, "years");

        if (!dobRegex.test(dob) || yearDiff < 14) {
          showMessage({
            message:
              "Please enter Date of Birth in format MM/DD/YYYY or valid date.",
            type: "danger",
          });
        } else {
          let body = {
            username: fullname?.trim(),
            email: email.trimEnd(),
            password: password,
            usertypeid: 1,
            phone_no: phone,
            dob: moment(dob, "MM/DD/YYYY").format("MM/DD/YYYY"),
          };
          dispatch({
            type: types?.USER_SIGNUP,
            payload: { body: body, from: "signup", navigation: navigation },
          });
        }
      } else {
        let body = {
          username: fullname?.trim(),
          email: email.trimEnd(),
          password: password,
          usertypeid: 1,
          phone_no: phone,
          dob:
            dob === ""
              ? "01/01/1900"
              : moment(dob, "MM/DD/YYYY").format("MM/DD/YYYY"),
        };
        dispatch({
          type: types?.USER_SIGNUP,
          payload: { body: body, from: "signup", navigation: navigation },
        });
      }
    } else {
      showMessage({
        message: "Please enter valid details in all field!",
        type: "danger",
      });
    }
  };

  const setBirthDate = (text) => {
    setDob(
      text.length === 2 && !text.includes("/")
        ? `${text.substring(0, 2)}/${text.substring(5)}`
        : text.length === 5 && text.includes("/")
          ? `${text.substring(0, 5)}/${text.substring(9)}`
          : text
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* Back button */}
      <View style={styles?.backButtonView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/icons/Back.png")}
            style={styles?.backiconstyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "android" ? wp("50%") : null,
        }}
        enableOnAndroid={true}
      >
        {/* Welcome text  */}
        <View style={styles?.welcomeView}>
          <Text style={styles?.welcometext}>{message?.createanaccount}</Text>
          <Text style={styles?.welcometext2}>
            {message?.pleaseenterdetails}
          </Text>
        </View>

        {/* Full name */}
        <View style={styles.inputView}>
          <CustomTextInput
            placeholder={"Full name"}
            value={fullname}
            maxlength={30}
            onChangeText={(e) => setFullName(e)}
            error={createvalue && fullname?.length == 0}
            autoCapitalize={"words"}
            onFocus={() => setFullnameFocus(!fullnameFocus)}
            onBlur={() => setFullnameFocus(!fullnameFocus)}
            isfocus={fullnameFocus}
          />
        </View>
        {/* Email address */}
        <View style={styles.inputView}>
          <CustomTextInput
            placeholder={"Email address"}
            value={email}
            onChangeText={(e) => setEmail(e)}
            error={createvalue && !verifyEmail(email)}
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
            onFocus={() => setEmailFocus(!emailFocus)}
            onBlur={() => setEmailFocus(!emailFocus)}
            isfocus={emailFocus}
          />
        </View>

        {/* phone number */}
        <View style={styles.inputView}>
          <CustomTextInput
            placeholder={"Phone Number"}
            maxlength={10}
            value={phone}
            onChangeText={(e) => setPhone(e)}
            keyboardType={"phone"}
            error={createvalue && phone?.length < 8}
            onFocus={() => setPhoneFocus(!phoneFocus)}
            onBlur={() => setPhoneFocus(!phoneFocus)}
            isfocus={phoneFocus}
          />
        </View>

        {/* Date of Birth */}
        <View style={styles.inputView}>
          <CustomTextInput
            placeholder={"MM/DD/YYYY"}
            maxlength={10}
            value={dob}
            onChangeText={(text) => {
              setBirthDate(text);
            }}
            error={createvalue && dob?.length < 8}
            onFocus={() => setDobFocus(!dobFocus)}
            onBlur={() => setDobFocus(!dobFocus)}
            isfocus={dobFocus}
          />
        </View>

        {/* password */}
        <View style={styles.passAndTextinputView}>
          <View
            style={{
              ...styles.textInpuViewStyle,

              borderColor:
                createvalue && password?.length < 6 ? "red" : colors?.lightGrey,
              borderColor: passFocus ? colors.logout : colors.lightGrey,
            }}
          >
            <TextInput
              maxLength={20}
              autoCapitalize="none"
              placeholder="Password"
              placeholderTextColor={colors?.grey}
              selectionColor={colors.black}
              onChangeText={(text) => {
                setPassword(text);
              }}
              style={styles.textInputStyle1}
              secureTextEntry={!showPassword}
              value={password}
              onFocus={() => setPassFocus(!passFocus)}
              onBlur={() => setPassFocus(!passFocus)}
              isfocus={passFocus}
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
            <Text
              style={styles.erroeText}
            >
              Password should be greater than and equal to 8 characters and have
              at least one symbol (!@#$%^&*).
            </Text>
          ) : null}
        </View>

        {/* password */}
        <View style={styles.passAndTextinputView}>
          <View
            style={{
              ...styles.textInpuViewStyle,
              borderColor:
                createvalue && confirmPassword?.length < 6
                  ? "red"
                  : colors?.lightGrey,
              borderColor: conpassFocus ? colors.logout : colors.lightGrey,
            }}
          >
            <TextInput
              maxLength={20}
              autoCapitalize="none"
              placeholder="Confirm Password"
              placeholderTextColor={colors?.grey}
              selectionColor={colors.black}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              style={styles.textInputStyle1}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onFocus={() => setConpassFocus(!conpassFocus)}
              onBlur={() => setConpassFocus(!conpassFocus)}
              isfocus={conpassFocus}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
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
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(e) => onDateConfirmPress(e)}
          onCancel={() => setDatePickerVisible(false)}
        />

        {/* signup button  */}
        <View
          style={{
            ...styles?.buttonView,
            opacity: !(
              verifyEmail(email) &&
              password?.length > 5 &&
              isValidPass &&
              password === confirmPassword &&
              phone?.length > 8
            )
              ? 0.5
              : 1,
          }}
        >
          <LinearButton
            disabled={
              !(
                verifyEmail(email) &&
                password?.length > 5 &&
                isValidPass &&
                password === confirmPassword &&
                phone?.length > 8
              )
            }
            title={message?.submit}
            touch={styles.backButtonView}
            onPress={() => onSubmitButtonPress()}
            loader={authReducer?.registrationLoader}
          />
        </View>

        {/* create new account text*/}
        <View style={styles?.createaccountView}>
          <Text style={styles?.createAccountText}>
            {message?.allreadyhaveanaccount}{" "}
            <Text
              style={styles.signinText}
              onPress={() => navigation.navigate("Login")}
            >
              {message?.signin}
            </Text>
          </Text>
        </View>

        {/* Horizontal line  */}
        <View style={styles?.hrLine} />

        {/* social sign in  */}
        <View style={styles?.otherSigninView}>
          <Text style={styles?.otherSigninText}>
            {message?.signinfbtwitter}
          </Text>
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

        <View style={styles?.blankSpace} />
      </KeyboardAwareScrollView>
    </View>
  );
};


export default Register;
