import React, { useEffect } from "react";
import { PermissionsAndroid, Platform, View, Text } from "react-native";

// Third Party
import MapView from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import Geolocation from "@react-native-community/geolocation";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";

const MapComponent = ({ children, style, initialRegion }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state?.authReducer);

  useEffect(() => {
    userLocationUpdate();
  }, []);

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
              timeout: 30000,
              maximumAge: 0,
            }
          );
        } else {
          alert(
            "LOCATION PERMISSION DENIED!           Turn on location permission from device settings."
          );
        }
      } catch (err) {
        console.warn(err);
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
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        }
      );
    }
  };

  return authReducer?.currentLocationStatus ? (
    <MapView
      showsCompass={false}
      showsScale={false}
      showsBuildings={false}
      showsTraffic={false}
      showsIndoors={false}
      showsUserLocation={false}
      zoomEnabled={true}
      pitchEnabled={true}
      zoomTapEnabled={true}
      initialRegion={initialRegion}
      style={
        style || {
          width: wp("100%"),
          height: hp("100%"),
          justifyContent: "flex-end",
          alignItems: "center",
        }
      }
    >
      {children || null}
    </MapView>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: colors?.black, fontFamily: font?.bold }}>
        LOCATION PERMISSION DENIED!
      </Text>
      <Text
        style={{ color: colors?.lightBlue2, marginTop: 5 }}
        onPress={() => userLocationUpdate()}
      >
        Turn on location permission from device settings.
      </Text>
    </View>
  );
};

export default MapComponent;
