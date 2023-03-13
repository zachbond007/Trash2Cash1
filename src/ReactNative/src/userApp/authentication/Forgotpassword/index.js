import React, { useState } from "react";
import { View, Text, ImageBackground, Image } from "react-native";

// Third-Party
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Constants
import { styles } from "./styles";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import { emailRegex } from "../../../constant/regex";
import LinearButton from "../../commonComponents/LinearButton";
import CustomTextInput from "../../commonComponents/TextInput";
import HeaderSection from "../../commonComponents/HeaderSection";

const ForgotPassword = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [emailPhoneText, setEmailPhoneText] = useState("");
  const authReducer = useSelector((state) => state.authReducer);

  const onEmailVerify = () => {
    const verifyEmail = (email) => {
      return emailRegex.test(String(email).toLowerCase());
    };

    if (emailPhoneText.length > 0) {
      if (verifyEmail(emailPhoneText)) {
        {
          const body = {
            email: emailPhoneText,
          };
          dispatch({
            type: types.USER_EMAIL_VERIFICATION,
            payload: { body: body },
          });
        }
      } else {
        showMessage({
          message: "Please enter a valid email or phone number",
          type: "danger",
        });
      }
    } else {
      showMessage({
        message: "Please enter  email or phone number",
        type: "danger",
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainContainer}>
        <ImageBackground
          style={styles?.ImageBackground}
          source={require("../../../assets/icons/boarding_bg.png")}
        >
          {/* Back button */}
          <View style={styles.headerView}>
            <HeaderSection
              backButton={true}
              onBackPress={() => navigation.goBack()}
            />
          </View>

          {/* upper image logo */}
          <View style={styles?.upperStyle}>
            <Image
              source={require("../../../assets/icons/splash_logo.png")}
              style={styles?.uperImage}
              resizeMode={"contain"}
            />
          </View>

          <View style={styles.lowerStyle}>
            <View style={styles?.bottomview}>
              {/* forgot password text */}
              <View>
                <Text style={styles?.chooseAccounText}>
                  {"Recover Password"}
                </Text>
                <Text style={styles?.welcometext2}>
                  {message?.forgotpasswordtext2}
                </Text>
              </View>

              {/* Email Text input  */}
              <View style={styles.emailView}>
                <CustomTextInput
                  placeholder={"Email address"}
                  value={emailPhoneText}
                  onChangeText={(e) => setEmailPhoneText(e)}
                />
              </View>

              {/* Send link button */}
              <View style={styles.buttonView}>
                <LinearButton
                  title={"SEND LINK"}
                  onPress={() => onEmailVerify()}
                  onChangeText={(e) => setEmailPhoneText(e)}
                  value={emailPhoneText}
                  loader={authReducer?.registrationLoader}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;
