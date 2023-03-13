import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";

// Third Party
import { useNavigation } from "@react-navigation/native";

// Constants
import { styles } from "./styles";
import { message } from "../../../constant/message";
import LinearButton from "../../../userApp/commonComponents/LinearButton";
import CustomTextInput from "../../../userApp/commonComponents/TextInput";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";

const PartnerForgotPassword = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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

        {/* Trash logo */}
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
                {message?.forgotpassword2}
              </Text>
              <Text style={styles?.welcometext2}>
                {message?.forgotpasswordtext2}
              </Text>
            </View>

            {/* Email Text input  */}
            <View style={styles.emailInput}>
              <CustomTextInput placeholder={"Email/Phone Number"} />
            </View>

            {/* Send link button */}
            <View style={styles.sendLinkView}>
              <LinearButton title={"SEND LINK"} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PartnerForgotPassword;
