import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, } from "react-native";

// Third Party
import { useSelector, useDispatch } from "react-redux";

//Constants
import { styles } from "./styles";
import { images } from "../../../constant/images";
import { types } from "../../../action/ActionType";
import NavigationService from "../../../routing/NavigationService";

const HeaderSection = ({
  backButton,
  onBackPress,
  title,
  titleStyle,
  notification,
  settings,
  onSettingPress,
  flash,
  camera,
  profile,
  onProfilePress,
  onCameraPress,
  onFlashPress,
  profileRight,
  rightText,
  rightTextClick,
  whiteBack,
  notificationList,
}) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((State) => State?.authReducer);
  const [flashLight, setFlashLight] = useState(false);
  useEffect(() => { }, [flashLight]);
  return (
    <View style={styles?.backButtonView}>
      {/* Left view */}
      <View>
        {backButton ? (
          <TouchableOpacity
            onPress={() => {
              onBackPress(),
                dispatch({ type: types.BUTTON_LOADER, payload: false });
            }}
          >
            <Image
              source={
                whiteBack
                  ? require("../../../assets/icons/back_white.png")
                  : require("../../../assets/icons/Back.png")
              }
              style={styles?.backiconstyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : profile ? (
          <TouchableOpacity onPress={() => onProfilePress()}>
            <Image
              source={
                authReducer?.userDetails?.profile_pic
                  ? { uri: authReducer?.userDetails?.profile_pic }
                  : require("../../../assets/icons/user_circle.png")
              }
              style={styles?.profileIcon}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>

      {/* center view */}
      <View>
        <Text style={{ ...styles?.titleStyle, ...titleStyle }}>
          {title || ""}
        </Text>
      </View>

      {/* Right view */}
      <View style={styles.headerRightView}>
        {rightText && (
          <TouchableOpacity
            style={styles.rightTextView}
            onPress={() => rightTextClick && rightTextClick()}
          >
            <Text style={styles.rightText}>{rightText}</Text>
          </TouchableOpacity>
        )}
        {flash && (
          <TouchableOpacity
            onPress={() => {
              onFlashPress(), setFlashLight(!flashLight);
            }}
            style={styles.flashTouch}
          >
            <Image
              source={
                flashLight
                  ? require("../../../assets/icons/flash_off.png")
                  : require("../../../assets/icons/flash_on.png")
              }
              style={styles?.backiconstyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {notification ? (
          notificationList ? (
            <TouchableOpacity
              onPress={() => NavigationService?.navigate("Notifications")}
            >
              <Image
                source={require("../../../assets/icons/new_notification.png")}
                style={styles?.notiIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => NavigationService?.navigate("Notifications")}
            >
              <Image
                source={require("../../../assets/icons/notifications.png")}
                style={styles?.notiIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )
        ) : settings ? (
          <TouchableOpacity onPress={() => onSettingPress()}>
            <Image
              source={require("../../../assets/icons/settings.png")}
              style={styles?.backiconstyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : camera ? (
          <TouchableOpacity onPress={() => onCameraPress()}>
            <Image
              source={require("../../../assets/icons/flip_camera.png")}
              style={styles?.backiconstyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : profileRight ? (
          <TouchableOpacity onPress={() => onProfilePress()}>
            <Image
              source={
                authReducer?.userDetails?.profile_pic ||
                  authReducer?.partnerUserDetails?.profile_pic
                  ? {
                    uri:
                      authReducer?.userDetails?.profile_pic ||
                      authReducer?.partnerUserDetails?.profile_pic,
                  }
                  : images.user_circle
              }
              style={styles?.profileIcon}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <View>
            <Text style={styles.emptyText}> </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default HeaderSection;
