import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, ImageBackground, TextInput } from "react-native";

// Third Party
import Modal from "react-native-modal";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { styles } from "./styles";
import { font } from "../../constant/font";
import { colors } from "../../constant/colors";
import { types } from "../../action/ActionType";
import { friendsTabs } from "../../constant/staticData";
import LinearButton from "../commonComponents/LinearButton";
import HeaderSection from "../commonComponents/HeaderSection";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Friends = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [recommendedList, setRecommendedList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(
    route.params.tabIndexx ? route.params.tabIndexx : 0
  );
  const [facebookToggle, setFacebookToggle] = useState(false);
  const [twitterToggle, setTwitterToggle] = useState(false);
  const [toggleKey, setToggleKey] = useState();
  const [search, setSearch] = useState("");
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [recommendedId, setRecommendedId] = useState();
  const [requestedId, setRequestedId] = useState();
  const [connectedId, setConnectededId] = useState();

  const recommendedFriendlist = useSelector(
    (state) => state?.homeReducer?.recommendedFriendlist,
    shallowEqual
  );
  const requestFriendlist = useSelector(
    (state) => state?.homeReducer?.requestFriendlist,
    shallowEqual
  );
  const connectedFriendList = useSelector(
    (state) => state.homeReducer.friendList,
    shallowEqual
  );
  const homeReducer = useSelector((State) => State?.homeReducer, shallowEqual);
  const loader = useSelector((state) => state?.homeReducer?.buttonLoader);

  useFocusEffect(
    useCallback(() => {
      getFriendList();
    }, [])
  );

  useEffect(() => {
    setRecommendedList(
      tabIndex === 0
        ? connectedFriendList?.friends
        : tabIndex === 1
          ? requestFriendlist
          : recommendedFriendlist
    );
    setMasterDataSource(
      tabIndex === 0
        ? connectedFriendList?.friends
        : tabIndex === 1
          ? requestFriendlist
          : recommendedFriendlist
    );
  }, [connectedFriendList, requestFriendlist, recommendedFriendlist, tabIndex]);

  useEffect(() => {
    onFilterClickClose();
  }, [facebookToggle, twitterToggle, toggleKey]);

  const getFriendList = () => {
    dispatch({
      type: types.GET_FRIEND_LIST,
    });
    dispatch({
      type: types?.GET_REQUEST_FRIEND_LIST,
    });
    dispatch({
      type: types?.GET_RECOMMENDATION_FRIEND_LIST,
    });
  };

  useEffect(() => {
    setSearch("");
  }, [tabIndex]);

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
          setTabIndex(index), getFriendList();
        }}
      >
        <Text
          numberOfLines={1}
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

  {/*  will be used later */ }
  const onFilterClick = () => {
    setOpenModal(true);
  };

  const onChangeFilter = (key) => {
    setToggleKey(key);
    if (key === "Facebook") {
      setFacebookToggle(!facebookToggle);
      onFilterClickClose(toggleKey);
    } else setTwitterToggle(!twitterToggle);
    onFilterClickClose(toggleKey);
  };

  const onFilterClickClose = () => {
    let facebookFriendList =
      tabIndex === 0
        ? connectedFriendList?.friends
        : tabIndex === 1
          ? requestFriendlist
          : recommendedFriendlist;
    if (toggleKey === "Facebook") {
      if (facebookToggle === true && twitterToggle === true) {
        facebookFriendList = facebookFriendList.filter(
          (x) => x.social_platform == 2 || x.social_platform == 1
        );
        setRecommendedList(facebookFriendList);
      } else if (facebookToggle === true && twitterToggle === false) {
        facebookFriendList = facebookFriendList.filter(
          (x) => x.social_platform == 1
        );
        setRecommendedList(facebookFriendList);
      } else if (facebookToggle === false && twitterToggle === true) {
        facebookFriendList = facebookFriendList.filter(
          (x) => x.social_platform == 2
        );
        setRecommendedList(facebookFriendList);
      } else if (facebookToggle === false && twitterToggle === false) {
        setRecommendedList(
          tabIndex === 0
            ? connectedFriendList?.friends
            : tabIndex === 1
              ? requestFriendlist
              : recommendedFriendlist
        );
      } else {
        setRecommendedList(
          tabIndex === 0
            ? connectedFriendList?.friends
            : tabIndex === 1
              ? requestFriendlist
              : recommendedFriendlist
        );
      }
    } else if (toggleKey === "Twitter") {
      if (facebookToggle === true && twitterToggle === true) {
        facebookFriendList = facebookFriendList.filter(
          (x) => x.social_platform == 2 || x.social_platform == 1
        );
        setRecommendedList(facebookFriendList);
      } else if (facebookToggle === true && twitterToggle === false) {
        facebookFriendList = facebookFriendList.filter(
          (x) => x.social_platform == 1
        );
        setRecommendedList(facebookFriendList);
      } else if (facebookToggle === false && twitterToggle === true) {
        facebookFriendList = facebookFriendList.filter(
          (x) => x.social_platform == 2
        );
        setRecommendedList(facebookFriendList);
      } else if (facebookToggle === false && twitterToggle === false) {
        setRecommendedList(
          tabIndex === 0
            ? connectedFriendList?.friends
            : tabIndex === 1
              ? requestFriendlist
              : recommendedFriendlist
        );
      }
    } else {
      setRecommendedList(
        tabIndex === 0
          ? connectedFriendList?.friends
          : tabIndex === 1
            ? requestFriendlist
            : recommendedFriendlist
      );
    }
  };

  {
    /*  will be used later */
  }
  const filterModal = () => {
    return (
      <Modal
        isVisible={openModal}
        backdropColor={"transparent"}
        onBackdropPress={() => setOpenModal(false)}
        onBackButtonPress={() => setOpenModal(false)}
        animationIn={"bounceInUp"}
        animationOut={"fadeInDown"}
        style={styles.modalStyle}
        customBackdrop={
          <TouchableOpacity
            onPress={() => setOpenModal(false)}
            style={styles.modalImageBackground}
          >
            <Image
              style={styles.modalImageBackground}
              source={require("../../assets/icons/overlay.png")}
              onPress={() => setOpenModal(false)}
            />
          </TouchableOpacity>
        }
      >
        <View style={styles.modalContainer}>
          <View style={styles.horizontalLine} />
          <View style={styles.filterItemModal}>
            <Text style={styles.filterHeadingText}>Find Friends from...</Text>
            <View style={styles.filterItem}>
              <Text style={styles.filterItemText}>Facebook</Text>
              <TouchableOpacity onPress={() => onChangeFilter("Facebook")}>
                {facebookToggle ? (
                  <Image
                    style={styles.toggleOnIcon}
                    source={require("../../assets/icons/toggle_on_1.png")}
                  />
                ) : (
                  <Image
                    style={styles.toggleOffIcon}
                    source={require("../../assets/icons/toggle_off_1.png")}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.filterItem}>
              <Text style={styles.filterItemText}>Twitter</Text>
              <TouchableOpacity onPress={() => onChangeFilter("Twitter")}>
                {twitterToggle ? (
                  <Image
                    style={styles.toggleOnIcon}
                    source={require("../../assets/icons/toggle_on_1.png")}
                  />
                ) : (
                  <Image
                    style={styles.toggleOffIcon}
                    source={require("../../assets/icons/toggle_off_1.png")}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const sendRequest = (i) => {
    let id = i;
    dispatch({
      type: types?.POST_SEND_FRIEND_REQUEST,
      payload: i,
    });
  };

  const connectedFriendItems = ({ item }) => {
    return (
      <View style={styles.friendItem}>
        <View style={styles.friendLeftView}>
          <ImageBackground
            source={require("../../assets/icons/profile_circle.png")}
            style={[styles?.friendImage, { justifyContent: "center" }]}
          >
            <Image
              source={
                item?.profile_pic
                  ? { uri: item.profile_pic }
                  : require("../../assets/icons/user_icon.png")
              }
              style={[
                styles?.friendImage,
                { height: wp("14%"), width: wp("14%"), alignSelf: "center" },
              ]}
              resizeMode="cover"
            />
          </ImageBackground>
        </View>
        <View style={styles.friendRightContainer}>
          <View style={styles.friendCenterView}>
            <Text style={styles.friendNameText}>{item?.username} </Text>
            {item?.social_platform === 0 ? (
              <Text style={styles.platformText}>Trash 2 Cash Friend</Text>
            ) : item?.social_platform === 1 ? (
              <Text style={styles.platformText}>Facebook Friend</Text>
            ) : (
              <Text style={styles.platformText}>Twitter Friend</Text>
            )}
          </View>

          <View style={styles.friendRightView}>
            <LinearButton
              onPress={() => {
                unfriendFriend(item), setConnectededId(item?.user_friends_id);
              }}
              style={styles.statusButton}
              title={"UNFRIEND"}
              titleStyle={styles.statusButtonText}
              colors={["rgba(255, 196, 0, 0.7)", "rgba(253, 122, 21, 0.7)"]}
              disable={loader}
              loader={
                connectedId === item?.user_friends_id
                  ? homeReducer?.buttonLoader
                  : false
              }
            />
          </View>
        </View>
      </View>
    );
  };

  const recommendedFriendItems = ({ item }) => {
    return (
      <View style={styles.friendItem}>
        <View style={styles.friendLeftView}>
          <ImageBackground
            source={require("../../assets/icons/profile_circle.png")}
            style={[styles?.friendImage, { justifyContent: "center" }]}
          >
            <Image
              source={
                item?.profile_pic
                  ? { uri: item.profile_pic }
                  : require("../../assets/icons/user_icon.png")
              }
              style={[
                styles?.friendImage,
                { height: wp("14%"), width: wp("14%"), alignSelf: "center" },
              ]}
              resizeMode="cover"
            />
          </ImageBackground>
        </View>
        <View style={styles.friendRightContainer}>
          <View style={styles.friendCenterView}>
            <Text style={styles.friendNameText}>{item?.username}</Text>
            {item?.social_platform === 0 ? (
              <Text style={styles.platformText}>Trash 2 Cash Friend</Text>
            ) : item?.social_platform === 1 ? (
              <Text style={styles.platformText}>Facebook Friend</Text>
            ) : (
              <Text style={styles.platformText}>Twitter Friend</Text>
            )}
          </View>

          <View style={styles.friendRightView}>
            {item?.status === 0 ? (
              <TouchableOpacity style={styles.completedButton}>
                <Image
                  style={styles.checkIcon}
                  source={require("../../assets/icons/connected_check.png")}
                />
                <Text style={styles.completedButtonText}>{"REQUESTED"}</Text>
              </TouchableOpacity>
            ) : item?.status === 4 ||
              item?.status === 3 ||
              item?.status === 2 ? (
              <LinearButton
                onPress={() => {
                  sendRequest(item?.friend_id),
                    setRecommendedId(item?.friend_id);
                }}
                disable={loader}
                loader={
                  recommendedId === item?.friend_id
                    ? homeReducer?.buttonLoader
                    : false
                }
                style={styles.statusButton}
                title={"REQUEST"}
                titleStyle={styles.statusButtonText}
                colors={["rgba(255, 196, 0, 0.7)", "rgba(253, 122, 21, 0.7)"]}
              />
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  const acceptRequest = (item, key) => {
    if (key === "accept") {
      dispatch({
        type: types.POST_ACCEPT_FRIEND_REQUEST,
        payload: { friendId: item?.requester_id, requestKey: 1 },
      });
    } else {
      dispatch({
        type: types.POST_ACCEPT_FRIEND_REQUEST,
        payload: { friendId: item?.requester_id, requestKey: 2 },
      });
    }
  };

  const requestFriendItems = ({ item }) => {
    return (
      <View style={styles.friendItem}>
        <View style={styles.friendLeftView}>
          <ImageBackground
            source={require("../../assets/icons/profile_circle.png")}
            style={[styles?.friendImage, { justifyContent: "center" }]}
          >
            <Image
              source={
                item?.profile_pic
                  ? { uri: item.profile_pic }
                  : require("../../assets/icons/user_icon.png")
              }
              style={[
                styles?.friendImage,
                { height: wp("14%"), width: wp("14%"), alignSelf: "center" },
              ]}
              resizeMode="cover"
            />
          </ImageBackground>
        </View>
        <View style={styles.friendRightContainer}>
          <View style={styles.friendCenterView}>
            <Text style={styles.friendNameText}>{item?.username}</Text>
            {item?.social_platform === 0 ? (
              <Text style={styles.platformText}>Trash 2 Cash Friend</Text>
            ) : item?.social_platform === 1 ? (
              <Text style={styles.platformText}>Facebook Friend</Text>
            ) : (
              <Text style={styles.platformText}>Twitter Friend</Text>
            )}
          </View>
          <View style={styles.friendRequestRightView}>
            <TouchableOpacity
              onPress={() => {
                acceptRequest(item, "accept"),
                  setRequestedId(item?.requester_id);
              }}
              disable={loader}
              loader={
                requestedId === item?.requester_id
                  ? homeReducer?.buttonLoader
                  : false
              }
            >
              <Image
                source={require("../../assets/icons/accept.png")}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                acceptRequest(item, "reject"),
                  setRequestedId(item?.requester_id);
              }}
              disable={loader}
              loader={
                requestedId === item?.requester_id
                  ? homeReducer?.buttonLoader
                  : false
              }
            >
              <Image
                source={require("../../assets/icons/reject.png")}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const unfriendFriend = (item) => {
    dispatch({
      type: types.POST_UNFRIEND_FRIEND,
      payload: item?.user_friends_id,
    });
  };

  const NoFriend = () => {
    return (
      <View style={styles.noFriendContainer}>
        <Text style={styles.noFriendText}>
          {tabIndex === 0
            ? connectedFriendList?.message
            : tabIndex === 1
              ? `You don't have any friend.`
              : recommendedFriendlist?.message}
        </Text>
      </View>
    );
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.username
          ? item.username.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setRecommendedList(newData);
      setSearch(text);
    } else {
      setRecommendedList(masterDataSource);
      setSearch(text);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch({
      type: types.GET_FRIEND_LIST,
    });
    dispatch({
      type: types?.GET_REQUEST_FRIEND_LIST,
    });
    dispatch({
      type: types?.GET_RECOMMENDATION_FRIEND_LIST,
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      {filterModal()}
      <HeaderSection
        backButton={true}
        title={"Friends"}
        onBackPress={() => {
          navigation.goBack(), setTabIndex(0);
        }}
      />
      <View style={styles.tabMainView}>
        <FlatList
          style={styles.tabContainer}
          horizontal
          data={friendsTabs}
          renderItem={({ item, index }) => tabItems(item, index)}
        />
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchTextInputView}>
          <Image
            style={styles.searchIcon}
            source={require("../../assets/icons/search.png")}
          />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search by T2C users..."
            placeholderTextColor={colors.grey}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
          />
          {/*  will be used later */}

          {/* <TouchableOpacity onPress={() => onFilterClick()}>
            <Image
              style={styles.searchFilterIcon}
              source={require("../../assets/icons/search_filter.png")}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      <FlatList
        removeClippedSubviews={true}
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={recommendedList}
        renderItem={
          tabIndex === 0
            ? connectedFriendItems
            : tabIndex === 1
              ? requestFriendItems
              : recommendedFriendItems
        }
        ListEmptyComponent={<NoFriend />}
      />
    </View>
  );
};

export default Friends;
