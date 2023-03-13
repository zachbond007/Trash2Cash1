import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, TextInput, TouchableOpacity } from "react-native";

// Third Party
import Modal from "react-native-modal";
import Geocoder from "react-native-geocoding";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
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
import { businessCategoryModal } from "../../../constant/staticData";

Geocoder.init(geoCode);

const EditBusinessProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [openDropdown, setOpenDropdown] = useState("");
  const [aboutBusiness, setAboutBusiness] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [profile, setProfilePic] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const partnerUserDetails = useSelector(
    (state) => state?.authReducer?.partnerUserDetails
  );
  const [createValue, setCreateValue] = useState(false);

  const authReducer = useSelector((state) => state?.authReducer);
  useEffect(() => {
    if (authReducer?.userBusinessAddress) {
      setAddress(authReducer?.userBusinessAddress);
    }
  }, [authReducer?.userBusinessAddress]);

  useEffect(() => {
    setBusinessName(partnerUserDetails?.business_Name);
    setIndustry(partnerUserDetails?.industry_Id);
    setAboutBusiness(partnerUserDetails?.about_Business);
    setAddress(partnerUserDetails?.address);
    setCity(partnerUserDetails?.city);
    setProfilePic(partnerUserDetails?.business_pic);
    dispatch({
      type: types.PROFILE_LOADER,
      payload: false,
    });
  }, []);

  const onSubmitButtonPress = () => {
    setOpenModal(true);
  };

  const editBusinessDetail = () => {
    setCreateValue(true);

    if (industry && businessName && aboutBusiness) {
      if (profile) {
        if (authReducer?.userBusinessAddress || partnerUserDetails?.address) {
          Geocoder.from(
            authReducer?.userBusinessAddress || partnerUserDetails?.address
          )
            .then((json) => {
              let latlong = json.results[0].geometry.location;
              let body = {};
              body["industry_id"] = industry;
              body["business_name"] = businessName?.trim();
              body["about_business"] = aboutBusiness?.trim();
              body["address"] =
                authReducer?.userBusinessAddress || partnerUserDetails?.address;
              body["city"] = city;
              body["state"] = city;
              body["country"] = "";
              body["latitude"] = latlong?.lat;
              body["longitude"] = latlong?.lng;
              body["source"] = "Business";
              body["profile_pic"] = "";
              dispatch({
                type: types?.UPDATE_PARTNER_PROFILE,
                payload: {
                  body: body,
                  navigation: navigation,
                  businessProfile: profile,
                },
              });
              setOpenModal(false);
            })
            .catch((error) => console.warn(error));
        }
      } else {
        showMessage({
          message: "Please click or upload your photo",
          type: "danger",
        });
        setOpenModal(false);
      }
    } else {
      showMessage({
        message: "Please enter all details!",
        type: "danger",
      });
      setOpenModal(false);
    }
  };

  const selectImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 250,
      cropping: true,
    }).then((image) => {
      setProfilePic(image?.path);
    });
  };

  const aboutBusinessdata = (e) => {
    setAboutBusiness(e);
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
            Are you sure you want to update your profile?
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
              onPress={() => editBusinessDetail()}
              loader={authReducer?.profileLoader}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles?.mainContainer}>
        {alertModal()}
        {/* Back button */}
        <HeaderSection
          backButton={true}
          onBackPress={() => navigation?.goBack()}
          title={message.editBusinessProfile}
        />

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
                {profile ? (
                  <Image
                    source={{ uri: profile }}
                    style={styles?.userprofile}
                  />
                ) : (
                  <Image
                    source={require("../../../assets/icons/user_icon.png")}
                    style={styles?.userprofile1}
                    resizeMode="contain"
                  />
                )}
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
                            : e === "Travel"
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
                style={styles.limitView}
              >
                <Text
                  style={styles.limitText1}
                >
                  <Text style={[...styles.limitText, { color: aboutBusiness?.length < 260 ? "#0191B4" : "red" }]}>
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
                    numberOfLines={2}
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
                loader={authReducer?.profileLoader}
              />
            </View>
          </View>
          <View style={styles.emptyView} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};


export default EditBusinessProfile;
