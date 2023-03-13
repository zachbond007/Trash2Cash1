import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

// Third Party
import moment from "moment";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";

const HuntItem = ({ item, onPress, onEditPress, onDeletePress }) => {
  return item?.is_deleted == 0 ? (
    <TouchableOpacity
      style={styles.huntItem}
      onPress={() => onPress && onPress()}
    >
      <View style={styles.huntLeft}>
        {item?.event_title && (
          <View style={styles.huntTitleView}>
            <View style={styles.huntTitleLeft}>
              <Text style={styles.huntTitle}>{item?.event_title}</Text>
            </View>

            {moment(item?.end_time + ".102Z").format() >
              moment(new Date()).format() ? (
              <View style={styles.huntTitleRight}>
                <TouchableOpacity onPress={() => onEditPress && onEditPress()}>
                  <Image
                    style={styles.voucherEditIcon}
                    source={require("../../../assets/icons/edit_icon.png")}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onDeletePress && onDeletePress()}
                >
                  <Image
                    style={styles.voucherDeleteIcon}
                    source={require("../../../assets/icons/delete_row.png")}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
        <View style={styles.dateTimeView}>
          <View style={styles.dateView}>
            <Image
              style={styles.dateIcon}
              source={require("../../../assets/icons/calender_green.png")}
            />
            <Text style={styles.leftItemText}>
              {moment(item?.event_date_time).format("LL")}
            </Text>
          </View>
        </View>
        <View style={styles.leftBottomView}>
          <View
            style={{
              ...styles.tagButton,
              backgroundColor:
                item?.hotspot_status == "Pending"
                  ? colors.chocolate
                  : colors.hunterGreen,
            }}
          >
            <Image
              style={styles.statusIcon}
              source={
                item?.hotspot_status == "Pending"
                  ? require("../../../assets/icons/pending.png")
                  : require("../../../assets/icons/verified.png")
              }
            />
            <Text
              style={{
                ...styles.statusText,
                color:
                  item?.hotspot_status == "Pending"
                    ? colors.orange1
                    : colors?.green,
              }}
            >
              {item?.hotspot_status}
            </Text>
          </View>

          <View style={styles.pointView}>
            <Image
              style={styles.statusIcon}
              source={require("../../../assets/icons/points.png")}
            />
            <Text style={styles.pointText}>
              {item?.hunters}{" "}
              {item?.hunters > 1 ? "hunters joining" : "hunter joining"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ) : null;
};


export default HuntItem;
