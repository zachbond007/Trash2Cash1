import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";

// Third Party
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// Constants
import { styles } from "../CreateVoucher/styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import { onlyNumRegex } from "../../../constant/regex";
import CustomTextInput from "../../../userApp/commonComponents/TextInput";
import LinearButton from "../../../userApp/commonComponents/LinearButton";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";

const EditVoucher = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let i = route?.params;

  const [voucherTitle, setVoucherTitle] = useState(i?.title);
  const [pointRequired, setPointRequired] = useState(
    `${route.params.points_req}`
  );
  const [offerInterval, setOfferInterval] = useState(
    `${i?.offer_avail_interval} Day`
  );
  const [createValue, setCreateValue] = useState(false);
  // date and time states
  const [fromDate, setFromDate] = useState(i?.valid_from ? i?.valid_from : "");
  const [toDate, setToDate] = useState(i?.valid_to ? i?.valid_to : "");
  const [fromTime, setFromTime] = useState(
    moment(i?.time_from, "HH:mm").format("hh:mm a")
  );
  const [toTime, setToTime] = useState(
    moment(i?.time_to, "HH:mm").format("hh:mm a")
  );

  // date and time picker visibilty states
  const [fromDatePickerVisbile, setFromDatePickerVisbile] = useState(false);
  const [toDatePickerVisbile, setToDatePickerVisbile] = useState(false);
  const [fromTimePickerVisbile, setFromTimePickerVisbile] = useState(false);
  const [toTimePickerVisbile, setToTimePickerVisbile] = useState(false);

  //reducer data
  const voucherFromOtherBusiness = useSelector(
    (state) => state?.partnerReducer?.partnerVoucherList
  );

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
  const submitEditVoucher = () => {
    setCreateValue(true);
    if (
      voucherTitle &&
      fromDate &&
      toDate &&
      fromTime &&
      toTime &&
      pointRequired
    ) {
      if (
        moment(fromTime, "hh:mm a").format("HH:mm:ss") >=
        moment(toTime, "hh:mm a").format("HH:mm:ss")
        &&
        moment(fromDate, "YYYY-MM-DD").format("YYYY-MM-DD") >=
        moment(toDate, "YYYY-MM-DD").format("YYYY-MM-DD")
      ) {
        showMessage({
          message: `Value of 'To' time must be greater than 'From' time for same date.`,
          type: "danger",
        });
      } else if (
        moment(fromTime, "hh:mm a").format("HH:mm:ss") >=
        moment(toTime, "hh:mm a").format("HH:mm:ss") &&
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
          voucher_id: i?.voucher_id,
          title: voucherTitle?.trim(),
          points_req: pointRequired?.trim(),
          valid_from: fromDate,
          valid_to: toDate,
          time_from:
            moment(i?.time_from, "HH:mm").format("hh:mm a") === fromTime
              ? i?.time_from
              : moment(fromTime).format("HH:mm:ss"),

          time_to:
            moment(i?.time_to, "HH:mm").format("hh:mm a") === toTime
              ? i?.time_to
              : moment(toTime).format("HH:mm:ss"),
          offer_per_user: 4,
          offer_avail_interval: offerInterval.charAt(0),
          is_deleted: 0,
        };
        dispatch({
          type: types.PUT_EDIT_VOUCHER,
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
  const [tooltip, setToolTip] = useState(false);

  return (
    <View style={styles.container}>
      <HeaderSection
        backButton={true}
        onBackPress={() => navigation?.goBack()}
        title={message?.editVoucher}
      />
      {/* Voucher Items */}
      <FlatList
        data={voucherFromOtherBusiness}
        ListHeaderComponent={
          <View style={styles.mainView}>
            {/* Voucher Form */}
            <View style={styles.textInputView}>
              <CustomTextInput
                value={voucherTitle ? voucherTitle : ""}
                onChangeText={(e) => setVoucherTitle(e)}
                placeholder={message?.voucherTitlePlaceholder}
                error={createValue && voucherTitle?.length == 0}
                onFocus={() => {
                  setToolTip(false)
                }}
              />
            </View>
            <View
              style={styles.tooltipStyle}
            >
              <TouchableOpacity onPress={() => setToolTip(!tooltip)}>
                <Image
                  source={require("../../../assets/icons/question-mark.png")}
                  style={styles.tooltipImage}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
              {tooltip && (
                <View
                  style={styles.tooltipText}
                >
                  <Text>{`One piece of trash = one point.`}</Text>
                </View>
              )}
            </View>
            <View
              style={{
                ...styles.textInputView,
                zIndex: 1,
              }}
            >
              <CustomTextInput
                value={pointRequired ? pointRequired : ""}
                onChangeText={(e) => setPointRequired(e)}
                placeholder={message?.pointsRequired}
                error={createValue && pointRequired?.length == 0}
                keyboardType="phone"
                onFocus={() => {
                  setToolTip(false)
                }}
              />
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
                  {moment(i?.time_from, "HH:mm").format("hh:mm a") === fromTime
                    ? moment(i?.time_from, "HH:mm").format("hh:mm a")
                    : moment(fromTime).format("h:mm a")}
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
                  {moment(i?.time_to, "HH:mm").format("hh:mm a") === toTime
                    ? moment(i?.time_to, "HH:mm").format("hh:mm a")
                    : toTime && moment(toTime).format("h:mm a")}
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
                title={`UPDATE`}
                onPress={() => submitEditVoucher()}
              />
            </View>
          </View>
        }
        showsVerticalScrollIndicator={false}
        style={styles.voucherItemList}
      />
    </View>
  );
};


export default EditVoucher;
