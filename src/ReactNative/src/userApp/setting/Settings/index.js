import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";

// Third Party
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { LoginManager } from "react-native-fbsdk-next";
import { useNavigation } from "@react-navigation/native";

// Constants
import { styles } from "./styles";
import SettinghItemCard from "../Itemcard";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import HeaderSection from "../../commonComponents/HeaderSection";

const Settings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [toggleValue, setToggleValue] = useState(false);
  const authReducer = useSelector((state) => state?.authReducer);
  const userDetails = useSelector((state) => state?.authReducer?.userDetails);

  const finallyLogout = async () => {
    LoginManager.logOut();
    dispatch({
      type: types.USER_LOGOUT,
      payload: {},
    });
  };
  const onLogoutPress = () => {
    Alert.alert("LOGOUT", "Do you really want to logout?", [
      {
        text: "Cancel",
        onPress: () => {
        },
        style: "cancel",
      },
      { text: "OK", onPress: () => finallyLogout() },
    ]);
  };

  const onDeletePress = () => {
    Alert.alert("DELETE ACCOUNT", "Do you really want to Delete Account?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => finallyDeleteAccount() },
    ]);
  };
  const finallyDeleteAccount = async () => {
    dispatch({
      type: types.USER_DELETE_ACCOUNT,
      payload: {},
    });
  };

  const currentLocationToggle = (value) => {
    setToggleValue(value);
    let body = {
      username: userDetails?.username,
      usertypeid: 1,
      phone_no: userDetails?.phone_no,
      dob: moment(userDetails?.dob).format("MM/DD/YYYY"),
      is_current_location: 1,
      profile: userDetails?.profile_pic,
    };
    dispatch({
      type: types?.UPDATE_USER_PROFILE,
      payload: { body: body },
    });
  };

  return (
    <View style={styles?.mainContainer}>
      <HeaderSection
        title={"Settings"}
        backButton={true}
        on
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles?.itemMainView}>
        {authReducer?.userDetails?.social_Platform == null ? (
          <SettinghItemCard
            title={message?.changepassword}
            onPress={() => navigation?.navigate("ChangePassword")}
          />
        ) : null}
        <SettinghItemCard
          title={message?.currentLocation}
          isToggle={true}
          onTogglePress={() => currentLocationToggle(!toggleValue)}
          toggleValue={toggleValue}
        />
        <SettinghItemCard
          title={message?.aboutUs}
          onPress={() => navigation?.navigate("StaticPages", { type: 1 })}
        />
        <SettinghItemCard
          title={message?.contactUs}
          onPress={() => navigation?.navigate("StaticPages", { type: 2 })}
        />
        <SettinghItemCard
          title={message?.termspolicy}
          onPress={() => navigation?.navigate("StaticPages", { type: 3 })}
        />
        <SettinghItemCard
          title={`Delete Account`}
          onPress={() => onDeletePress()}
        />
        {/* logout  */}
        <TouchableOpacity
          onPress={() => onLogoutPress()}
          style={styles.touchStyle}
        >
          <View style={styles?.textMainView}>
            <Text style={styles?.titleStyle}>{message?.logout}</Text>
          </View>

          <View style={styles?.iconView}>
            <Image
              source={require("../../../assets/icons/logout.png")}
              resizeMode="contain"
              style={styles?.toggleStyle}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
