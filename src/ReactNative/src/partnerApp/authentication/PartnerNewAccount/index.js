import React, { useEffect, useState } from "react";
import { TextInput, View, Text, Platform, Image, TouchableOpacity } from "react-native";

// Third Party
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import { emailRegex } from "../../../constant/regex";
import NavigationService from "../../../routing/NavigationService";
import CustomTextInput from "../../../userApp/commonComponents/TextInput";
import LinearButton from "../../../userApp/commonComponents/LinearButton";

const PartnerRegister = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [createValue, setCreateValue] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const authReducer = useSelector((State) => State?.authReducer);
  const homeReducer = useSelector((State) => State?.homeReducer);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    dispatch({
      type: types?.REGISTRATION_LOADER,
      payload: false,
    });
  }, []);

  const verifyEmail = (email) => {
    return emailRegex.test(String(email).toLowerCase());
  };

  const onSubmitButtonPress = () => {
    setCreateValue(true);
    if (fullname?.trim() == "") {
      showMessage({
        message: "Please entesr valid user name!",
        type: "danger",
      });
    } else if (
      !verifyEmail(email) &&
      password?.length > 5 &&
      password === confirmPassword
    ) {
      showMessage({
        message: "Please enter valid details in all field!",
        type: "danger",
      });
    } else {
      let body = {
        username: fullname?.trim(),
        email: email?.trim(),
        password: password,
        usertypeid: homeReducer?.loginType == "USER" ? 1 : 2,
      };

      NavigationService?.navigate("BusinessProfile", { basicData: body });
    }
  };

  return (
    <View style={styles.container}>
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
        showVerticalInticator={false}
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
            onChangeText={(e) => setFullName(e)}
            error={createValue && fullname?.length == 0}
          />
        </View>
        {/* Email id */}
        <View style={styles.inputView}>
          <CustomTextInput
            placeholder={"Email address"}
            value={email}
            onChangeText={(e) => setEmail(e)}
            error={createValue && !verifyEmail(email)}
          />
        </View>

        {/* password */}
        <View style={styles.passAndTextinputView}>
          <View
            style={{
              ...styles.textInpuViewStyle,
              borderColor:
                createValue && password?.length < 6 ? "red" : colors?.lightGrey,
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
        </View>

        {/* confirm password */}
        <View style={styles.passAndTextinputView}>
          <View
            style={{
              ...styles.textInpuViewStyle,
              borderColor:
                createValue && confirmPassword?.length < 6
                  ? "red"
                  : colors?.lightGrey,
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

        {/* Login button  */}
        <View style={styles?.buttonView}>
          <LinearButton
            title={"NEXT"}
            onPress={() => onSubmitButtonPress()}
            loader={authReducer?.registrationLoader}
          />
        </View>

        {/* create new account text*/}
        <View style={styles?.createaccountView}>
          <Text style={styles?.createAccountText}>
            {message?.allreadyhaveanaccount}{" "}
            <Text
              style={styles.textStyle}
              onPress={() => navigation.navigate("PartnerLogin")}
            >
              {message?.signin}
            </Text>
          </Text>
        </View>

        <View style={styles.awareView} />
      </KeyboardAwareScrollView>
    </View>
  );
};


export default PartnerRegister;
