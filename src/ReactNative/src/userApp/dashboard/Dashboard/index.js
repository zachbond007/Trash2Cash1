import React, { useEffect, useState, useCallback, useLayoutEffect, } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground, } from "react-native";

// Third Party
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// Constants
import { styles } from "./styles";
import { font } from "../../../constant/font";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import NoDataFound from "../../commonComponents/NodataFound";
import HeaderSection from "../../commonComponents/HeaderSection";
import CollectionItem from "../../commonComponents/CollectionItem";
import { tabs, verifyingFilterData, filterData } from "../../../constant/staticData";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Dashboard = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [filterValue, setFilterValue] = useState("All");
  let verifiedScreen = route?.params?.data;

  const huntList = useSelector((state) => state?.homeReducer?.huntList);
  const verifyingList = useSelector((state) => state?.homeReducer?.verifyingList);
  const verifyingListPgNo = useSelector((state) => state?.homeReducer?.verifyingListPgNo);
  const [verifyingStatus, setVerifyingStatus] = useState("New");
  const authReducer = useSelector((state) => state?.authReducer);
  const notificationList = useSelector((state) => state?.authReducer?.notificationList);
  const unReadNotification = notificationList.filter((x) => x.is_read == false);
  const [refreshing, setRefreshing] = useState(false);


  useLayoutEffect(() => {
    if (verifiedScreen === "0") {
      setTabIndex(1);
      setFilterValue("Verified");
    }
  });

  useEffect(() => {
    getVerifyingList();
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: types?.GET_NOTIFICATION_LIST,
        payload: { pageNo: 1, pageSize: 20 },
      });
    }, [])
  );

  const getVerifyingList = () => {
    dispatch({
      type: types?.GET_VERIFYING_DATA,
      payload: {
        huntStatus:
          verifyingStatus === "New"
            ? 1
            : verifyingStatus === "Verified"
              ? 3
              : 1,

        pageNo: 1,
        pageSize: 10
      },
    });
    dispatch({
      type: types.SET_VERIFY_LIST_PAGENO,
      payload: 0
    });
  };

  useEffect(() => {
    getHuntList();
  }, [filterValue]);

  const getHuntList = () => {
    dispatch({
      type: types?.GET_HUNT_DATA,
      payload: {
        huntStatus:
          filterValue === "All"
            ? 0
            : filterValue === "Pending"
              ? 1
              : filterValue === "Verified"
                ? 3
                : 0,
        pageNo: 1, pageSize: 10
      },
    });
  };

  const tabItems = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.tabView,
          borderBottomWidth: index === tabIndex ? 3 : 1,
          borderBottomColor:
            index === tabIndex ? colors.lightBlue2 : colors["grey-500"],
        }}
        onPress={() => {
          setTabIndex(index);
          getHuntList();
          getVerifyingList();
        }}
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

  const onCollectionClick = (item) => {
    if (tabIndex == 1) {
    } else {
      if (item?.hunt_status !== 3) {
        navigation.navigate("VerifyQuestions", item);
      } else {
        navigation.navigate("VerifiedHunt", item);
      }
    }
  };

  const collectionItem = ({ item }) => {
    return (
      <CollectionItem item={item} onPress={() => onCollectionClick(item)} />
    );
  };

  const filterClick = () => {
    setOpenModal(true);
  };

  const onFilterItemClick = (item) => {
    setFilterValue(item?.filter);
    setOpenModal(false);
  };

  const collectionHeader = () => {
    return (
      <View style={styles.collectionHeaderView}>
        <Text style={styles.titleText}>{message?.collectionCompleted}</Text>
        <TouchableOpacity
          style={styles.filterView}
          onPress={() => filterClick()}
        >
          <Text style={styles.filterText1}>{filterValue}</Text>
          <Image
            style={styles.filterIcon}
            source={require("../../../assets/icons/filter.png")}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const filterItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.filterItem}
        onPress={() => onFilterItemClick(item)}
      >
        <Text style={styles.filterText}>{item.filter}</Text>
      </TouchableOpacity>
    );
  };

  const onCreateHuntClick = () => {
    if (
      authReducer?.userCurrentLocation?.latitude &&
      authReducer?.userCurrentLocation?.longitude
    ) {
      navigation.navigate("SelectHunt");
    } else {
      alert(
        "LOCATION PERMISSION DENIED!Turn on location permission from device settings."
      );
    }
  };

  const filterModal = () => {
    return (
      <ImageBackground
        style={styles.modalImageBackground}
        source={require("../../../assets/icons/gradient_bg.png")}
      >
        <Modal
          isVisible={openModal}
          backdropColor={"transparent"}
          onBackdropPress={() => setOpenModal(false)}
          onBackButtonPress={() => setOpenModal(false)}
          animationIn={"bounceInUp"}
          animationOut={"fadeInDown"}
          style={styles.modalStyle}
        >
          <View style={styles.modalContainer}>
            <View style={styles.horizontalLine} />

            <FlatList
              data={filterData}
              style={styles.filterListStyle}
              renderItem={filterItem}
            />
          </View>
        </Modal>
      </ImageBackground>
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch({
      type: types?.GET_HUNT_DATA,
      payload: {
        huntStatus:
          filterValue === "All"
            ? 0
            : filterValue === "Pending"
              ? 1
              : filterValue === "Verified"
                ? 3
                : 0,
        pageNo: 1,
        pageSize: 10
      },
    });
    dispatch({
      type: types?.GET_VERIFYING_DATA,
      payload: {
        huntStatus:
          verifyingStatus === "New"
            ? 1
            : verifyingStatus === "Verified"
              ? 3
              : 1,

        pageNo: 1,
        pageSize: 10

      },
    });
    dispatch({
      type: types.SET_VERIFY_LIST_PAGENO,
      payload: 0
    });

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const loadMoreVerifyList = () => {
    if (verifyingList.length == (verifyingListPgNo + 1) * 10) {
      dispatch({
        type: types.SET_VERIFY_LIST_PAGENO,
        payload: verifyingListPgNo + 1
      });
      dispatch({
        type: types.GET_VERIFYING_DATA,
        payload: {
          huntStatus:
            verifyingStatus === "New"
              ? 1
              : verifyingStatus === "Verified"
                ? 3
                : 1,
          pageNo: verifyingListPgNo + 1, pageSize: 10
        }
      });

      dispatch({
        type: types?.GET_HUNT_DATA,
        payload: {
          huntStatus:
            filterValue === "All"
              ? 0
              : filterValue === "Pending"
                ? 1
                : filterValue === "Verified"
                  ? 3
                  : 0,
          pageNo: verifyingListPgNo + 1, pageSize: 10
        },
      });

    }
  }

  return (
    <View style={styles.mainContainer}>
      {openModal ? (
        filterModal()
      ) : (
        <View style={styles.mainContainer}>
          <TouchableOpacity
            style={styles.createPostToggle}
            onPress={() => onCreateHuntClick()}
          >
            <Image
              style={styles.createPostIcon}
              source={require("../../../assets/icons/float.png")}
            />
          </TouchableOpacity>
          <View>
            <HeaderSection
              profile={true}
              notification={true}
              notificationList={unReadNotification.length >= 1}
              onProfilePress={() => navigation.navigate("Profile")}
              onNotificationPress={() => navigation.navigate("Notifications")}
            />
          </View>
          <View style={styles.container}>
            {/* Tab View */}
            <View>
              <FlatList
                style={styles.tabContainer}
                horizontal
                data={tabs}
                renderItem={({ item, index }) => tabItems(item, index)}
              />
            </View>

            {tabIndex === 0 && (
              <View style={styles.radioContainer}>
                {verifyingFilterData?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.radioItem}
                      onPress={() => setVerifyingStatus(item.name)}
                    >
                      <Image
                        style={styles.radioIcon}
                        source={
                          item?.name === verifyingStatus
                            ? require("../../../assets/icons/radio_on.png")
                            : require("../../../assets/icons/radio_off.png")
                        }
                      />
                      <Text
                        style={{
                          ...styles.radioText,
                          fontFamily:
                            item?.name === verifyingStatus
                              ? font.semiBold
                              : font.medium,
                        }}
                      >
                        {item?.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
            {/* Collection List */}
            <FlatList
              style={styles.flatListContainer}
              onRefresh={onRefresh}
              refreshing={refreshing}
              initialNumToRender={10}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={tabIndex === 1 && collectionHeader}
              data={tabIndex === 1 ? huntList : verifyingList}
              renderItem={collectionItem}
              ListEmptyComponent={() => <NoDataFound />}

              onEndReachedThreshold={0.7}
              onEndReached={() => loadMoreVerifyList()}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Dashboard;
