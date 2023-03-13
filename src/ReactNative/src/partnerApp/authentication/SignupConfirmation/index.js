import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";

// Third Party
import { useNavigation } from "@react-navigation/native";

// Constants
import { styles } from "./styles";
import { message } from "../../../constant/message";

const SignupConfirmation = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation?.navigate("PartnerLogin");
      alert(
        "We have sent you a verification link on your mail. Please verify your email first"
      );
    }, 5000);
  }, []);

  return (
    <View style={styles?.mainContaiber}>
      <View style={styles?.subView}>
        <Image
          source={require("../../../assets/icons/signup_verify.png")}
          style={styles?.imageICons}
        />
        <Text style={styles?.underverifyText}>
          {message?.underVaerification}
        </Text>
        <Text style={styles?.detailsText}>{message?.signupVerifyDetails}</Text>
      </View>
    </View>
  );
};


export default SignupConfirmation;
