import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";

// Third Party
import { Marker, Polyline } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";

// constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import LinearButton from "../../commonComponents/LinearButton";
import MapComponent from "../../commonComponents/mapComponent";
import HeaderSection from "../../commonComponents/HeaderSection";

const StartHunt = ({ route }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const hotspotList = useSelector((state) => state?.homeReducer?.hotspotList);
  const userCurrentLocation = useSelector(
    (state) => state?.authReducer?.userCurrentLocation
  );
  const initialLocation = useSelector(
    (state) => state?.homeReducer?.initialLocation
  );
  const userCoordinates = useSelector(
    (state) => state?.authReducer?.userCoordinates
  );
  const [start, setStart] = useState(false);
  const [watchId, setWatchId] = useState("");

  useEffect(() => {
    getHotspotList();
  }, []);

  const backButtonPress = () => {
    navigation.goBack();
    setStart(false);
  };

  const onCompletedPress = () => {
    const userCurrentLocation = userCoordinates[userCoordinates.length - 1];
    navigation?.navigate("CameraScreen", {
      latitude: userCurrentLocation.latitude,
      longitude: userCurrentLocation.longitude,
    });
    Geolocation.clearWatch(watchId);
  };

  const getHotspotList = () => {
    dispatch({
      type: types?.GET_HOTSPOT_LIST,
    });
  };

  const onStartButtonPress = () => {
    setStart(true);

    const id = Geolocation.watchPosition(
      (position) => {
        let location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        dispatch({
          type: types?.UPDATE_USER_CURRENT_LOCATION,
          payload: { location: location },
        });
      },
      (error) => {
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 0,
        distanceFilter: 0,
      }
    );

    setWatchId(id);
  };

  return (
    <View style={styles.container}>
      <HeaderSection backButton={true} onBackPress={() => backButtonPress()} />
      <MapComponent
        initialRegion={{
          latitude: userCurrentLocation?.latitude || initialLocation?.latitude,
          longitude:
            userCurrentLocation?.longitude || initialLocation?.latitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: userCurrentLocation?.latitude,
          longitude: userCurrentLocation?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userCoordinates && (
          <Polyline
            coordinates={userCoordinates}
            strokeColor={colors?.lightBlue2}
            strokeColors={[
              colors?.lightBlue2,
              colors?.lightBlue2,
              colors?.lightBlue2,
              colors?.lightBlue2,
              colors?.lightBlue2,
            ]}
            strokeWidth={5}
          />
        )}
        {userCoordinates && (
          <Marker
            coordinate={userCoordinates[userCoordinates?.length - 1]}
            description={"My Current Location"}
          />
        )}

        {hotspotList &&
          hotspotList?.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            >
              <Image
                source={require("../../../assets/icons/map_location.png")}
                style={styles?.hotspotIcon}
                resizeMode={"contain"}
              />
            </Marker>
          ))}
      </MapComponent>

      <View
        style={styles.buttonContainer}
      >
        {start === false ? (
          <LinearButton
            title={message?.startHunt}
            onPress={() => onStartButtonPress()}
          />
        ) : (
          <LinearButton
            title={message?.completeHunt}
            onPress={() => onCompletedPress()}
          />
        )}
      </View>
    </View>
  );
};

export default StartHunt;