import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from "react-native";

// Third-Party
import moment from "moment";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ImagePicker from "react-native-image-crop-picker";
import { showMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import CustomTextInput from "../../commonComponents/TextInput";
import LinearButton from "../../commonComponents/LinearButton";
import HeaderSection from "../../commonComponents/HeaderSection";

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userDetails = useSelector((state) => state?.authReducer?.userDetails);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullname, setFullName] = useState("");
  const [dob, setDob] = useState(
    userDetails?.dob === null ? "" : userDetails?.dob
  );
  const authReducer = useSelector((State) => State?.authReducer);
  const [profile, setProfilePic] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [createvalue, setCreateValue] = useState(false);

  useEffect(() => {
    setFullName(userDetails?.username);
    setEmail(userDetails?.email);
    setDob(
      userDetails?.dob === null
        ? ""
        : moment(userDetails?.dob).format("MM/DD/YYYY")
    );
    setPhone(userDetails?.phone_no);
    setProfilePic(userDetails?.profile_pic);

    dispatch({
      type: types.PROFILE_LOADER,
      payload: false,
    });
  }, []);

  const onSubmitButtonPress = () => {
    setOpenModal(true);
  };

  const uploadUserImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setProfilePic(image?.path);
    });
  };

  const editUserDetail = () => {
    setCreateValue(true);
    if (fullname && phone?.length > 8) {
      let body = {
        username: fullname?.trim(),
        usertypeid: 1,
        phone_no: phone,
        dob: dob === "" ? "" : moment(dob, "MM/DD/YYYY").format("MM/DD/YYYY"),
        profile_pic: profile,
      };
      dispatch({
        type: types?.UPDATE_USER_PROFILE,
        payload: { body: body },
      });
    } else {
      setOpenModal(false);
      showMessage({
        message: "Please enter valid details in all field!",
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
              onPress={() => editUserDetail()}
              loader={authReducer?.profileLoader}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {alertModal()}

      <HeaderSection
        backButton={true}
        title={message?.editProfile}
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles?.profileMainView}
          onPress={() => uploadUserImage()}
        >
          <ImageBackground
            source={require("../../../assets/icons/profile_circle.png")}
            style={styles?.imageProfilebackground}
          >
            {profile ? (
              <Image source={{ uri: profile }} style={styles?.userprofile} />
            ) : (
              <Image
                source={require("../../../assets/icons/user_icon.png")}
                style={styles?.userprofile1}
                resizeMode="contain"
              />
            )}
          </ImageBackground>
          <View style={styles?.editView}>
            {authReducer?.profileLoader ? (
              <ActivityIndicator color={colors?.white} />
            ) : (
              <Image
                source={require("../../../assets/icons/camera_orange.png")}
                style={styles?.editIcon}
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableOpacity>

        {/* Full name */}
        <View style={styles.textContainerView}>
          <CustomTextInput
            placeholder={"Full name"}
            value={fullname}
            onChangeText={(e) => setFullName(e)}
            error={createvalue && fullname?.length == 0}
          />
        </View>
        {/* Email id */}
        <View style={styles.textContainerView}>
          <CustomTextInput
            placeholder={"Email id"}
            value={email}
            onChangeText={(e) => setEmail(e)}
            editable={false}
          />
        </View>

        {/* phone number */}
        <View style={styles.textContainerView}>
          <CustomTextInput
            placeholder={"Phone Number"}
            maxlength={10}
            value={phone}
            onChangeText={(e) => setPhone(e)}
            keyboardType={"phone"}
            error={createvalue && phone?.length < 8}
          />
        </View>
        {/* Date of Birth */}
        <View style={styles.textContainerView}>
          <CustomTextInput
            placeholder={"MM/DD/YYYY"}
            maxlength={10}
            value={
              dob === "1900-01-01T00:00:00"
                ? ""
                : // : userDetails?.dob === null
                // ? ""
                dob
            }
            onChangeText={(text) => {
              setDob(
                text.length === 2 && !text.includes("/")
                  ? `${text.substring(0, 2)}/${text.substring(5)}`
                  : text.length === 5 && text.includes("/")
                    ? `${text.substring(0, 5)}/${text.substring(9)}`
                    : text
              );
            }}
            error={createvalue && dob?.length < 8}
          />
        </View>

        {/* signup button  */}
        <View style={styles?.buttonView}>
          <LinearButton
            title={message?.saveProfile}
            onPress={() => onSubmitButtonPress()}
          />
        </View>
        <View style={styles?.blankSpace} />
      </KeyboardAwareScrollView>
    </View>
  );
};


export default EditUserProfile;
