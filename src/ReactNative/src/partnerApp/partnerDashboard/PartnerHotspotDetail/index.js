import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

// Third Party
import moment from "moment";
import { useDispatch } from "react-redux";
import { Circle } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import NavigationService from "../../../routing/NavigationService";
import MapComponent from "../../../userApp/commonComponents/mapComponent";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";

const PartnerHotspotDetail = ({ route }) => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [item, setItem] = useState("");

  useEffect(() => {
    const hotspotData = route?.params?.item;
    setItem(hotspotData);
  }, []);

  const clearReducerAndNavigate = () => {
    dispatch({
      type: types.REDUCER_HOTSPOT_HUNTERS_LIST,
      payload: null,
    });
    NavigationService.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <HeaderSection
        backButton={true}
        onBackPress={() => clearReducerAndNavigate()}
      />

      {item?.latitude && item?.longitude ? (
        <MapComponent
          ref={mapRef}
          initialRegion={{
            latitude: item?.latitude,
            longitude: item?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.mapView}
        >
          <Circle
            center={{ latitude: item?.latitude, longitude: item?.longitude }}
            radius={wp(550)}
            strokeColor={"transparent"}
            fillColor={colors.aquamarine}
          />
        </MapComponent>
      ) : null}

      <View style={styles.modalView}>
        <View style={styles.horizontalLine} />

        <View style={styles.collectionItemContainer}>
          <View style={styles.collectionItem}>
            <View style={styles.collectionLeft}>
              {item?.event_title && (
                <Text style={styles.collectionTitle}>{item?.event_title}</Text>
              )}
              <View style={styles.dateTimeView}>
                <View style={styles.dateView}>
                  <Image
                    style={styles.dateIcon}
                    source={require("../../../assets/icons/calender_green.png")}
                  />
                  <Text style={styles.leftItemText}>
                    {item?.event_date_time &&
                      moment(item?.event_date_time).format("LL")}
                  </Text>
                </View>
                <View style={styles.timeView}>
                  <Image
                    style={styles.dateIcon}
                    source={require("../../../assets/icons/time.png")}
                  />
                  <Text style={styles.leftItemText}>
                    {item?.start_time &&
                      moment(item?.start_time + ".102Z").format("LT")}{" "}
                    to {moment(item?.end_time + ".102Z").format("LT")}
                  </Text>
                </View>
              </View>
              <View style={styles.leftBottomView}>
                <View
                  style={{
                    ...styles.tagButton,
                    backgroundColor:
                      moment(item?.end_time + ".102Z").format() >
                        moment(new Date()).format()
                        ? colors.chocolate
                        : colors.hunterGreen
                  }}
                >
                  <Image
                    style={styles.statusIcon}
                    source={
                      moment(item?.end_time + ".100Z").format() <
                        moment(new Date()).format()
                        ? require("../../../assets/icons/verified.png")
                        : require("../../../assets/icons/pending.png")
                    }
                  />
                  <Text
                    style={{
                      ...styles.statusText,
                      color:
                        moment(item?.end_time + ".102Z").format() >
                          moment(new Date()).format()
                          ? colors.orange1
                          : colors?.green,
                    }}
                  >
                    {moment(item?.end_time + ".102Z").format() >
                      moment(new Date()).format()
                      ? "Pending"
                      : "Completed"}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Hunters", {
                      hotspotId: item?.hotspot_id,
                    })
                  }
                  style={styles.pointView}
                >
                  <Image
                    style={styles.statusIcon}
                    source={require("../../../assets/icons/points.png")}
                  />
                  <Text style={styles.pointText}>
                    {item?.hunters}{" "}
                    {item?.hunters >= 1 ? "hunters joining" : "hunter joining"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PartnerHotspotDetail;
