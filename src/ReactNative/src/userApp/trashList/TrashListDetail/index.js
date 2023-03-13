import React from "react";
import { View, Text, Image } from "react-native";

// Third Party
import { Circle } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { styles } from "./styles";
import { types } from "../../../action/ActionType";
import LinearButton from "../../commonComponents/LinearButton";
import MapComponent from "../../commonComponents/mapComponent";
import HeaderSection from "../../commonComponents/HeaderSection";
import { colors } from "../../../constant/colors";

const TrashListDetail = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const nearbyHotspotList = useSelector((state) => state?.homeReducer?.nearbyHotspotList);
  const attendingHotspotDetail = nearbyHotspotList[route.params.hotspotIndex];

  const attendHotspotRSVP = () => {
    dispatch({
      type: types.POST_ATTEND_HOTSPOT,
      payload: nearbyHotspotList[route.params.hotspotIndex]?.hotspot_id,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <HeaderSection
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <MapComponent
        initialRegion={{
          latitude: attendingHotspotDetail.latitude,
          longitude: attendingHotspotDetail.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.mapView}
      >
        <Circle
          center={{
            latitude: attendingHotspotDetail.latitude,
            longitude: attendingHotspotDetail.longitude,
          }}
          radius={wp(550)}
          strokeColor={"transparent"}
          fillColor={colors.aquamarine}
        />
      </MapComponent>

      <View style={styles.modalView}>
        <View style={styles.locationItem}>
          <Text style={styles.locationItemTitle}>
            {attendingHotspotDetail?.event_title}
          </Text>
          <View style={styles.locationItemCenter}>
            <Image
              style={styles.calenderIcon}
              source={require("../../../assets/icons/location.png")}
              resizeMode="contain"
            />
            <Text style={styles.locationItemCenterText}>
              {attendingHotspotDetail?.address}
            </Text>
          </View>

          <View style={styles.locationItemCenter}>
            <Image
              style={styles.calenderIcon}
              source={require("../../../assets/icons/calender_green.png")}
              resizeMode="contain"
            />
            <Text style={styles.locationItemCenterText}>
              {attendingHotspotDetail?.event_date_time}
            </Text>
          </View>

          <LinearButton
            onPress={() => attendHotspotRSVP()}
            title={"RSVP"}
            style={styles.buttonView}
            titleStyle={styles.locationButtonText}
            colors={["rgba(253, 122, 21, 0.7)", "rgba(255, 196, 0, 0.7)"]}
          />
        </View>
      </View>
    </View>
  );
};

export default TrashListDetail;
