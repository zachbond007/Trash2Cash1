import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

// Third Party
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// Constants
import { styles } from "./styles";
import { font } from "../../../constant/font";
import { types } from "../../../action/ActionType";
import NoDataFound from "../../commonComponents/NodataFound";
import HeaderSection from "../../commonComponents/HeaderSection";
import NavigationService from "../../../routing/NavigationService";

const Notifications = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { notificationList, notifPgNo } = useSelector((state) => state?.authReducer);
  const homeReducer = useSelector((state) => state?.homeReducer);

  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: types?.GET_NOTIFICATION_LIST,
        payload: { pageNo: 1, pageSize: 20 },
      });
      dispatch({
        type: types.SET_NOTIFICATION_PAGENO,
        payload: 0
      });
    }, [])
  );
  const navigateAccordingToType = (type, notification_id) => {
    switch (type) {
      case 0:
        NavigationService.navigate("TabNavigation", "verified");
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      case 1:
        NavigationService.navigate("MarketPlaceDetail");
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      case 2:
        NavigationService.navigate("MarketPlaceDetail");
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      case 3:
        NavigationService.navigate("Friends", { tabIndexx: 1 });
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      case 4:
        NavigationService.navigate("POINTS");
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      case 5:
        NavigationService.navigate("Friends", { tabIndexx: 0 });
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      case 6:
        NavigationService.navigate("TRASH LIST");
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      case 7:
        NavigationService.navigate("POINTS");
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      default:
        break;
    }
  };

  const newNotificationItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.notificationItem}
        onPress={() =>
          navigateAccordingToType(
            item?.notification_type,
            item?.notification_id
          )
        }
      >
        <View style={styles.notificationIconView}>
          {!item?.new === true ? (
            <Image
              style={styles.notificationNewIcon}
              source={require("../../../assets/icons/notification_new.png")}
            />
          ) : (
            <Image
              style={styles.notificationOldIcon}
              source={require("../../../assets/icons/notification_old.png")}
            />
          )}
        </View>

        <View style={styles.notificationTextView}>
          <Text style={styles.notificationText}>
            {item.notify_message}
          </Text>
          <Text style={styles.timeText}>
            {moment(
              moment.utc(item?.created_at).local().format("YYYY-MM-DD HH:mm:ss")
            ).fromNow()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const earlierNotificationItem = (item) => {
    return (
      <View style={styles.notificationItem}>
        <View style={styles.notificationIconView}>
          {item?.new === true ? (
            <Image
              style={styles.notificationNewIcon}
              source={require("../../../assets/icons/notification_new.png")}
            />
          ) : (
            <Image
              style={styles.notificationOldIcon}
              source={require("../../../assets/icons/notification_old.png")}
            />
          )}
        </View>
        <View style={styles.notificationTextView}>
          <Text
            style={{
              ...styles.notificationText,
              fontFamily: item?.new === true ? font.bold : font.regular,
            }}
          >
            {item.notify_message}
          </Text>
          <Text style={styles.timeText}>
            {moment(
              moment.utc(item?.created_at).local().format("YYYY-MM-DD HH:mm:ss")
            ).fromNow()}
          </Text>
        </View>
      </View>
    );
  };

  const loadMoreNotification = () => {
    if (notificationList.length == (notifPgNo + 1) * 20) {
      dispatch({
        type: types.SET_NOTIFICATION_PAGENO,
        payload: notifPgNo + 1
      });
      dispatch({
        type: types.GET_NOTIFICATION_LIST,
        payload: { pageNo: notifPgNo + 1, pageSize: 20 }
      });
    }
  }

  return (
    <View style={styles.mainContainer}>
      <HeaderSection
        backButton={homeReducer?.loginType == "PARTNER" ? false : true}
        onBackPress={() => navigation.goBack()}
        title={"Notifications"}
      />
      <View style={styles.container}>

        <FlatList
          keyExtractor={(index) => index.toString()}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <NoDataFound />}
          ListHeaderComponent={() => {
            return <>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationHeaderText}>
                  New Notifications
                </Text>
              </View>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                data={notificationList.filter(val => val.is_read == false)}
                renderItem={({ item, index }) => newNotificationItem(item, index)}
                onEndReachedThreshold={0.9}
                onEndReached={() => {
                  loadMoreNotification()
                }}
              />
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationHeaderText}>
                  Earlier Notifications
                </Text>
              </View>
            </>
          }}
          data={notificationList.filter(val => val.is_read == true)}
          contentContainerStyle={styles.contentStyle}
          renderItem={({ item, index }) => earlierNotificationItem(item, index)}
        />
      </View>
    </View>
  );
};

export default Notifications;
