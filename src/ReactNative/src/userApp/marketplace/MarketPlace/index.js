import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";

// Third Party
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

// Constants
import { styles } from "./styles";
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import HeaderSection from "../../commonComponents/HeaderSection";
import { categoryData } from "../../../constant/staticData";


const MarketPlace = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [tabItemClick, setTabItemClick] = useState("Food & Beverage");
  const homeReducer = useSelector((state) => state?.homeReducer);
  const buttonLoader = useSelector((state) => state?.homeReducer?.buttonLoader);
  const pointsData = useSelector((state) => state?.homeReducer?.pointsHistory);

  const onTabItemClick = (item) => {
    setTabItemClick(item.tabTitle);
    getMarketPlaces(item?.id);
  };

  useEffect(() => {
    getMarketPlaces(1);
  }, []);

  useEffect(() => {
    dispatch({
      type: types?.GET_NOTIFICATION_LIST,
      payload: { pageNo: 1, pageSize: 20 },
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: types.GET_POINTS_HISTORY,
      payload: { pageNo: 1, pageSize: 10 },
    });
  }, []);
  const notificationList = useSelector(
    (state) => state?.authReducer?.notificationList
  );
  const unReadNotification = notificationList.filter((x) => x.is_read == false);

  const getMarketPlaces = (id) => {
    dispatch({
      type: types?.GET_MARKETPLACES_API,
      payload: { from: "marketplace", id: id },
    });
  };

  const tabItems = (item) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.tabItems,
          borderBottomColor:
            item?.tabTitle === tabItemClick ? colors.lightBlue2 : colors.grey2,
          borderBottomWidth: item?.tabTitle === tabItemClick ? 2 : 0,

        }}
        onPress={() => onTabItemClick(item)}
      >
        <Text
          style={{
            ...styles.tabItemText,
            color:
              item?.tabTitle === tabItemClick
                ? colors.lightBlue2
                : colors.black2,
            fontFamily:
              item?.tabTitle === tabItemClick ? font.semiBold : font.regular,
          }}
        >
          {item.tabTitle}
        </Text>
      </TouchableOpacity>
    );
  };

  const onMarketItemClick = (item) => {
    navigation.navigate("MarketPlaceDetail", { data: item });
    dispatch({
      type: types?.GET_MARKET_PLACE_DETAILS,
      payload: { market_id: item?.user_id },
    });
  };

  const marketItems = (item) => {
    return (
      <TouchableOpacity
        style={styles.marketItemView}
        onPress={() => onMarketItemClick(item)}
      >
        <View>
          <Image
            style={styles.marketImage}
            source={{ uri: item.business_pic || "" }}
          />
        </View>

        <View style={styles.marketDetailView}>
          <View style={styles.marketDetailLeft}>
            <Text style={styles.marketNameText}>{item?.business_name}</Text>

            <View style={styles.locationView}>
              <Image
                style={styles.locationIcon}
                source={require("../../../assets/icons/location.png")}
              />
              <Text style={styles.locationText} numberOfLines={1}>
                {item?.address},{item?.city},{item?.state}
              </Text>
            </View>
          </View>
          <View style={styles.marketDetailRight}>
            <View style={styles.voucherView}>
              <Image
                style={styles.voucherIcon}
                source={require("../../../assets/icons/vouchers.png")}
              />
              <Text style={styles.voucherText}>
                {item?.vouchers}
                {item?.voucherCount} Vouchers
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <HeaderSection
          profile={true}
          notification={true}
          title={
            pointsData?.balance
              ? `${pointsData?.balance}  Available Points`
              : ""
          }
          titleStyle={{ fontSize: 18 }}
          notificationList={unReadNotification.length >= 1}
          onProfilePress={() => navigation.navigate("Profile")}
        />

        <View>
          <FlatList
            style={styles.tabContainer}
            horizontal
            data={categoryData}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => tabItems(item, index)}
          />
        </View>
        {buttonLoader ? (
          <View style={styles.loaderView}>
            <ActivityIndicator color={colors.appBlueColor} />
          </View>
        ) : (
          <FlatList
            style={styles.marketItemList}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            data={homeReducer?.marketPlaces}
            initialNumToRender={5}
            renderItem={({ item, index }) => marketItems(item, index)}
            ListEmptyComponent={() => (
              <View style={styles?.mainContainer}>
                <Image
                  source={require("../../../assets/icons/no_data_found.png")}
                  style={styles?.imageStyle}
                  resizeMode="contain"
                />
                <Text style={styles?.noDataFound}>Coming soon!</Text>
              </View>
            )}
          />
        )}
      </View>
    </>
  );
};

export default MarketPlace;
