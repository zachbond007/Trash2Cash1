import React, { useEffect } from "react";
import { View, Text, Platform, ImageBackground, Image, PermissionsAndroid, ScrollView } from "react-native";

// Third Party
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants 
import { styles } from "./styles";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";

const OnBoarding = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    userLocationUpdate();
  }, []);

  const onBusinessPress = (type) => {
    dispatch({
      type: types?.LOGIN_USER_TYPE,
      payload: type,
    });

    if (type == "USER") {
      navigation.navigate("Login");
    } else {
      navigation.navigate("PartnerLogin");
    }
  };

  const userLocationUpdate = async () => {
    if (Platform.OS == "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Trash2Cash",
            message: "Trash2Cash App access to your location.",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => {
              if (position.coords.latitude && position.coords.longitude) {
                let location = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                };
                dispatch({
                  type: types?.UPDATE_USER_CURRENT_LOCATION,
                  payload: { location: location },
                });
              } else {
                dispatch({
                  type: types?.CURRENT_LOCATION_STATUS,
                  payload: false,
                });
              }
            },
            (error) => {
              dispatch({
                type: types?.CURRENT_LOCATION_STATUS,
                payload: false,
              });
            },
            {
              showLocationDialog: true,
              enableHighAccuracy: false,
              timeout: 20000,
              maximumAge: 0,
            }
          );
        } else {
          dispatch({
            type: types?.CURRENT_LOCATION_STATUS,
            payload: false,
          });
        }
      } catch (err) {
        dispatch({
          type: types?.CURRENT_LOCATION_STATUS,
          payload: false,
        });
      }
    } else {
      Geolocation?.requestAuthorization();
      Geolocation.getCurrentPosition(
        (position) => {
          if (position.coords.latitude && position.coords.longitude) {
            let location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            dispatch({
              type: types?.UPDATE_USER_CURRENT_LOCATION,
              payload: { location: location },
            });
          } else {
            dispatch({
              type: types?.CURRENT_LOCATION_STATUS,
              payload: false,
            });
          }
        },
        (error) => {
          dispatch({
            type: types?.CURRENT_LOCATION_STATUS,
            payload: false,
          });
        },
        {
          showLocationDialog: true,
          timeout: 30000,
          maximumAge: 0,
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={styles?.ImageBackground}
          source={require("../../../assets/icons/boarding_bg.png")}
        >
          <View style={styles?.upperStyle}>
            <Image
              source={require("../../../assets/icons/splash_logo.png")}
              style={styles?.uperImage}
              resizeMode={"contain"}
            />
          </View>

          <View style={styles.lowerStyle}>
            <View style={styles?.bottomview}>
              <View>
                <Text style={styles?.chooseAccounText}>
                  {message?.chooseAccountType}
                </Text>
              </View>

              {/* do and verify */}
              <TouchableOpacity
                style={styles.cardStyle}
                onPress={() => onBusinessPress("USER")}
              >
                <View style={styles?.tickIconView}>
                  <Image
                    source={require("../../../assets/icons/consumer.png")}
                    style={styles?.tickIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles?.cardTextView}>
                  <Text style={styles?.cardTextStyle}>{message?.consumer}</Text>
                  <Text style={styles?.cardTextStyle1}>
                    {message?.listyouraccess}
                  </Text>
                </View>
                <View style={styles?.arrowiconView}>
                  <Image
                    source={require("../../../assets/icons/right_arrow.png")}
                    style={styles?.arrowStyles}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              {/* List your bussiness */}
              <TouchableOpacity
                style={{ ...styles.cardStyle, marginTop: wp("8%") }}
                onPress={() => onBusinessPress("PARTNER")}
              >
                <View style={styles?.tickIconView}>
                  <Image
                    source={require("../../../assets/icons/business.png")}
                    style={styles?.tickIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles?.cardTextView}>
                  <Text style={styles?.cardTextStyle}>{message?.business}</Text>
                  <Text style={styles?.cardTextStyle1}>
                    {message?.doandverify}
                  </Text>
                </View>
                <View style={styles?.arrowiconView}>
                  <Image
                    source={require("../../../assets/icons/right_arrow.png")}
                    style={styles?.arrowStyles}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default OnBoarding;
