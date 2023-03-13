import React, { useEffect } from "react";
import { View, Text, Image, TextInput } from "react-native";

// Third Party
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import NoDataFound from "../../../userApp/commonComponents/NodataFound";
import LinearButton from "../../../userApp/commonComponents/LinearButton";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";

const SendGifts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userBalancePoints = useSelector(
    (state) => state?.homeReducer?.userBalancePoints
  );
  const friendList = useSelector(
    (state) => state?.homeReducer?.friendList?.friends
  );

  useEffect(() => {
    dispatch({
      type: types.GET_USER_BALANCE_POINTS,
    });
  }, []);

  const renderRecentList = ({ item }) => {
    return (
      <View style={styles?.cardMainView}>
        <View style={styles?.profileMainView}>
          <Image
            source={
              item?.profile_pic
                ? { uri: item?.profile_pic }
                : require("../../../assets/icons/user_icon.png")
            }
            style={styles?.profilIcon}
          />
        </View>

        <View style={styles?.mainViewName}>
          <View>
            <Text style={styles?.usernametext}>{item?.username}</Text>
            <Text style={styles?.emailStyle}>
              {" "}
              {item?.social_platform == 0
                ? "Trash 2 Cash Friend"
                : item?.social_platform == 1
                  ? "Facebook Friend"
                  : "Twitter Friend"}
            </Text>
          </View>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#FD7A15", "#FFC400"]}
            style={styles?.sendTouch}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("SendMoney", item)}
            >
              <Text
                style={styles.sendText}
              >
                Send
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  };

  return (
    <View style={styles?.mainContainer}>
      {/* Back button */}
      <HeaderSection
        backButton={true}
        onBackPress={() => navigation?.goBack()}
        title={"Gift to User"}
      />

      <View style={styles?.mainView}>
        <View style={styles.containerView}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[
              colors?.lightBlue2,
              colors?.lightBlue2,
              colors?.yellow3,
              colors?.yellow3,
            ]}
            style={styles?.linearView}
          >
            <Text style={styles?.enterPoint}>YOUR BALANCE</Text>
            <Text style={styles?.pointText}>
              {userBalancePoints?.total_points}
              <Text style={styles?.pointText1}> Points</Text>
            </Text>
          </LinearGradient>

          {/* search box */}
          <View style={styles?.searchMainView}>
            <Image
              source={require("../../../assets/icons/grey_search.png")}
              style={styles?.searchIcon}
            />
            <TextInput
              style={styles?.textInputStyle}
              placeholder="Search By Name"
            />
          </View>
          <Text style={styles?.recentTExt}>Recent Searched</Text>

          {/* users recent list */}
          <FlatList
            data={friendList}
            renderItem={renderRecentList}
            ListEmptyComponent={<NoDataFound />}
          />
        </View>

        {/* send button */}
        <View style={styles?.bottomView}>
          <LinearButton title={message?.send} />
        </View>
      </View>
    </View>
  );
};

export default SendGifts;
