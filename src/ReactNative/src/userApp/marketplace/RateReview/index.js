import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, ImageBackground, ActivityIndicator } from "react-native";

// Third Party
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

// Constants
import { styles } from "./styles";
import { types } from "../../../action/ActionType";
import NoDataFound from "../../commonComponents/NodataFound";
import HeaderSection from "../../commonComponents/HeaderSection";

const RateReview = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const id = route?.params?.partnersId;

  const reviewListData = useSelector(
    (state) => state?.homeReducer?.reviewListData
  );
  const buttonLoader = useSelector(
    (state) => state?.partnerReducer?.buttonLoader
  );
  useEffect(() => {
    dispatch({
      type: types?.GET_REVIEW_LIST,
      payload: id,
    });
  }, []);

  const reviewItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.reviewItemView}>
        <View style={styles.imageView}>
          <ImageBackground
            source={require("../../../assets/icons/profile_circle.png")}
            style={styles?.profileImageView}
          >
            {item.profile_pic ? (
              <Image
                style={styles.profileImageView}
                source={{ uri: item.profile_pic }}
              />
            ) : (
              <Image
                source={require("../../../assets/icons/user_icon.png")}
                style={styles?.profileImageView}
                resizeMode="contain"
              />
            )}
          </ImageBackground>
        </View>
        <View style={styles.reviewNameView}>
          <Text style={styles.reviewNameText}>{item?.username}</Text>
          <Text style={styles.reviewText}>{item?.review}</Text>
        </View>

        <View style={styles.reviewRightIconView}>
          <View style={styles.iconView}>
            <Image
              style={styles.starIcon}
              source={require("../../../assets/icons/star_active.png")}
            />
            <Text style={styles.ratingCount}>{item?.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {buttonLoader ? (
        <View style={styles?.loaderView}>
          <ActivityIndicator color={colors.appBlueColor} />
        </View>
      ) : (
        <View style={styles.container}>
          <HeaderSection
            backButton={true}
            title={"Rating & Reviews"}
            onBackPress={() => navigation.goBack()}
          />

          <FlatList
            data={reviewListData?.reviews}
            showsVerticalScrollIndicator={false}
            renderItem={reviewItem}
            style={styles.rateReviewList}
            ListEmptyComponent={<NoDataFound />}
          />
        </View>
      )}
    </>
  );
};

export default RateReview;
