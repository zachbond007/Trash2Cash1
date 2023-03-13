import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";

// Third Party
import moment from "moment";
import { Circle, Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { styles } from "./styles";
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import CustomDropdown from "../../commonComponents/Dropdown";
import LinearButton from "../../commonComponents/LinearButton";
import MapComponent from "../../commonComponents/mapComponent";

const TrashList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);

  const userLocation = useSelector(
    (state) => state?.authReducer?.userCurrentLocation
  );
  const nearbyHotspotList = useSelector(
    (state) => state?.homeReducer?.nearbyHotspotList
  );
  const userHuntList = useSelector((state) => state?.homeReducer?.huntList);
  const listOfSpecificUserForHotspot = useSelector(
    (state) => state?.homeReducer?.listOfSpecificUserForHotspot
  );
  const [radioFriend, setRadioFriend] = useState("My Impact");
  const [hotspotIndex, setHotspotIndex] = useState();
  const [hotspotTitle, setHotspotTitle] = useState("My Impact");
  const [friendLocation, setFriendLocation] = useState();
  const getFriendHotspotList = useSelector(
    (state) => state?.homeReducer?.getFriendHotspotList
  );

  useEffect(() => {
    dispatch({
      type: types.GET_NEARBY_HOTSPOT_LIST,
    });
    dispatch({
      type: types.GET_LIST_OF_SPECIFIC_USERS_FOR_HOTSPOT,
      payload: 0,
    });
    dispatch({
      type: types.GET_FRIEND_HOTSPOT_LIST,
      payload: 1,
    });
    dispatch({
      type: types.GET_FRIEND_LIST,
    });
  }, []);

  const RenderHuntListItem = () => {
    return (
      <View style={styles.mapBottomContentView}>
        <View style={styles.locationItem}>
          <View
            style={styles.rejectView}
          >
            <Text style={styles.locationItemTitle}>
              {nearbyHotspotList[hotspotIndex]?.event_title}
            </Text>
            <TouchableOpacity
              style={styles.rejectStyle}
              onPress={() => setHotspotIndex()}
            >
              <Image
                source={require("../../../assets/icons/reject.png")}
                style={styles.rejectStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.locationItemCenter}>
            <Image
              style={styles.calenderIcon}
              source={require("../../../assets/icons/location.png")}
              resizeMode="contain"
            />
            <Text style={styles.locationItemCenterText}>
              {nearbyHotspotList[hotspotIndex]?.address}
            </Text>
          </View>

          <View style={styles.locationItemCenter}>
            <Image
              style={styles.calenderIcon}
              source={require("../../../assets/icons/calender_green.png")}
              resizeMode="contain"
            />
            <Text style={styles.locationItemCenterText}>
              {moment(nearbyHotspotList[hotspotIndex]?.event_date_time).format(
                "LL"
              )}{" "}
              |{" "}
              {moment(nearbyHotspotList[hotspotIndex]?.start_time).format(
                "HH A"
              )}{" "}
              to{" "}
              {moment(nearbyHotspotList[hotspotIndex]?.end_time).format("hh A")}
            </Text>
          </View>

          <LinearButton
            title={"RSVP"}
            style={styles.buttonView}
            titleStyle={styles.locationButtonText}
            colors={[colors.linearOrange, colors.linearYellow]}
            onPress={() => buttonClick()}
          />
        </View>
      </View>
    );
  };

  const handleAllUserClick = () => {
    setRadioFriend(`Trash2Cash's Impact`);
    setHotspotTitle(`Trash2Cash's Impact`);
    setFriendLocation();
  };

  const handleFriendClick = () => {
    dispatch({
      type: types.GET_FRIEND_HOTSPOT_LIST,
      payload: 1,
    });
    setRadioFriend(`My Friends's Impact`);
    setHotspotTitle(`My Friends's Impact`);
  };

  const handleMyOnlyClick = () => {
    setRadioFriend("My Impact");
    setHotspotTitle("My Impact");
    setFriendLocation();
  };

  const openDropAndVisbleRSVP = () => {
    setOpenDropdown(!openDropdown);
    setHotspotIndex();
  };

  const buttonClick = () => {
    navigation.navigate("TrashListDetail", { hotspotIndex: hotspotIndex });
  };

  return userLocation && userHuntList ? (
    <View style={styles.container}>
      <View style={styles?.container}>
        <MapComponent
          initialRegion={{
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.mapView}
        >
          {/* user where s/he completed the hunt  -> dark green circle*/}
          {radioFriend == "My Impact" &&
            userHuntList.map((x) => (
              <Circle
                center={{ latitude: x?.latitude, longitude: x?.longitude }}
                radius={wp(300)}
                strokeColor={"transparent"}
                fillColor={"rgba(8, 66, 19, 0.25)"} // 0.5
              />
            ))}
          {radioFriend == "My Friends's Impact" &&
            getFriendHotspotList.map((y) => {
              return y.location.location.map((x) => (
                <Circle
                  center={{ latitude: x?.latitude, longitude: x?.longitude }}
                  radius={wp(300)}
                  strokeColor={"transparent"}
                  fillColor={"rgba(8, 66, 19, 0.25)"} // 0.5
                />
              ));
            })}
          {/* nearby hotspot marker -> orange/blue marker */}
          {nearbyHotspotList &&
            nearbyHotspotList.map((item, index) => (
              <Marker
                coordinate={{
                  latitude: item?.latitude,
                  longitude: item?.longitude,
                }}
                onPress={() => setHotspotIndex(index)}
              >
                <Image
                  resizeMode="contain"
                  style={styles?.orangePin}
                  source={require("../../../assets/icons/feather-map-orange-pin.png")}
                />
              </Marker>
            ))}

          {/* My friends who hunts location circle */}
          {friendLocation &&
            friendLocation?.map((start) => (
              <Circle
                center={{
                  latitude: start?.latitude,
                  longitude: start?.longitude,
                }}
                radius={wp(300)}
                strokeColor={"transparent"}
                fillColor={"rgba(100, 159, 105, 0.8)"}
              />
            ))}

          {/* All users who hunts location circle */}
          {radioFriend == `Trash2Cash's Impact` &&
            listOfSpecificUserForHotspot &&
            listOfSpecificUserForHotspot.map((start) =>
              start?.location?.location.map((allLatLong) => (
                <Circle
                  center={{
                    latitude: allLatLong.latitude,
                    longitude: allLatLong.longitude,
                  }}
                  radius={wp(300)}
                  strokeColor={"transparent"}
                  fillColor={"rgba(170, 200, 185, 0.8)"}
                />
              ))
            )}
        </MapComponent>
        <LinearGradient
          colors={["#FFFFFF", "#FFFFFF", "#FFFFFF00"]}
          style={styles.mapTopContentView}
        >
          <CustomDropdown
            open={openDropdown}
            title={hotspotTitle}
            onPress={() => openDropAndVisbleRSVP()}
            dropdownStyle={styles.dropdownStyle}
            titleStyle={styles.dropdownTitle}
          >
            <View style={styles.dropdownContent}>
              <View style={styles.radioButtonView}>
                <View style={styles.dropdownView}>
                  <TouchableOpacity
                    onPress={() => handleMyOnlyClick()}
                    style={styles.radioButton}
                  >
                    <Image
                      style={styles.radioIcon}
                      source={
                        radioFriend == "My Impact"
                          ? require("../../../assets/icons/radio_on.png")
                          : require("../../../assets/icons/radio_off.png")
                      }
                    />
                    <Text
                      style={[
                        styles.radioButtonText,
                        {
                          fontFamily:
                            radioFriend === "My Impact"
                              ? font.semiBold
                              : font.font?.medium,
                        },
                      ]}
                    >
                      My Impact
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleFriendClick()}
                    style={[styles.radioButton, { flex: 0.6 }]}
                  >
                    <Image
                      style={styles.radioIcon}
                      source={
                        radioFriend == `My Friends's Impact`
                          ? require("../../../assets/icons/radio_on.png")
                          : require("../../../assets/icons/radio_off.png")
                      }
                    />
                    <Text
                      style={[
                        styles.radioButtonText,
                        {
                          fontFamily:
                            radioFriend === `My Friends's Impact`
                              ? font.semiBold
                              : font.font?.medium,
                        },
                      ]}
                    >
                      My Friends's Impact{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => handleAllUserClick()}
                  style={styles.radioButton}
                >
                  <Image
                    style={styles.radioIcon}
                    source={
                      radioFriend == `Trash2Cash's Impact`
                        ? require("../../../assets/icons/radio_on.png")
                        : require("../../../assets/icons/radio_off.png")
                    }
                  />
                  <Text
                    style={[
                      styles.radioButtonText,
                      {
                        fontFamily:
                          radioFriend === `Trash2Cash's Impact`
                            ? font.semiBold
                            : font.font?.medium,
                      },
                    ]}
                  >
                    Trash2Cash's Impact
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </CustomDropdown>
        </LinearGradient>

        {hotspotIndex >= 0 && <RenderHuntListItem />}
      </View>
    </View>
  ) : (
    <View style={styles?.loaderView}>
      <ActivityIndicator color={colors?.white} />
    </View>
  );
};

export default TrashList;
