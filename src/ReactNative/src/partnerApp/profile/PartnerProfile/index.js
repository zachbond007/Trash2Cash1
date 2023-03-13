import React, { useEffect } from "react";
import { View, Text, ImageBackground, Image, ActivityIndicator } from "react-native";

// Third Party
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";

const PartnerProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state?.authReducer?.partnerUserDetails);
  const authReducer = useSelector((state) => state?.authReducer);

  useEffect(() => {
    dispatch({
      type: types?.GET_PARTNER_DETAILS,
    });
    dispatch({
      type: types?.PROFILE_LOADER,
      payload: false,
    });
  }, []);

  const editPartnerProfile = () => {
    navigation.navigate("EditPartnerProfile");
  };
  return (
    <View style={styles?.mainContainer}>
      {/* Back button */}
      <HeaderSection
        backButton={true}
        onBackPress={() => navigation?.goBack()}
        title={"Profile"}
        settings={true}
        onSettingPress={() => navigation?.navigate("PartnerSettings")}
      />

      {/* Profile logo */}
      <View style={styles?.upperStyle}>
        <TouchableOpacity
          style={styles?.profileMainView}
          onPress={() => editPartnerProfile()}
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
          <Text style={styles?.usernametext}>{userDetails?.username}</Text>
          <Text style={styles?.emailStyle}>{userDetails?.email}</Text>
        </View>
      </View>
    </View>
  );
};


export default PartnerProfile;
