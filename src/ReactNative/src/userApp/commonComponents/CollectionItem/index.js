import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

// Third Party
import moment from "moment";
import Geocoder from "react-native-geocoding";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { styles } from "./styles";
import { geoCode } from "../../../constant/keys";


Geocoder.init(geoCode);

const CollectionItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.collectionContainer}
      onPress={() => onPress && onPress()}
    >
      <View style={styles.collectionContainerItem}>
        <View style={styles.collectionLeft}>
          {item?.title && (
            <Text style={styles.collectionTitle}>{item?.title}</Text>
          )}
          <View>
            <View style={styles.locationView}>
              <Image
                style={[styles.icon, { marginTop: wp("1%") }]}
                source={require("../../../assets/icons/location.png")}
              />

              <Text style={styles.leftItemText}>{item?.address}</Text>
            </View>
            <View style={styles.dateView}>
              <Image
                style={styles.icon}
                source={require("../../../assets/icons/calender_green.png")}
              />
              <Text style={styles.leftItemText}>
                {moment(item?.created_at).format("LL")}
              </Text>
            </View>
          </View>

          <View style={styles.leftBottomView}>
            <View style={styles.tagButton(item?.hunt_status)}>
              <Image
                style={styles.statusIcon}
                source={
                  item?.hunt_status === 1
                    ? require("../../../assets/icons/pending.png")
                    : require("../../../assets/icons/verified.png")
                }
              />
              <Text style={styles.statusText(item?.hunt_status)}>
                {item?.hunt_status === 1 ? "Pending" : "Verified"}
              </Text>
            </View>

            {item?.points_earned != null && item?.hunt_status !== 1 && (
              <View style={styles.pointView}>
                <Image
                  style={styles.statusIcon}
                  source={require("../../../assets/icons/points.png")}
                />
                <Text style={styles.pointText}>
                  {item?.points_earned} points earned
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.collectionRight}>
          <Image
            style={styles.collectionRightImage}
            source={{ uri: item?.hunt_image }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CollectionItem;
