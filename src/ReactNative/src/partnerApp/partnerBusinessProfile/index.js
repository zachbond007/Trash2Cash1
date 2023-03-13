import React, { useCallback } from "react";
import { View, Text, Platform, TouchableOpacity, Image, FlatList, ImageBackground } from "react-native";

// Third Party
import moment from "moment";
import Share from "react-native-share";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// Constants
import { styles } from "./styles";
import { types } from "../../action/ActionType";
import { message } from "../../constant/message";
import NoDataFound from "../../userApp/commonComponents/NodataFound";
import HeaderSection from "../../userApp/commonComponents/HeaderSection";

const PartnerBusinessProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const partnerUserDetails = useSelector(
    (state) => state?.authReducer?.partnerUserDetails
  );

  const deleteVoucher = (i) => {
    const body = {
      voucher_id: i?.voucher_id,
      is_deleted: 1,
    };
    dispatch({
      type: types?.DELETE_PARTNER_VOUCHER,
      payload: body,
    });
    dispatch({
      type: types?.GET_PARTNER_DETAILS,
    });
  };

  const editVoucher = (i) => {
    navigation.navigate("EditVoucher", i);
  };

  const url = "https://africau.edu/images/default/sample.pdf";
  const title = "Awesome Contents";
  const message1 =
    "Please check this out. Here is awesome application T2C(Trash2Cash) to earn while helping.";
  const icon = "data:<data_type>/<file_extension>;base64,<base64_data>";
  const options = Platform.select({
    ios: {
      activityItemSources: [
        {
          // For sharing url with custom title.
          placeholderItem: { type: "url", content: url },
          item: {
            default: { type: "url", content: url },
          },
          subject: {
            default: title,
          },
          linkMetadata: { originalUrl: url, url, title },
        },
        {
          // For sharing text.
          placeholderItem: { type: "text", content: message1 },
          item: {
            default: { type: "text", content: message1 },
            message: null, // Specify no text to share via Messages app.
          },
          linkMetadata: {
            // For showing app icon on share preview.
            title: message1,
          },
        },
        {
          // For using custom icon instead of default text icon at share preview when sharing with message.
          placeholderItem: {
            type: "url",
            content: icon,
          },
          item: {
            default: {
              type: "text",
              content: `${message1} ${url} ${icon}`,
            },
          },
          linkMetadata: {
            title: message1,
            icon: icon,
          },
        },
      ],
    },
    default: {
      title,
      subject: title,
      message: `${message1} ${url} ${icon}`,
    },
  });
  const voucherItem = (item) => {
    return (
      <View style={styles.voucherItemContainer}>
        <View style={styles.marketNameLeftView}>
          <Text style={styles.pointsText}>{item.title}</Text>
          <Text style={styles.voucherDescription}>
            {/* Available unlimited times per half an hour. */}
            Available once per{" "}
            {item?.offer_avail_interval == 1
              ? 24
              : item?.offer_avail_interval == 2
                ? 48
                : 72}{" "}
            hours.{" "}
            {item?.offer_per_user === 4 ? "unlimited" : item?.offer_per_user}{" "}
            times in total.
          </Text>
          <View style={styles.locationView}>
            <Image
              style={styles.pendingIcon}
              source={require("../../assets/icons/pending.png")}
            />
            <Text style={styles.timeText}>
              {moment(item?.time_from, "HH:mm a").format("hh:mm a") +
                " to " +
                moment(item?.time_to, "HH:mm a").format("hh:mm a")}
            </Text>
          </View>
        </View>

        <View style={styles.directionColumn}>
          <View style={styles.marketNameRightView2}>
            <TouchableOpacity
              style={styles.shareView}
              onPress={() => {
                Share.open(options);
              }}
            >
              <Image
                style={styles.voucherShareIcon}
                source={require("../../assets/icons/share1.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteView}
              onPress={() => deleteVoucher(item)}
            >
              <Image
                style={styles.voucherDeleteIcon}
                source={require("../../assets/icons/delete_row.png")}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.editView}
            onPress={() => editVoucher(item)}
          >
            <Image
              style={styles.voucherDeleteIcon}
              source={require("../../assets/icons/edit_icon.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const getCategoryName = (id) => {
    let category = [
      "",
      "Food & Beverage",
      "Entertainment",
      "Retail",
      "Gas",
      "Travel",
      "Grocery",
    ];
    return category[id];
  };

  const voucherHeader = () => {
    return (
      <View>
        <View style={styles.marketNameView}>
          <View style={styles.marketNameLeftView}>
            <Text style={styles.marketNameText}>
              {partnerUserDetails?.business_Name}
            </Text>
            <View style={styles.locationView}>
              <Image
                style={styles.locationIcon}
                source={require("../../assets/icons/location.png")}
              />
              <Text style={styles.locationText}>
                {partnerUserDetails?.city ?? partnerUserDetails?.city + ","}{" "}
                {``}
                {partnerUserDetails?.address}
              </Text>
            </View>
          </View>

          <View style={styles.marketNameRightView}>
            <TouchableOpacity
              style={styles.marketNameRightView}
              onPress={() => navigation.navigate("EditBusinessProfile")}
            >
              <Image
                style={styles.editIcon}
                source={require("../../assets/icons/edit_info.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.categoryTitle}>
          Category
          <Text style={styles.categoryText}>
            {" "}
            {getCategoryName(partnerUserDetails?.industry_Id)}
          </Text>
        </Text>

        <Text style={styles.marketDescriptionText}>
          {partnerUserDetails?.about_Business}
        </Text>
        <View style={styles.VoucherHeaderStyle}>
          <View style={styles.voucherHeaderComponent}>
            <Image
              style={styles.pendingIcon}
              source={require("../../assets/icons/vouchers_blue.png")}
            />
            <Text style={styles.voucherText}>{message?.voucher}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateVoucher")}
          >
            <Image
              style={styles.editIcon}
              source={require("../../assets/icons/add.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const createHotspot = () => {
    navigation.navigate("CreateHotspot");
  };

  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: types?.GET_PARTNER_DETAILS,
      });
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <HeaderSection
        onBackPress={() => navigation.goBack()}
        backButton={true}
        profileRight={true}
        rightText={"New Trash Hotspot"}
        rightTextClick={() => createHotspot()}
        onProfilePress={() => navigation.navigate("PartnerProfile")}
      />

      <View style={styles.marketImageView}>
        <ImageBackground
          source={{ uri: partnerUserDetails?.business_pic }}
          resizeMode="cover"
          style={styles.marketImage}
        >
          <TouchableOpacity
            style={styles.reviewTag}
            onPress={() => {
              navigation.navigate("RateReview", {
                partnersId: partnerUserDetails?.user_Id,
              });
            }}
          >
            <Image
              style={styles.starIcon}
              source={require("../../assets/icons/star.png")}
            />
            <Text style={styles.reviewText}>
              {partnerUserDetails?.review_count} Review
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.marketDetailView}>
        <FlatList
          style={styles.voucherListStyle}
          removeClippedSubviews={true}
          ListHeaderComponent={voucherHeader}
          showsVerticalScrollIndicator={false}
          data={partnerUserDetails?.lstVoucherResponse?.vouchers}
          renderItem={({ item, index }) => voucherItem(item, index)}
          ListEmptyComponent={() => <NoDataFound />}
        />
      </View>
    </View>
  );
};


export default PartnerBusinessProfile;
