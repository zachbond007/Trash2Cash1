import React from "react";
import { View, Text, Image } from "react-native";

// Third Party
import moment from "moment";
import { Circle } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { styles } from "./styles";
import MapComponent from "../../commonComponents/mapComponent";
import HeaderSection from "../../commonComponents/HeaderSection";
import { colors } from "../../../constant/colors";


const VerifiedHunt = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params;

  return (
    <View style={styles.mainContainer}>
      <HeaderSection
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />

      {item && (
        <MapComponent
          initialRegion={{
            latitude: item?.latitude || 28.628,
            longitude: item?.longitude || 77.3649,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.mapView}
        >
          <Circle
            center={{
              latitude: item?.latitude || 28.628,
              longitude: item?.longitude || 77.3649,
            }}
            radius={wp(650)}
            strokeColor={"transparent"}
            fillColor={colors.aquamarine}
          />
        </MapComponent>
      )}
      <View style={styles.modalView}>
        <View style={styles.collectionItem}>
          <View style={styles.collectionLeft}>
            <View style={styles.locationView}>
              <Image
                style={[styles.icon, { marginTop: "1%" }]}
                source={require("../../../assets/icons/location.png")}
              />
              <Text style={styles.leftItemText}>{item.address}</Text>
            </View>
            <View style={styles.calenderView}>
              <Image
                style={styles.icon}
                source={require("../../../assets/icons/calender_green.png")}
              />
              <Text style={styles.leftItemText}>
                {moment(item?.created_at).format("LL")}
              </Text>
            </View>
            <View style={styles.pointView}>
              <Image
                style={styles.statusIcon}
                source={require("../../../assets/icons/points.png")}
              />
              <View style={styles.directionRow}>
                <Text style={styles.pointText}>
                  {item?.points_earned} points earned on{" "}
                </Text>
                <Text style={styles.bagFullText}>Bag was full</Text>
              </View>
            </View>
          </View>
          <View style={styles.collectionRight}>
            <View style={styles.tagButton(item.hunt_status)}>
              <Image
                style={styles.statusIcon}
                source={
                  item?.hunt_status === 1
                    ? require("../../../assets/icons/pending.png")
                    : require("../../../assets/icons/verified.png")
                }
              />
              <Text style={styles.statusText(item.hunt_status)}>
                {item?.hunt_status === 1 ? "Pending" : "Verified"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.huntImageView}>
          {item?.hunt_image && (
            <Image
              style={styles.imageView}
              source={{ uri: item?.hunt_image }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default VerifiedHunt;
