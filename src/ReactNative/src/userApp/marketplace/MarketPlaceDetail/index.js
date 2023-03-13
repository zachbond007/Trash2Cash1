import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, ImageBackground, ActivityIndicator, Platform, ScrollView } from "react-native";

// Third Party
import moment from "moment";
import Share from "react-native-share";
import Modal from "react-native-modal";
import Toast from "react-native-simple-toast";
import { AirbnbRating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import NoDataFound from "../../commonComponents/NodataFound";
import LinearButton from "../../commonComponents/LinearButton";
import HeaderSection from "../../commonComponents/HeaderSection";

const MarketPlaceDetail = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data = route?.params?.data;
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const marketDetails = useSelector(
    (state) => state?.homeReducer?.marketPlacesDetails
  );
  const loader = useSelector((state) => state?.homeReducer?.buttonLoader);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [voucherIndex, setVoucherIndex] = useState();
  const [voucherId, setVoucherId] = useState();
  const [voucherCode, setVoucherCode] = useState();
  const [offerPerUser, setOfferPerUser] = useState();
  const [redeemMessage, setRedeemMessage] = useState();
  const [redeemDisable, setRedeemDisable] = useState(false);
  const [voucherTitle, setVoucherTitle] = useState();
  const id = marketDetails?.user_Id;
  const pointsData = useSelector((state) => state?.homeReducer?.pointsHistory);
  const loginData = useSelector((state) => state?.authReducer?.loginData);

  const voucherItem = ({ item }) => {
    return (
      <View style={styles.voucherItemContainer}>
        <View style={styles.marketNameLeftView}>
          <Text style={styles.pointsText}>{item?.title}</Text>
          <View style={styles.pendingView}>
            <Image
              style={styles.pendingIcon}
              resizeMode="contain"
              source={require("../../../assets/icons/pending.png")}
            />
            <Text style={styles.timeText}>
              {"Valid from "}
              {moment(item?.valid_from).format("Do MMM")},{" "}
              {moment(item?.time_from, "HH:mm:ss").format("h:mm A")} {" to "}
              {moment(item?.valid_to).format("Do MMM")},{" "}
              {moment(item?.time_to, "HH:mm:ss").format("h:mm A")}
            </Text>
          </View>
        </View>

        <View style={styles.marketNameRightView}>
          <View style={styles.directionColumn}>
            <LinearButton
              style={styles.voucherButtonStyle}
              title={
                item?.is_redeem === 0
                  ? "Buy"
                  : item?.is_redeem === 1
                    ? "Redeem"
                    : "Review"
              }
              titleStyle={{
                color: item?.is_redeem === 1 ? colors.logout : colors.white,
              }}
              colors={
                item?.is_redeem === 1
                  ? ["rgba(26, 166, 191,0.2)", "rgba(211, 222, 24,0.2)"]
                  : [colors?.lightBlue2, colors?.yellow3]
              }
              onPress={() => voucherButtonClick(item)}
            />
            {item?.message ? (
              <TouchableOpacity
                style={styles.reviewButton}
                onPress={() => voucherButtonClick(item, "Review")}
              >
                <Text
                  style={styles.reviewTextView}
                >{`Review`}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  const voucherButtonClick = (item, type) => {
    setVoucherIndex(item);
    setVoucherId(item?.voucher_id);
    setVoucherCode(item?.voucher_code);
    setOfferPerUser(item?.offer_per_user);
    setVoucherTitle(item?.title);
    if (item.is_redeem === 0) {
      setOpenModal(true);
      setModalType("Buy");
      setRedeemMessage(item?.message);
    } else if (item.is_redeem === 1) {
      if (type === "Review") {
        setOpenModal(true);
        setModalType("Rating");
      } else {
        let currentTime = moment();
        if (
          moment(currentTime).format("HH:mm A") >
          moment(item?.time_from, "HH:mm:ss").format("HH:mm A") &&
          moment(currentTime).format("HH:mm A") <
          moment(item?.time_to, "HH:mm:ss").format("HH:mm A")
        ) {
          setRedeemDisable(false);
          if (item?.message && offerPerUser === 4) {
            setRedeemMessage(item?.message);
          } else {
            setRedeemMessage(
              `This voucher will expire 30 minutes after you hit ‘Redeem’, do you wish to continue?`
            );
          }
        } else {
          setRedeemDisable(true);
          setRedeemMessage(
            `Sorry, this voucher can only be redeemed from ${moment(
              item?.time_from,
              "HH:mm:ss"
            ).format("h:mm A")} to ${moment(item?.time_to, "HH:mm:ss").format(
              "h:mm A"
            )}.`
          );
        }
        setOpenModal(true);
        setModalType("UnlimitedRedeem");
      }
    } else {
      setOpenModal(true);
      setModalType("Rating");
    }
  };

  const onSubmitButton = () => {
    if (review?.trim() === "") {
      Toast.show("Enter Review to submit.", Toast.LONG);
    } else {
      const body = {
        to_user_id: id,
        rating: rating,
        review: review?.trim(),
      };
      dispatch({
        type: types?.POST_REVIEW_LIST,
        payload: body,
      });
      setOpenModal(false);
      navigation.navigate("RateReview", { partnersId: marketDetails?.user_Id });
    }
  };

  const url =
    Platform.OS === "ios"
      ? "https://apps.apple.com/us/app/trash-cash/id1610109235"
      : "https://play.google.com/store/apps/details?id=com.trash2cash";
  const title = "Turn Trash into Cash!";
  const message1 = `${marketDetails?.business_Name} is giving ${voucherTitle} for being green! @trash2cashh`;
  const options = Platform.select({
    default: {
      title,
      subject: title,
      message: `${message1} ${url}`,
    },
  });

  const sharePoints = () => {
    Share.open(options)
      .then((res) => {
        dispatch({
          type: types?.POST_SHARE_VOUCHER_POINTS,
          payload: { Voucher_Id: voucherId, shared_via: "Facebook" },
        });
      })
      .catch((err) => {
      });
  };

  const [viewRef, setViewRef] = useState();
  const [modalHeight, setModalHeight] = useState(false);
  const voucherModals = () => {
    return (
      <>
        <Modal
          isVisible={openModal}
          animationType="fade"
          transparent={true}
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
                source={require("../../../assets/icons/overlay.png")}
                onPress={() => setOpenModal(false)}
              />
            </TouchableOpacity>
          }
        >
          <View style={styles.modalContainer}>
            <View style={styles.horizontalLine} />
            <View style={styles.rewardView}>
              {modalType === "Buy" && (
                <View style={styles.buyView}>
                  <Image
                    style={styles.rewardImage}
                    source={require("../../../assets/icons/voucher_icon.png")}
                  />
                  <Text style={styles.buyContent}>
                    {voucherIndex?.title} at {marketDetails?.business_Name} for{" "}
                    {voucherIndex?.points_req} points, do you wish to purchase
                    this?
                  </Text>

                  <View style={styles.buyButtonView}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => {
                        setOpenModal(false), setViewRef(viewRef);
                      }}
                    >
                      <Text style={styles.cancelText}>NO</Text>
                    </TouchableOpacity>

                    <LinearButton
                      title={"YES"}
                      colors={[
                        colors.turquoiseBlue,
                        colors.limeGreen,
                      ]}
                      titleStyle={styles.buyText}
                      style={styles.buyButton}
                      onPress={() => buyVoucher()}
                    />
                  </View>
                </View>
              )}

              {modalType === "Rating" && (
                <ScrollView
                  style={{ paddingBottom: modalHeight ? wp("70%") : null }}
                >
                  <View style={styles.buyView}>
                    <Image
                      style={styles.rewardImage}
                      source={require("../../../assets/icons/rate.png")}
                    />
                    <Text style={styles.rateText}>Rate Your Experience</Text>

                    <AirbnbRating
                      count={5}
                      showRating={false}
                      defaultRating={5}
                      starContainerStyle={styles.starContainerStyle}
                      size={wp("5.5%")}
                      onFinishRating={(r) => setRating(r)}
                    />
                  </View>

                  <View style={styles.provideReviewView}>
                    <TextInput
                      placeholder="Provide your review..."
                      style={styles.reviewTextInput}
                      placeholderTextColor={colors.grey}
                      multiline
                      maxLength={250}
                      autoCapitalize="none"
                      onFocus={() => setModalHeight(true)}
                      onBlur={() => setModalHeight(false)}
                      onChangeText={(text) => {
                        setReview(text);
                      }}
                      value={review}
                    />
                    <View
                      style={styles.limitView}
                    >
                      <Text
                        style={limitTextView}
                      >
                        {review?.length}/250
                      </Text>
                    </View>
                  </View>

                  <View style={styles.submitButtonView}>
                    <LinearButton
                      title={"SUBMIT"}
                      colors={[
                        colors.turquoiseBlue,
                        colors.limeGreen,
                      ]}
                      titleStyle={styles.buyText}
                      onPress={() => onSubmitButton()}
                    />
                  </View>
                </ScrollView>
              )}

              {modalType === "Redeem" && (
                <View style={styles.redeemView}>
                  <Text style={styles.redeemTitle}>{voucherIndex?.title}</Text>
                  <Image
                    style={styles.offerImage}
                    source={require("../../../assets/icons/an2.gif")}
                  />
                  <Text style={styles.redeemTitle2}>
                    *Cannot be used in conjunction with any other discounts*
                  </Text>
                  <View>
                    <ImageBackground
                      style={styles.codeBarView}
                      resizeMode="center"
                      source={require("../../../assets/icons/code_bar.png")}
                    >
                      <Text style={styles.codeBarText}>{voucherCode}</Text>
                    </ImageBackground>
                  </View>
                  <TouchableOpacity
                    style={styles.shareButton}
                    onPress={() => {
                      sharePoints();
                    }}
                  >
                    <Text style={styles.shareButtonText}>
                      Share with your friends for 5 points
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {modalType === "UnlimitedRedeem" && (
                <View style={styles.buyView}>
                  <Image
                    style={styles.rewardImage}
                    source={require("../../../assets/icons/voucher_icon.png")}
                  />
                  <Text style={styles.buyContent}>{redeemMessage}</Text>

                  <View style={styles.buyButtonView}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => {
                        setOpenModal(false), setViewRef(viewRef);
                      }}
                    >
                      <Text style={styles.cancelText}>CANCEL</Text>
                    </TouchableOpacity>

                    <LinearButton
                      disabled={redeemDisable}
                      title={"REDEEM"}
                      colors={[
                        colors.turquoiseBlue,
                        colors.limeGreen,
                      ]}
                      titleStyle={styles.buyText}
                      style={{
                        ...styles.buyButton,
                        opacity: redeemDisable ? 0.5 : 1,
                      }}
                      onPress={() => resetRedeem()}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </>
    );
  };


  const resetRedeem = () => {
    dispatch({
      type: types?.PUT_REDEEM_VOUCHER,
      payload: { userId: loginData?.userId, voucherId: voucherId },
    });
    setOpenModal(true);
    setModalType("Redeem");
  };
  useEffect(() => {
    getMarketPlacesDetails();
  }, [openModal, voucherIndex]);

  const getMarketPlacesDetails = () => {
    let id = route?.params?.data?.user_id;
    dispatch({
      type: types?.GET_MARKET_PLACE_DETAILS,
      payload: { market_id: id },
    });
  };

  const buyVoucher = () => {
    dispatch({
      type: types?.POST_BUY_VOUCHER,
      payload: voucherId,
    });
    getMarketPlacesDetails();
    setOpenModal(false);
  };

  const voucherHeader = () => {
    return (
      <View>
        <View style={styles.marketNameView}>
          <View style={styles.marketNameLeftView}>
            <Text style={styles.marketNameText}>{data?.business_name}</Text>
            <View style={styles.locationView}>
              <Image
                style={styles.locationIcon}
                resizeMode="contain"
                source={require("../../../assets/icons/location.png")}
              />
              <Text style={styles.locationText}>{data?.address}</Text>
            </View>
          </View>

          <View style={styles.marketNameRightView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("RateReview", {
                  partnersId: data?.user_id,
                });
              }}
              style={styles.reviewTag}
            >
              <Image
                style={styles.starIcon}
                source={require("../../../assets/icons/star.png")}
              />
              <Text style={styles.reviewText}>
                {marketDetails?.review_count} Reviews
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.marketDescriptionText}>{data?.about_business}</Text>
        <View style={styles.voucherHeaderComponent}>
          <View style={styles.marketNameView}>
            <Image
              style={styles.pendingIcon}
              source={require("../../../assets/icons/vouchers_blue.png")}
            />
            <Text style={styles.voucherText}>Vouchers</Text>
          </View>
          <View
            style={styles?.pointView}
          >
            <Image
              style={[styles.pendingIcon, {}]}
              source={require("../../../assets/icons/points.png")}
            />
            <Text
              style={styles.pointsText1}
            >
              {pointsData?.balance} Available Points
            </Text>
          </View>
        </View>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      {voucherModals()}
      {loader ? (
        <View style={styles.loaderView}>
          <ActivityIndicator color={colors.appBlueColor} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.marketImageView}>
            <ImageBackground
              source={{ uri: data?.business_pic }}
              resizeMode="cover"
              style={styles.marketImage}
            >
              <HeaderSection
                backButton={true}
                onBackPress={() => navigation.goBack()}
                whiteBack={true}
              />
            </ImageBackground>
          </View>
          <View style={styles.marketDetailView}>
            <FlatList
              style={styles.voucherListStyle}
              removeClippedSubviews={true}
              ListHeaderComponent={voucherHeader}
              showsVerticalScrollIndicator={false}
              data={marketDetails?.userVoucherResponse?.vouchers}
              renderItem={voucherItem}
              ListEmptyComponent={() => <NoDataFound />}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default MarketPlaceDetail;
