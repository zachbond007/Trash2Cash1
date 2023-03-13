import React, { useState } from "react";
import { View, Text, ImageBackground, Image, TextInput } from "react-native";

// Third Party
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

// Constants
import { styles } from "./styles";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import LinearButton from "../../../userApp/commonComponents/LinearButton";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";

const SendMoney = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const totalPoints = useSelector(
    (state) => state?.homeReducer?.userBalancePoints?.total_points
  );

  let item = route.params;
  const [sendPoints, setSendPoints] = useState();

  const sendPointToFriend = () => {
    if (sendPoints == null) {
      showMessage({
        message: "Please enter points to send",
        type: "danger",
      });
    } else if (totalPoints == 0) {
      showMessage({
        message: "You have no points to send",
        type: "danger",
      });
    } else if (sendPoints < 0) {
      showMessage({
        message: "Please enter correct points",
        type: "danger",
      });
    } else if (sendPoints > totalPoints) {
      showMessage({
        message:
          "You have only " + totalPoints + " Please enter less than this",
        type: "danger",
      });
    } else {
      let body = {
        ToUserId: item?.friend_id,
        Points: sendPoints,
      };
      dispatch({
        type: types.POST_SEND_GIFT_POINT_TO_USER,
        payload: body,
      });
    }
  };

  return (
    <View style={styles?.mainContainer}>
      {/* Back button */}
      <HeaderSection
        backButton={true}
        onBackPress={() => navigation?.goBack()}
        title={"Send Point"}
      />

      <View style={styles?.mainView}>
        <View
          style={styles.containerView}
        >
          {/* profile and name */}
          <View style={styles?.upperStyle}>
            <View style={styles?.profileMainView}>
              <ImageBackground
                source={require("../../../assets/icons/profile_circle.png")}
                style={styles?.imageProfilebackground}
              >
                <Image
                  source={
                    item?.profile_pic
                      ? { uri: item?.profile_pic }
                      : require("../../../assets/icons/user_icon.png")
                  }
                  style={styles?.userprofile}
                />
              </ImageBackground>
            </View>

            <View style={styles?.userView}>
              <Text style={styles?.usernametext}>{item?.username}</Text>
              <Text style={styles?.emailStyle}>
                {item?.social_platform == 0
                  ? "Trash2Cash Friend"
                  : friendType?.social_platform == 1
                    ? "Facebook Friend"
                    : "Twitter Friend"}
              </Text>
            </View>
          </View>

          {/* send box */}
          <View style={styles.sendBoxView}>
            <Text style={styles?.enterPoint}>Enter Points</Text>
            <TextInput
              style={styles?.pointText}
              value={sendPoints}
              onChangeText={(p) => setSendPoints(p)}
            />
          </View>
        </View>

        <View style={styles?.bottomView}>
          <LinearButton
            onPress={() => sendPointToFriend()}
            title={message?.send}
          />
        </View>
      </View>
    </View>
  );
};

export default SendMoney;
