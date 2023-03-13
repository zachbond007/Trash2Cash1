import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

// Third-Party
import { useDispatch, useSelector } from "react-redux";

// Constants
import { styles } from "./styles";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import { passwordRegex } from "../../../constant/regex";
import CustomTextInput from "../../commonComponents/TextInput";
import LinearButton from "../../commonComponents/LinearButton";
import HeaderSection from "../../commonComponents/HeaderSection";
import NavigationService from "../../../routing/NavigationService";

const CreateNewPassword = ({ route }) => {
  const dispatch = useDispatch();
  const [showNewPassword, setShowNewConfirm] = useState(false);
  const [showConfirmPassword, setShowpasswordConfirm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const authReducer = useSelector((state) => state?.authReducer);

  useEffect(() => {
    dispatch({
      type: types.REGISTRATION_LOADER,
      payload: false,
    });
  }, []);

  let isValidPass = passwordRegex.test(confirmPassword);

  const onSubmitButtonPress = () => {
    if (
      confirmPassword?.length > 7 &&
      confirmPassword === confirmNewPassword &&
      isValidPass
    ) {
      let body = {
        NewPassword: confirmNewPassword,
        email: route?.params?.body?.email,
        OTP: route?.params?.body?.OTP,
      };
      dispatch({
        type: types.CREATE_NEW_PASSWORD,
        payload: { body: body },
      });
    } else {
      showMessage({
        message: "Please enter valid details",
        type: "danger",
      });
    }
  };

  return (
    <View style={styles?.mainContainer}>
      <HeaderSection
        title={"New Password"}
        backButton={true}
        on
        onBackPress={() => NavigationService.goBack()}
      />

      {/* Settings items */}
      <View style={styles?.itemMainView}>
        <View style={styles.inputContainer}>
          <CustomTextInput
            type={"password"}
            placeholder={"New Password"}
            value={confirmPassword}
            onChangeText={(e) => setConfirmPassword(e)}
            showPassword={showNewPassword}
            setShowPassword={() => setShowNewConfirm(!showNewPassword)}
          />
          {confirmPassword?.length > 7 && !isValidPass ? (
            <Text
              style={styles.errorText}
            >
              Password should be greater than and equal to 8 characters and have
              at least one symbol (!@#$%^&*).
            </Text>
          ) : null}
          <CustomTextInput
            type={"password"}
            placeholder={"Confirm New Password"}
            value={confirmNewPassword}
            onChangeText={(e) => setConfirmNewPassword(e)}
            showPassword={showConfirmPassword}
            setShowPassword={() => setShowpasswordConfirm(!showConfirmPassword)}
          />
        </View>

        <View
          style={styles.buttonView}
        >
          <LinearButton
            title={message?.submit}
            onPress={() => onSubmitButtonPress()}
            loader={authReducer?.registrationLoader}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateNewPassword;
