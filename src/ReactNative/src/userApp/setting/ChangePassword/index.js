import React, { useEffect, useState } from "react";
import { View } from "react-native";

// Third Party
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

// Constants
import { styles } from "./styles";
import { types } from "../../../action/ActionType";
import LinearButton from "../../commonComponents/LinearButton";
import CustomTextInput from "../../commonComponents/TextInput";
import HeaderSection from "../../commonComponents/HeaderSection";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [showPassword, setpasswordShow] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewConfirm] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showConfirmPassword, setShowpasswordConfirm] = useState(false);

  const authReducer = useSelector((state) => state?.authReducer);

  useEffect(() => {
    dispatch({
      type: types.REGISTRATION_LOADER,
      payload: false,
    });
  }, []);

  const onChangeButtonPress = () => {
    if (
      currentPassword?.length > 5 &&
      confirmPassword?.length > 5 &&
      confirmPassword === confirmNewPassword
    ) {
      let body = {
        CurrentPassword: currentPassword,
        NewPassword: confirmNewPassword,
      };
      dispatch({
        type: types.CHANGE_PASSWORD_API,
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
        title={"Change Password"}
        backButton={true}
        on
        onBackPress={() => navigation.goBack()}
      />

      {/* Settings items */}
      <View style={styles?.itemMainView}>
        <View style={styles.containerStyle}>
          <CustomTextInput
            type={"password"}
            placeholder={"Current Password"}
            value={currentPassword}
            onChangeText={(e) => setCurrentPassword(e)}
            showPassword={showPassword}
            setShowPassword={() => setpasswordShow(!showPassword)}
          />
          <CustomTextInput
            type={"password"}
            placeholder={"New Password"}
            value={confirmPassword}
            onChangeText={(e) => setConfirmPassword(e)}
            showPassword={showNewPassword}
            setShowPassword={() => setShowNewConfirm(!showNewPassword)}
          />
          <CustomTextInput
            type={"password"}
            placeholder={"Confirm New Password"}
            value={confirmNewPassword}
            onChangeText={(e) => setConfirmNewPassword(e)}
            showPassword={showConfirmPassword}
            setShowPassword={() => setShowpasswordConfirm(!showConfirmPassword)}
          />
        </View>

        <View style={styles.buttonView}>
          <LinearButton
            title={"CHANGE PASSWORD"}
            onPress={() => onChangeButtonPress()}
            loader={authReducer?.registrationLoader}
          />
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;
