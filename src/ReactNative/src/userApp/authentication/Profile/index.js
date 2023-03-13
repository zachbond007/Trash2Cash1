import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, ImageBackground, Image, ActivityIndicator } from "react-native";

// Third- Party
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import LinearButton from "../../commonComponents/LinearButton";
import HeaderSection from "../../commonComponents/HeaderSection";

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.authReducer?.userDetails);
  const authReducer = useSelector((state) => state?.authReducer);

  useEffect(() => {
    dispatch({
      type: types?.USER_DETAILS,
    });
    dispatch({
      type: types?.PROFILE_LOADER,
      payload: false,
    });
  }, []);

  const editUserProfile = () => {
    navigation.navigate("EditUserProfile");
  };

  return (
    <View style={styles?.mainContainer}>
      {/* Back button */}
      <HeaderSection
        backButton={true}
        onBackPress={() => navigation?.goBack()}
        title={"Profile"}
        settings={true}
        onSettingPress={() => navigation?.navigate("Settings")}
      />

      {/* Profile logo */}
      <View style={styles?.upperStyle}>
        <TouchableOpacity
          style={styles?.profileMainView}
          onPress={() => editUserProfile()}
        >
          <ImageBackground
            source={require("../../../assets/icons/profile_circle.png")}
            style={styles?.imageProfilebackground}
          >
            {userDetails?.profile_pic ? (
              <Image
                source={{ uri: userDetails?.profile_pic }}
                style={styles?.userprofile}
              />
            ) : (
              <Image
                source={require("../../../assets/icons/user_icon.png")}
                style={styles?.userprofile1}
                resizeMode="contain"
              />
            )}
          </ImageBackground>
          <View style={styles?.editView}>
            {authReducer?.profileLoader ? (
              <ActivityIndicator color={colors?.white} />
            ) : (
              <Image
                source={require("../../../assets/icons/edit.png")}
                style={styles?.editIcon}
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableOpacity>

        <View style={styles?.userView}>
          <Text style={styles?.usernametext}>
            {userDetails?.username}
            {userDetails?.dob === "1900-01-01T00:00:00"
              ? null
              : userDetails?.dob === null
                ? null
                : ","}{" "}
            {userDetails?.dob === "1900-01-01T00:00:00"
              ? null
              : userDetails?.dob === null
                ? null
                : moment().diff(userDetails?.dob, "years")}
          </Text>
          <Text style={styles?.emailStyle}>{userDetails?.email}</Text>
        </View>
      </View>

      {/* Lower side Ui part */}
      <View style={styles.lowerStyle}>
        <View style={styles?.bottomview}>
          {/* My friends  */}
          <TouchableOpacity
            style={styles?.friendsMainView}
            onPress={() => navigation.navigate("Friends", { tabIndexx: 0 })}
          >
            <View style={styles.friendView}>
              <Image
                source={require("../../../assets/icons/my_friends.png")}
                style={styles?.friendsIcon}
                resizeMode={"contain"}
              />
            </View>
            <View style={styles.friendText}>
              <Text style={styles?.titleStyle}>{message?.myFriends}</Text>
            </View>
            <View style={styles.arrowStyle}>
              <Image
                source={require("../../../assets/icons/right_arrow.png")}
                style={styles?.arrowStyles}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* Send link button */}
          <View style={styles.buttonView}>
            <LinearButton
              title={"VIEW YOUR PLAN"}
              onPress={() => navigation.navigate("Plan")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};


export default Profile;
