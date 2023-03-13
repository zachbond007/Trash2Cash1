import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

// Third Party
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import { emailRegex } from "../../../constant/regex";
import NavigationService from "../../../routing/NavigationService";
import LinearButton from "../../../userApp/commonComponents/LinearButton";

const PartnerLogin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const authReducer = useSelector((State) => State?.authReducer);
  const homeReducer = useSelector((State) => State?.homeReducer);

  useEffect(() => {
    dispatch({
      type: types?.REGISTRATION_LOADER,
      payload: false,
    });
  }, []);

  const verifyEmail = (email) => {
    return emailRegex.test(String(email?.trim()).toLowerCase());
  };

  const onSubmitButtonPress = () => {
    if (verifyEmail(email) && password?.length > 5) {
      let body = {
        email: email,
        password: password,
        DomainId: homeReducer?.loginType == "USER" ? 1 : 2,
      };
      dispatch({
        type: types?.USER_LOGIN,
        payload: { body: body, from: "login" },
      });
    } else {
      showMessage({
        message: "Please enter valid email and password!",
        type: "danger",
      });
    }
  };

  const createPartnerAccount = () => {
    setEmail("");
    setPassword("");
    navigation.navigate("PartnerRegister");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back button */}
      <View style={styles?.backButtonView}>
        <TouchableOpacity onPress={() => navigation.navigate("OnBoarding")}>
          <Image
            source={require("../../../assets/icons/Back.png")}
            style={styles?.backiconstyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Welcome text  */}
      <View style={styles?.welcomeView}>
        <Text style={styles?.welcometext}>{message?.welcomeback}</Text>
        <Text style={styles?.welcometext2}>{message?.enteryouremail}</Text>
      </View>

      {/* Email id */}
      <View style={styles.emailAndTextinputView}>
        <View
          style={styles.textInpuViewStyle}
        >
          <TextInput
            placeholder={"Enter your email address"}
            value={email}
            onChangeText={(e) => setEmail(e)}
            placeholderTextColor={colors?.grey}
            style={styles.textInputStyle1}
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
          />
        </View>
      </View>

      {/* password */}
      <View style={styles.passAndTextinputView}>
        <View
          style={styles.textInpuViewStyle}
        >
          <TextInput
            maxLength={20}
            autoCapitalize="none"
            placeholder="Enter password"
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
          <Text
            style={styles.buttonText1}
            onPress={() => createPartnerAccount()}
          >
            {message?.createAccount}
          </Text>
        </Text>
      </View>
      <View style={styles.emptyView} />
    </ScrollView>
  );
};


export default PartnerLogin;
