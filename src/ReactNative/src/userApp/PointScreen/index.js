import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from "react-native";

// Third Party
import moment from "moment";
import Dash from "react-native-dash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { styles } from "./styles";
import { font } from "../../constant/font";
import { colors } from "../../constant/colors";
import { types } from "../../action/ActionType";
import { pointsTab } from "../../constant/staticData";
import LinearButton from "../../userApp/commonComponents/LinearButton";
import HeaderSection from "../../userApp/commonComponents/HeaderSection";
import NoDataFound from "../../userApp/commonComponents/NodataFound";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const PointScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(0);

  const pointsData = useSelector((state) => state?.homeReducer?.pointsHistory);
  const boostedDetail = useSelector((state) => state?.homeReducer?.boostDetails);
  const usersPlan = useSelector((state) => state?.homeReducer?.userCurrentPlan?.rewards);
  const userDetails = useSelector((state) => state?.authReducer?.userDetails);
  const isProUser = userDetails?.user_type_id == 5 ? true : false;

  const pointsHistoryList = useSelector((state) => state?.homeReducer?.pointsHistoryList);
  const pointsHistoryPageNo = useSelector((state) => state?.homeReducer?.pointsHistoryPageNo);

  useEffect(() => {
    dispatch({
      type: types.GET_POINTS_HISTORY,
      payload: { pageNo: 1, pageSize: 10 }
    });
    dispatch({
      type: types.SET_POINTS_HISTORY_PAGENO,
      payload: 0
    });
    dispatch({
      type: types.GET_BOOST_DETAIL_LIST,
      payload: { pageNo: 1, pageSize: 10 }
    });
  }, []);

  const tabItems = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.tabView,
          borderBottomWidth: index === tabIndex ? 3 : 1,
          borderBottomColor:
            index === tabIndex ? colors.lightBlue2 : colors["grey-500"],
        }}
        onPress={() => setTabIndex(index)}
      >
        <Text
          style={{
            ...styles.tabText,
            color: index === tabIndex ? colors.lightBlue2 : colors.black2,
            fontFamily: index === tabIndex ? font.semiBold : font.regular,
          }}
        >
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const voucherButtonClick = (item) => {
    let id = item?.point_history_id;
    dispatch({
      type: types?.POST_BOOST_DETAIL_LIST,
      payload: id,
    });
  };

  const pointItems = ({ item }) => {
    return tabIndex == 0 ? (
      <TouchableOpacity disabled style={styles.pointsItem}>
        <View style={styles.pointItemTopView}>
          <View style={styles.pointTopLeftView}>
            <Image
              style={styles.pointLeftImage}
              source={
                item?.identifier == 1
                  ? require("../../assets/icons/green_delete.png")
                  : item?.identifier == 2
                    ? require("../../assets/icons/redeem.png")
                    : require("../../assets/icons/checked.png")
              }
            />
          </View>
          <View
            style={{
              ...styles.pointTopCenterView,
              flex: item?.decreasePoints ? 0.5 : 0.8,
            }}
          >
            {item?.identifier == 1 ? (
              <Text style={styles.locationText}>
                Hunting at {item?.address}
              </Text>
            ) : item?.identifier == 2 ? (
              <Text style={styles.locationText}>
                Redeem at {item.business_name}
              </Text>
            ) : item?.identifier == 3 ? (
              <Text style={styles.locationText}>
                Verify hunting at {item?.address}
              </Text>
            ) : item?.identifier == 4 ? (
              <Text style={styles.locationText}>
                Received from {item?.username}
              </Text>
            ) : item?.identifier === 7 ? (
              <Text style={styles.locationText}>
                Congratulations! You have earned {item?.points} points.
              </Text>
            ) : (
              <Text style={styles.locationText}>Shared with friends</Text>
            )}
            {item?.created_at && (
              <View style={styles.dateView}>
                <Image
                  style={styles.calenderIcon}
                  source={require("../../assets/icons/calender_green.png")}
                  resizeMode="contain"
                />
                <Text style={styles.dateText}>
                  {moment(item?.created_at).format("LL")}
                </Text>
              </View>
            )}
          </View>

          {item?.identifier == 2 && (
            <View style={styles.pointTopRightView}>
              <Text style={styles.decreasePoints}>-{item?.points} points</Text>
            </View>
          )}
          {item?.identifier == 5 && (
            <View style={styles.pointTopRightView}>
              <Text style={styles.decreasePoints}>-{item?.points} points</Text>
            </View>
          )}
        </View>
        {tabIndex === 0 && (
          <Dash style={styles.dashContainer} dashStyle={styles.dashStyle} />
        )}

        {(tabIndex === 0 && item?.identifier == 5) || (
          <View style={styles.pointBottomView}>
            <View style={styles.pointView}>
              <Image
                style={styles.pointIcon}
                source={require("../../assets/icons/points.png")}
              />
              <Text
                style={{
                  ...styles.pointText,
                  color: tabIndex === 1 ? colors.yellow : colors.black,
                  marginLeft: tabIndex === 1 ? wp("4%") : wp("2%"),
                }}
              >
                {item?.points}{" "}
                {item?.identifier === 2 ? "points spent" : "points earned"}
              </Text>
            </View>
            <Text style={styles.boostedText}>{item?.boost}</Text>
          </View>
        )}
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.pointsItem}>
        <View style={styles.pointItemTopView}>
          <View style={styles.pointTopLeftView}>
            <Image
              style={styles.pointLeftImage}
              source={
                item?.decreasePoints
                  ? require("../../assets/icons/redeem.png")
                  : tabIndex === 1
                    ? require("../../assets/icons/boosted.png")
                    : require("../../assets/icons/green_delete.png")
              }
            />
          </View>
          <View
            style={{
              ...styles.pointTopCenterView,
              flex: item?.decreasePoints ? 0.5 : 0.8,
            }}
          >
            <Text style={styles.locationText}>Boost em! ​</Text>
            <View style={styles.dateView}>
              <Text style={styles.dateText}>
                You have a limited time to boost these points, boost them now!
              </Text>
            </View>
            {item?.subTitle && (
              <Text style={styles.subTitle}>{item?.subTitle}</Text>
            )}
          </View>

          {item?.decreasePoints && (
            <View style={styles.pointTopRightView}>
              <Text style={styles.decreasePoints}>{item?.decreasePoints}</Text>
            </View>
          )}
        </View>
        {!item?.decreasePoints && (
          <Dash style={styles.dashContainer} dashStyle={styles.dashStyle} />
        )}

        {!item?.decreasePoints && (
          <View style={styles.pointBottomView}>
            <View style={styles.pointView}>
              <Image
                style={styles.pointIcon}
                source={require("../../assets/icons/points.png")}
              />
              <Text
                style={{
                  ...styles.pointText,
                  color: tabIndex === 1 ? colors.yellow : colors.black,
                  marginLeft: tabIndex === 1 ? wp("4%") : wp("2%"),
                }}
              >
                {item?.point_earn} x{" "}
                {usersPlan === "4" ? "4" : usersPlan === "3" ? "3" : "2"} ={" "}
                {usersPlan === "4"
                  ? item?.point_earn * 4
                  : usersPlan === "3"
                    ? item?.point_earn * 3
                    : item?.point_earn * 2}{" "}
                points
              </Text>
            </View>

            {item?.is_boosted === 0 && (
              <>
                <LinearButton
                  style={styles.boostButton}
                  title={"BOOST"}
                  titleStyle={styles.boostButtonText}
                  colors={["rgba(253, 122, 21, 0.7)", "rgba(255, 196, 0, 0.7)"]}
                  onPress={() => voucherButtonClick(item)}
                />
              </>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch({
      type: types.GET_POINTS_HISTORY,
      payload: { pageNo: 1, pageSize: 10 }
    });
    dispatch({
      type: types.GET_BOOST_DETAIL_LIST,
      payload: { pageNo: 1, pageSize: 10 }
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch({
      type: types?.GET_NOTIFICATION_LIST,
      payload: { pageNo: 1, pageSize: 20 },
    });
  }, []);
  const notificationList = useSelector(
    (state) => state?.authReducer?.notificationList
  );
  const unReadNotification = notificationList.filter((x) => x.is_read == false);

  const loadMoreHistory = () => {
    if (pointsHistoryList.length == (pointsHistoryPageNo + 1) * 10) {
      dispatch({
        type: types.SET_POINTS_HISTORY_PAGENO,
        payload: pointsHistoryPageNo + 1
      });
      dispatch({
        type: tabIndex === 0 ? types.GET_POINTS_HISTORY : types.GET_BOOST_DETAIL_LIST,
        payload: { pageNo: pointsHistoryPageNo + 1, pageSize: 10 }
      });
    }
  }

  return (
    <View style={styles.container}>
      <HeaderSection
        profile={true}
        notificationList={unReadNotification.length >= 1}
        onBackPress={() => navigation.goBack()}
        notification={true}
        onProfilePress={() => navigation.navigate("Profile")}
      />

      <View style={styles.pointsTopView}>
        <Text style={styles.balanceText}>Your Balance</Text>
        <Text style={styles.pointValue}>
          {pointsData?.balance}
          <Text style={styles.pointTitle}> points</Text>
        </Text>
      </View>

      <View>
        {isProUser ? (
          <FlatList
            style={styles.tabContainer}
            horizontal
            data={pointsTab}
            renderItem={({ item, index }) => tabItems(item, index)}
          />
        ) : (
          <View style={styles.notProUserTabView}>
            <Text
              style={styles.tabText}
            >
              Points History
            </Text>
          </View>
        )}

        <FlatList
          style={styles.pointsList}
          onRefresh={onRefresh}
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          data={tabIndex === 0 ? pointsHistoryList : boostedDetail}
          renderItem={pointItems}
          ListEmptyComponent={<NoDataFound />}
          onEndReachedThreshold={0.7}
          onEndReached={() => loadMoreHistory()}
        />
      </View>
    </View>
  );
};



export default PointScreen;
