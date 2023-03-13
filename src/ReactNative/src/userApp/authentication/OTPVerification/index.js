import React, { useState } from "react";
import { View, Text } from "react-native";

// Third-Party
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native-gesture-handler";
import OTPInputView from "@twotalltotems/react-native-otp-input";

// Constants
import { styles } from "./styles";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import LinearButton from "../../commonComponents/LinearButton";
import NavigationService from "../../../routing/NavigationService";
import HeaderSection from "../../commonComponents/HeaderSection";

const OTPVerification = ({ route }) => {
  const dispatch = useDispatch();
  const [codedata, setCodedata] = useState("");

  const authReducer = useSelector((state) => state.authReducer);

  const onOtpSubmit = () => {
    if (codedata?.length == 6) {
      let body = {
        email: route?.params?.email,
        OTP: codedata,
      };
      dispatch({
        type: types?.OTP_VERIFY_API,
        payload: { body: body },
      });
    } else {
      showMessage({
        message: "Please enter 6 digit's OTP",
        type: "danger",
      });
    }
  };

  const onResendButtonPress = () => {
    const body = {
      email: route?.params?.email,
    };
    dispatch({
      type: types.USER_EMAIL_VERIFICATION,
      payload: { body: body },
    });
  };

  return (
    <ScrollView style={styles.mainContainer}>
      {/* Back button */}
      <HeaderSection
        backButton={true}
        onBackPress={() => NavigationService?.goBack()}
        title={"Verify"}
      />

      {/* Welcome text  */}
      <View style={styles?.welcomeView}>
        <Text style={styles?.welcometext}>{message?.otpverification}</Text>
        <Text style={styles?.welcometext2}>{message?.otpverification2}</Text>
      </View>

      <OTPInputView
        style={styles.otpStyle}
        pinCount={6}
        code={codedata} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={(code) => setCodedata(code)}
        autoFocusOnLoad={true}
        keyboardType={"default"}
        keyboardAppearance={"default"}
        codeInputFieldStyle={styles.underlineStyleBase}
      />
      <View style={styles?.resendView}>
        <Text style={styles?.resendText1} onPress={() => onResendButtonPress()}>
          Don't receive code? <Text style={styles?.resendText2}>Resend</Text>
        </Text>
      </View>

      <View style={styles?.blanckView}>
        <LinearButton
          title={message?.submit}
          onPress={() => onOtpSubmit()}
          loader={authReducer?.registrationLoader}
        />
      </View>
    </ScrollView>
  );
};

export default OTPVerification;
