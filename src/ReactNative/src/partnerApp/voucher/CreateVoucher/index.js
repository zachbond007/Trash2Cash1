import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Platform } from "react-native";

// Third Party
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import { onlyNumRegex } from "../../../constant/regex";
import CustomTextInput from "../../../userApp/commonComponents/TextInput";
import LinearButton from "../../../userApp/commonComponents/LinearButton";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";

const CreateVoucher = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [tooltip, setToolTip] = useState(false);
  const [voucherTitle, setVoucherTitle] = useState("");
  const [createValue, setCreateValue] = useState(false);
  const [pointRequired, setPointRequired] = useState("");

  // date and time states
  const [toDate, setToDate] = useState("");
  const [toTime, setToTime] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [fromTime, setFromTime] = useState("");

  // date and time picker visibilty states
  const [toDatePickerVisbile, setToDatePickerVisbile] = useState(false);
  const [toTimePickerVisbile, setToTimePickerVisbile] = useState(false);
  const [fromDatePickerVisbile, setFromDatePickerVisbile] = useState(false);
  const [fromTimePickerVisbile, setFromTimePickerVisbile] = useState(false);

  //reducer data
  const voucherFromOtherBusiness = useSelector(
    (state) => state?.partnerReducer?.partnerVoucherList
  );
  const buttonLoader = useSelector(
    (state) => state?.partnerReducer?.buttonLoader
  );

  useEffect(() => {
    dispatch({
      type: types.GET_PARTNER_VOUCHER_LIST,
      payload: 0, // MyVoucher=0 for other businesses voucher
    });
  }, []);

  const voucherItem = ({ item }) => {
    return (
      <View style={styles.voucherItem}>
        <View style={styles.voucherTopView}>
          <View style={styles.voucherTopLeft}>
            <Text style={styles.pointText}>{item?.title}</Text>
            <Text style={styles.shopNameText} numberOfLines={2}>
              {item?.business_name} <Text>{item?.points_req} Points</Text>
            </Text>
          </View>
        </View>
        <View style={styles.voucherBottomView}>
          <Image
            source={require("../../../assets/icons/pending.png")}
            style={styles?.clockIcon}
            resizeMode={"contain"}
          />
          <Text style={styles.timeText}>
            {moment(item?.time_from, "HH:mm:ss").format("h:mm A")} -{" "}
            {moment(item?.time_to, "HH:mm:ss").format("h:mm A")}{" "}
            {moment(item?.valid_to, "YYYY-MM-DD").format("dddd")}
          </Text>
        </View>
      </View>
    );
  };

  const handleDateConfirm = (date, type) => {
    switch (type) {
      case "from":
        let fromdate1 = date;
        setToDate("");
        hideFromDatePicker();
        if (fromdate1 > toDate) {
          if (todate1) {
            setToDate("");
            showMessage({
              message: "Value of to date must be lesser than to date",
              type: "danger",
            });
          }
        } else {
          setFromDate(date);
        }
        setFromDate(date);
        break;

      default:
        let todate1 = date;
        hideToDatePicker();
        if (fromDate > todate1) {
          setToDate("");
          showMessage({
            message: "Value of to date must be greater than from date",
            type: "danger",
          });
        } else setToDate(date);
        break;
    }
  };

  const handleTimeConfirm = (time, type) => {
    if (type == "from") {
      setFromTime(time);
      setToTime("");
      hideFromTimePicker();
    } else {
      if (moment(fromTime).format("LT") <= moment(toTime).format("LT")) {
        setToTime(time);
      } else {
        showMessage({
          message: "Value of to date must be greater than from date",
          type: "danger",
        });
      }
    }
    hideToTimePicker();
  };

  // hide date picker
  const hideFromDatePicker = () => {
    setFromDatePickerVisbile(false);
  };
  const hideToDatePicker = () => {
    setToDatePickerVisbile(false);
  };
  const hideFromTimePicker = () => {
    setFromTimePickerVisbile(false);
  };
  const hideToTimePicker = () => {
    setToTimePickerVisbile(false);
  };

  // create voucher dispatch function
  const createVoucher = () => {
    setCreateValue(true);
    if (voucherTitle && fromDate && toDate && fromTime && toTime) {
      if (
        moment(fromTime, "hh mm").format("HH mm") >=
        moment(toTime, "hh mm").format("HH mm") &&
        moment(fromDate, "YYYY-MM-DD").format("YYYY-MM-DD") >=
        moment(toDate, "YYYY-MM-DD").format("YYYY-MM-DD")
      ) {
        showMessage({
          message: `Value of 'To' time must be greater than 'From' time for same date.`,
          type: "danger",
        });
      } else if (
        moment(fromTime, "hh mm").format("HH mm") >=
        moment(toTime, "hh mm").format("HH mm") &&
        moment(fromDate, "YYYY-MM-DD").format("YYYY-MM-DD") <
        moment(toDate, "YYYY-MM-DD").format("YYYY-MM-DD")
      ) {
        showMessage({
          message: `Value of 'To' time must be greater than 'From' time.`,
          type: "danger",
        });
      } else if (!onlyNumRegex.test(pointRequired)) {
        showMessage({
          message: "Please enter numeric value in Points Required field!",
          type: "danger",
        });
      } else {
        let body = {
          title: voucherTitle?.trim(),
          points_req: pointRequired?.trim(),
          valid_from: fromDate,
          valid_to: toDate,
          time_from: moment(fromTime).format("HH:mm:ss"),
          time_to: moment(toTime).format("HH:mm:ss"),
          offer_per_user: 4,
          offer_avail_interval: 1,
          is_deleted: 0,
        };
        dispatch({
          type: types.POST_CREATE_VOUCHER,
          payload: body,
        });
      }
    } else {
      showMessage({
        message: "Please enter all details.",
        type: "warning",
      });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderSection
        backButton={true}
        onBackPress={() => navigation?.goBack()}
        title={message?.createVoucher}
      />
      {/* Voucher Items */}
      <FlatList
        data={voucherFromOtherBusiness}
        ListHeaderComponent={
          <View style={styles.mainView}>
            {/* Voucher Form */}
            <View style={styles.textInputView}>
              <CustomTextInput
                value={voucherTitle}
                onChangeText={(e) => setVoucherTitle(e)}
                placeholder={message?.voucherTitlePlaceholder}
                error={createValue && voucherTitle?.length == 0}
                onFocus={() => {
                  setToolTip(false)
                }}
              />
            </View>

            <View
              style={{
                ...styles.textInputView,
                zIndex: 1,
              }}
            >
              <CustomTextInput
                value={pointRequired}
                onChangeText={(e) => setPointRequired(e)}
                placeholder={message?.pointsRequired}
                error={createValue && pointRequired?.length == 0}
                keyboardType="phone"
                onFocus={() => {
                  setToolTip(false)
                }}
              />
              <View
                style={styles.tooltipMain}
              >
                <TouchableOpacity
                  onPress={() => setToolTip(!tooltip)}
                  style={styles.tooltipImageStyle}
                >
                  <Image
                    source={require("../../../assets/icons/question-mark.png")}
                    blurRadius={Platform.OS == "ios" ? 1 : 10}
                    style={styles.tooltipImage1}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
                {tooltip && (
                  <View
                    style={styles.tooltipTextView}
                  >
                    <Text style={styles.tooltipText1}>
                      One piece of trash = one point.
                    </Text>
                  </View>
                )}
              </View>
            </View>
            {/* from date  */}
            <View style={styles.fromToView}>
              <TouchableOpacity
                style={{
                  ...styles.fromToTextInputView,
                  borderColor:
                    createValue && fromDate?.length == ""
                      ? "red"
                      : colors?.lightGrey,
                }}
                onPress={() => setFromDatePickerVisbile(!fromDatePickerVisbile)}
              >
                <Text
                  style={{
                    ...styles.fromToTextInput,
                    color: fromDate ? colors.black : colors.grey,
                    borderColor:
                      createValue && fromDate?.length == 0
                        ? "red"
                        : colors?.lightGrey,
                  }}
                >
                  {(fromDate && moment(fromDate).format("MM/DD/YY")) || "From"}
                </Text>
                <Image
                  source={require("../../../assets/icons/calender.png")}
                  style={styles?.calenderIcon}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                selected={new Date()}
                isVisible={fromDatePickerVisbile}
                mode="date"
                minimumDate={new Date()}
                onConfirm={(date) => handleDateConfirm(date, "from")}
                onCancel={hideFromDatePicker}
              />

              <TouchableOpacity
                style={{
                  ...styles.fromToTextInputView,
                  borderColor:
                    createValue && toDate?.length == ""
                      ? "red"
                      : colors?.lightGrey,
                }}
                onPress={() => setToDatePickerVisbile(!toDatePickerVisbile)}
              >
                <Text
                  style={{
                    ...styles.fromToTextInput,
                    color: toDate ? colors.black : colors.grey,
                  }}
                >
                  {(toDate && moment(toDate).format("MM/DD/YY")) || "To"}
                </Text>
                <Image
                  source={require("../../../assets/icons/calender.png")}
                  style={styles?.calenderIcon}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                selected={new Date()}
                isVisible={toDatePickerVisbile}
                mode="date"
                minimumDate={new Date()}
                onConfirm={(date) => handleDateConfirm(date, "to")}
                onCancel={hideToDatePicker}
              />
            </View>
            {/* from time  */}
            <View style={styles.fromToView}>
              <TouchableOpacity
                style={{
                  ...styles.fromToTextInputView,
                  borderColor:
                    createValue && fromTime?.length == ""
                      ? "red"
                      : colors?.lightGrey,
                }}
                onPress={() => setFromTimePickerVisbile(!fromTimePickerVisbile)}
              >
                <Text
                  style={{
                    ...styles.fromToTextInput,
                    color: fromTime ? colors.black : colors.grey,
                  }}
                >
                  {(fromTime && moment(fromTime).format("h:mm a")) || "From"}
                </Text>
                <Image
                  source={require("../../../assets/icons/clock.png")}
                  style={styles?.calenderIcon}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={fromTimePickerVisbile}
                mode="time"
                minimumDate={moment(
                  moment("").format("DD-MM-YYYY") +
                  moment("").format("HH:mm:ss"),
                  "DD-MM-YYYYHH:mm:ss"
                )
                  .utc()
                  .format()}
                onConfirm={(time) => handleTimeConfirm(time, "from")}
                onCancel={hideFromTimePicker}
                date={new Date()}
              />
              {/* to time */}
              <TouchableOpacity
                style={{
                  ...styles.fromToTextInputView,
                  borderColor:
                    createValue && fromDate?.length == ""
                      ? "red"
                      : colors?.lightGrey,
                }}
                onPress={() => setToTimePickerVisbile(!toTimePickerVisbile)}
              >
                <Text
                  style={{
                    ...styles.fromToTextInput,
                    color: toTime ? colors.black : colors.grey,
                  }}
                >
                  {(toTime && moment(toTime).format("h:mm a")) || "To"}
                </Text>
                <Image
                  source={require("../../../assets/icons/clock.png")}
                  style={styles?.calenderIcon}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={toTimePickerVisbile}
                mode="time"
                minimumDate={moment(
                  moment("").format("DD-MM-YYYY") +
                  moment("").format("HH:mm:ss"),
                  "DD-MM-YYYYHH:mm:ss"
                )
                  .utc()
                  .format()}
                onConfirm={(time) => handleTimeConfirm(time, "to")}
                onCancel={hideToTimePicker}
                date={new Date()}
              />
            </View>

            {/* Create Button View */}
            <View style={styles.buttonView}>
              <LinearButton
                title={message?.create}
                onPress={() => createVoucher()}
                loader={buttonLoader}
              />
            </View>
            {/* Voucher List */}
            <View style={styles.voucherHeader}>
              <Image
                source={require("../../../assets/icons/vouchers_blue.png")}
                style={styles?.clockIcon}
                resizeMode={"contain"}
              />
              <Text style={styles.voucherHeaderText}>
                {message?.voucherBusiness}
              </Text>
            </View>
          </View>
        }
        showsVerticalScrollIndicator={false}
        renderItem={voucherItem}
        style={styles.voucherItemList}
      />
    </View>
  );
};


export default CreateVoucher;
