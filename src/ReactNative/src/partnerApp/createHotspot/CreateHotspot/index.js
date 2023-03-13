import React, { useEffect, useState } from "react";
import { View, Text, Platform, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";

// Third Party
import moment from "moment";
import Geocoder from "react-native-geocoding";
import { useSelector, useDispatch } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// Constants
import { styles } from "./styles";
import { geoCode } from "../../../constant/keys";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import CustomTextInput from "../../../userApp/commonComponents/TextInput";
import LinearButton from "../../../userApp/commonComponents/LinearButton";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";

Geocoder.init(geoCode);

const CreateHotspot = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [dob, setDob] = useState("");
  const [from, setFrom] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [createValue, setCreateValue] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [toTimePickerVisible, setToTimePickerVisibility] = useState(false);
  const [fromTimePickerVisible, setFromTimePickerVisibility] = useState(false);

  const PartnerReducer = useSelector((State) => State?.partnerReducer);
  const partnerUserDetails = useSelector((state) => state?.authReducer?.partnerUserDetails);

  useEffect(() => {
    dispatch({
      type: types?.BUTTON_LOADER,
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

  const createHotspot = () => {
    setCreateValue(true);
    if (partnerUserDetails?.address) {
      Geocoder.from(partnerUserDetails?.address)
        .then((json) => {
          let location = json.results[0].geometry.location;
          if (eventTitle && dob && partnerUserDetails?.address) {
            const parameters = {
              event_title: eventTitle?.trim(),
              event_date_time: dob,
              radius: 4,
            };
            dispatch({
              type: types?.CREATE_HOTSPOT,
              payload: parameters,
            });
          } else {
            showMessage({
              message: "Please enter valid details in all feild's.",
              type: "danger",
            });
          }
        })
        .catch((error) => console.warn(error));
    } else {
      showMessage({
        message: "Please enter all details.",
        type: "success",
      });
    }
  };

  const handleDateConfirm = (date) => {
    setDob(date);
    setFrom("");
    hideDatePicker();
  };

  const handleToTimeConfirm = (time) => {
    if (moment(time).format("HH:mm") > moment(from).format("HH:mm")) {
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
    hideFromTimePicker();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          {/* Back button */}
          <HeaderSection
            backButton={true}
            onBackPress={() => navigation.goBack()}
          />

          {/* Welcome text  */}
          <View style={styles?.welcomeView}>
            <Text style={styles?.welcometext}>{message?.createHotspot}</Text>
          </View>
          {/* Hotstar Title */}
          <View style={styles.inputView}>
            <CustomTextInput
              placeholder={"Event Title"}
              value={eventTitle}
              onChangeText={(text) => setEventTitle(text)}
              error={createValue && eventTitle?.length == 0}
            />
          </View>

          <TouchableOpacity
            style={styles.passAndTextinputView}
            onPress={() => setDatePickerVisibility(true)}
          >
            <View
              style={{
                ...styles.textInpuViewStyle,
                borderColor:
                  createValue && dob?.length == 0 ? "red" : colors?.lightGrey,
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
            <View style={styles.textInpuViewStyle3}>
              <Text style={styles.textInputStyle1}>
                {partnerUserDetails?.address}
              </Text>
              <View>
                <Image
                  source={require("../../../assets/icons/gps_location.png")}
                  style={styles?.eyeIcon}
                  resizeMode={"contain"}
                />
              </View>
            </View>
          </View>

          {/* Login button  */}
        </ScrollView>
        <View style={styles?.buttonView}>
          <LinearButton
            title={message?.create}
            onPress={() => createHotspot()}
            loader={PartnerReducer?.buttonLoader}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};


export default CreateHotspot;
