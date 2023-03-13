import React, { useEffect, useState } from "react";
import { View, Text, Platform, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";

// Third Party
import moment from "moment";
import Modal from "react-native-modal";
import Geocoder from "react-native-geocoding";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// Constants
import { styles } from "./styles";
import { geoCode } from "../../../constant/keys";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import NavigationService from "../../../routing/NavigationService";
import CustomTextInput from "../../../userApp/commonComponents/TextInput";
import LinearButton from "../../../userApp/commonComponents/LinearButton";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";

Geocoder.init(geoCode);

const EditHotspot = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [eventTitle, setEventTitle] = useState("");
  const [dob, setDob] = useState(null);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [toTimePickerVisible, setToTimePickerVisibility] = useState(false);
  const [fromTimePickerVisible, setFromTimePickerVisibility] = useState(false);
  const PartnerReducer = useSelector((State) => State?.partnerReducer);
  const authReducer = useSelector((State) => State?.authReducer);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setAddress(authReducer?.userHotspotAddress);
  }, [authReducer?.userHotspotAddress]);

  useEffect(() => {
    const hotspotData = route?.params?.item;

    setDob(hotspotData?.event_date_time);
    setEventTitle(hotspotData?.event_title);
    setFrom(hotspotData?.start_time + ".102Z");
    setTo(hotspotData?.end_time + ".102Z");
    setTown(hotspotData?.state);
    setAddress(hotspotData?.address);

    dispatch({
      type: types.BUTTON_LOADER,
      payload: false,
    });
  }, []);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideToTimePicker = () => {
    setToTimePickerVisibility(false);
  };

  const hideFromTimePicker = () => {
    setFromTimePickerVisibility(false);
  };

  const editHotspot = () => {
    setOpenModal(true);
  };

  const handleDateConfirm = (date) => {
    setDob(date);
    setTo("");
    setFrom("");
    hideDatePicker();
  };

  const handleToTimeConfirm = (time) => {
    if (moment(time).format("HH:mm") > moment(from).format("HH:mm")) {
      setTo(time);
    } else {
      showMessage({
        message: "Value of to date must be greater than from date",
        type: "success",
      });
    }
    hideToTimePicker();
  };

  const handleFromTimeConfirm = (time) => {
    setFrom(time);
    setTo("");
    hideFromTimePicker();
  };

  const editHotspotDetail = () => {
    if (
      route?.params?.item?.hotspot_id &&
      route?.params?.item?.user_id &&
      eventTitle &&
      dob &&
      address &&
      from &&
      to
    ) {
      Geocoder.from(address)
        .then((json) => {
          let location = json.results[0].geometry.location;
          const parameters = {
            hotspot_id: route?.params?.item?.hotspot_id,
            user_id: route?.params?.item?.user_id,
            event_title: eventTitle?.trim(),
            event_date_time: dob,
            address: address,
            city: town,
            state: town,
            country: "",
            latitude: location?.lat,
            longitude: location?.lng,
            Start_Time: from,
            end_time: to,
            radius: 4,
          };
          dispatch({
            type: types?.UPDATE_HOTSPOT,
            payload: parameters,
          });
        })
        .catch((error) => console.warn(error));
    } else {
      setOpenModal(false);

      showMessage({
        message: "Please enter all Trash Hotspot details !",
        type: "danger",
      });
    }
  };

  const alertModal = () => {
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
              source={require("../../../assets/icons/overlay.png")}
              onPress={() => setOpenModal(false)}
            />
          </TouchableOpacity>
        }
      >
        <View style={styles.modalContainer}>
          <View style={styles.horizontalLine} />

          <Text style={styles.noticeText}>
            Are you sure you want to update your hotspot?
          </Text>

          <View style={styles.modalButtonView}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setOpenModal(false)}
            >
              <Text style={styles.cancelText}>{"NO"}</Text>
            </TouchableOpacity>

            <LinearButton
              title={"YES"}
              colors={[colors.turquoiseBlue, colors.limeGreen]}
              titleStyle={styles.confirmText}
              style={styles.confirmButton}
              onPress={() => editHotspotDetail()}
              loader={PartnerReducer?.buttonLoader}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {alertModal()}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          {/* Back button */}
          <HeaderSection
            backButton={true}
            onBackPress={() => navigation.goBack()}
            title={message?.editHotspot}
          />

          {/* Hotstar Title */}
          <View style={styles.inputView}>
            <CustomTextInput
              placeholder={"Event Title"}
              value={eventTitle}
              onChangeText={(text) => setEventTitle(text)}
            />
          </View>

          <TouchableOpacity
            style={styles.passAndTextinputView}
            onPress={() => setDatePickerVisibility(true)}
          >
            <View
              style={{
                ...styles.textInpuViewStyle2,
                ...styles.passAndTextinputViewStyle
              }}
            >
              <View style={styles.datePickerView}>
                <Text
                  style={{
                    ...styles.datePickerText,
                    color: dob ? colors.black : colors.grey,
                  }}
                >
                  {(dob && moment(dob).format("LL")) || "Event Date"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                <Image
                  source={require("../../../assets/icons/calender.png")}
                  style={styles?.eyeIcon}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            selected={new Date()}
            isVisible={isDatePickerVisible}
            mode="date"
            minimumDate={new Date()}
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />

          <View style={styles.toFromTextInputView}>
            <TouchableOpacity
              style={{
                ...styles.textInputToFromStyle,
                ...styles.passAndTextinputViewStyle
              }}
              onPress={() => setFromTimePickerVisibility(true)}
            >
              <Image
                source={require("../../../assets/icons/clock.png")}
                style={styles?.eyeIcon}
                resizeMode={"contain"}
              />

              <View style={styles.textInputStyle2}>
                <Text
                  style={{
                    ...styles.toFromplaceholder,
                    color: from ? colors.black : colors.grey,
                  }}
                >
                  {(from && moment(from).format("hh:mm a")) || "From"}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={from ? false : true}
              style={{
                ...styles.textInputToFromStyle,
                ...styles.passAndTextinputViewStyle
              }}
              onPress={() => setToTimePickerVisibility(true)}
            >
              <Image
                source={require("../../../assets/icons/clock.png")}
                style={styles?.eyeIcon}
                resizeMode={"contain"}
              />
              <View style={styles.textInputStyle2}>
                <Text
                  style={{
                    ...styles.toFromplaceholder,
                    color: to ? colors.black : colors.grey,
                  }}
                >
                  {(to && moment(to).format("hh:mm a")) || "To"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <DateTimePickerModal
            isVisible={toTimePickerVisible}
            mode="time"
            minimumDate={moment(
              moment(dob).format("DD-MM-YYYY") +
              moment(from).format("HH:mm:ss"),
              "DD-MM-YYYYHH:mm:ss"
            )
              .utc()
              .format()}
            onConfirm={handleToTimeConfirm}
            onCancel={hideToTimePicker}
            date={new Date()}
          />

          <DateTimePickerModal
            date={new Date()}
            isVisible={fromTimePickerVisible}
            mode="time"
            minimumDate={
              moment(dob)?.format("DD-MM-YYYY") == moment().format("DD-MM-YYYY")
                ? dob
                : null
            }
            onConfirm={handleFromTimeConfirm}
            onCancel={hideFromTimePicker}
          />

          <View style={styles.passAndTextinputView}>
            <TouchableOpacity
              style={{
                ...styles.textInpuViewStyle3,
                ...styles.passAndTextinputViewStyle
              }}
              onPress={() =>
                NavigationService?.navigate("SearchLocation", {
                  from: "hotspot",
                })
              }
            >
              <TextInput
                maxLength={20}
                autoCapitalize="none"
                placeholder="Address"
                placeholderTextColor={colors?.grey}
                selectionColor={colors.black}
                onChangeText={(text) => setAddress(text)}
                style={styles.textInputStyle1}
                value={address}
                multiline
                editable={false}
                onTouchStart={() =>
                  NavigationService?.navigate("SearchLocation", {
                    from: "hotspot",
                  })
                }
              />
              <TouchableOpacity>
                <Image
                  source={require("../../../assets/icons/gps_location.png")}
                  style={styles?.eyeIcon}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* Login button  */}
        </ScrollView>
        <View style={styles?.buttonView}>
          <LinearButton
            title={message?.updateHotspot}
            onPress={() => editHotspot()}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};


export default EditHotspot;
