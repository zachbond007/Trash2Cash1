import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, TextInput } from "react-native";

// Third Party
import Geocoder from "react-native-geocoding";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Constants
import { styles } from "./styles";
import { geoCode } from "../../../constant/keys";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import NavigationService from "../../../routing/NavigationService";
import CustomDropdown from "../../../userApp/commonComponents/Dropdown";
import LinearButton from "../../../userApp/commonComponents/LinearButton";
import CustomTextInput from "../../../userApp/commonComponents/TextInput";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";
import { businessCategoryModal } from "../../../constant/staticData"

Geocoder.init(geoCode);

const BusinessProfile = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [createValue, serCreateValue] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");
  const [aboutBusiness, setAboutBusiness] = useState("");
  const [address, setAddress] = useState("");
  const [profile, setProfilePic] = useState("");

  const authReducer = useSelector((state) => state?.authReducer);

  useEffect(() => {
    if (authReducer?.userBusinessAddress) {
      setAddress(authReducer?.userBusinessAddress);
    }
  }, [authReducer?.userBusinessAddress]);
  const onSubmitButtonPress = () => {
    serCreateValue(true);
    if (
      industry &&
      businessName?.trim() &&
      aboutBusiness?.trim() &&
      authReducer?.userBusinessAddress
    ) {
      if (profile) {
        Geocoder.from(authReducer?.userBusinessAddress)
          .then((json) => {
            let latlong = json.results[0].geometry.location;
            let body = route?.params?.basicData;
            body["industry_id"] = industry?.id;
            body["business_name"] = businessName?.trim();
            body["about_business"] = aboutBusiness?.trim();
            body["address"] = authReducer?.userBusinessAddress;
            body["city"] = city?.trim();
            body["state"] = city?.trim();
            body["country"] = "";
            body["latitude"] = latlong?.lat;
            body["longitude"] = latlong?.lng;
            body["industry_id"] = industry;
            dispatch({
              type: types?.PARTNER_SIGNUP,
              payload: {
                body: body,
                from: "signup",
                navigation: navigation,
                profile: profile,
              },
            });
          })
          .catch((error) => console.warn(error));
      } else {
        showMessage({
          message: "Please upload business profile pic",
          type: "danger",
        });
      }
    } else {
      showMessage({
        message: "Please enter all details!",
        type: "danger",
      });
    }
  };

  const selectImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
    }).then((image) => {
      setProfilePic(image?.path);
    });
  };

  const aboutBusinessdata = (e) => {
    setAboutBusiness(e);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles?.mainContainer}>
        {/* Back button */}
        <HeaderSection
          backButton={true}
          onBackPress={() => navigation?.goBack()}
        />
        <View style={styles?.userView}>
          <Text style={styles?.usernametext}>{message?.businessProfile}</Text>
          <Text style={styles?.emailStyle}>
            {message?.businessProfileDetails}
          </Text>
        </View>
        {/* Profile logo */}
        <View style={styles.container}>
          <View style={styles?.upperStyle}>
            <TouchableOpacity
              style={styles?.profileMainView}
              onPress={() => selectImageFromGallery()}
            >
              <ImageBackground
                source={require("../../../assets/icons/profile_circle.png")}
                style={styles?.imageProfilebackground}
              >
                <Image source={{ uri: profile }} style={styles?.userprofile} />
              </ImageBackground>

              <Image
                source={require("../../../assets/icons/camera_orange.png")}
                style={styles?.editIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Lower side Ui part */}
          <View style={styles.lowerStyle}>
            {/*Select Industry  */}
            <View style={styles?.textView2}>
              <CustomDropdown
                title={
                  industry === 1
                    ? "Food & Beverage"
                    : industry === 2
                      ? "Entertainment"
                      : industry === 3
                        ? "Retail"
                        : industry === 4
                          ? "Gas"
                          : industry === 5
                            ? "Travel"
                            : industry === 6
                              ? "Grocery"
                              : "Select Industry"
                }
                titleStyle={{
                  ...styles.dropdownTitleText,
                  color: industry ? colors.black : colors.grey,
                }}
                data={businessCategoryModal.map(
                  (category) => category.category
                )}
                onPress={() => setOpenDropdown(!openDropdown)}
                open={openDropdown}
                onValueChange={(e) =>
                  setIndustry(
                    e == "Food & Beverage"
                      ? 1
                      : e == "Entertainment"
                        ? 2
                        : e == "Retail"
                          ? 3
                          : e == "Gas"
                            ? 4
                            : e == "Travel"
                              ? 5
                              : 6
                  )
                }
                error={createValue && industry?.length == 0}
              />
            </View>

            {/* Bussiness name  */}
            <View style={styles?.textView}>
              <CustomTextInput
                placeholder={"Business Name"}
                value={businessName}
                onChangeText={(e) => setBusinessName(e)}
                error={createValue && businessName?.length == 0}
              />
            </View>

            {/*About bussiness */}
            <View
              style={{
                ...styles?.aboutView,
                borderColor:
                  createValue && aboutBusiness?.length == 0
                    ? "red"
                    : colors?.lightGrey,
              }}
            >
              <TextInput
                style={styles?.aboutTextInput}
                placeholder="About business"
                placeholderTextColor={colors?.grey}
                multiline
                maxLength={300}
                value={aboutBusiness}
                onChangeText={(e) => aboutBusinessdata(e)}
              />
              <View
                style={styles.mainViewText}
              >
                <Text
                  style={styles.textStyle}
                >
                  <Text
                    style={{
                      ...styles.limitText,
                      color: aboutBusiness?.length < 260 ? "#0191B4" : "red",

                    }}
                  >
                    {aboutBusiness?.length}
                  </Text>
                  /300
                </Text>
              </View>
            </View>
            <View style={styles.passAndTextinputView}>
              <TouchableOpacity
                style={{
                  ...styles.textInpuViewStyle,
                  borderColor:
                    createValue && address?.length == 0
                      ? "red"
                      : colors?.lightGrey,
                }}
                onPress={() =>
                  NavigationService?.navigate("SearchLocation", {
                    from: "businessProfile",
                  })
                }
              >
                <View style={styles.dateOfBirthTextInputView}>
                  <Text
                    style={{
                      ...styles.dateOfBirthTextInput,
                      color: address ? colors.black : colors.grey,
                    }}
                  >
                    {address || "Address"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Send link button */}
            <View style={styles?.textView1}>
              <LinearButton
                title={"SUBMIT"}
                onPress={() => onSubmitButtonPress()}
                loader={authReducer?.registrationLoader}
              />
            </View>
          </View>
          <View style={styles.bottomViewStyle} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};


export default BusinessProfile;
