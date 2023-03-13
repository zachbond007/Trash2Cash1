import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, ImageBackground, ActivityIndicator } from "react-native";

// Third Party
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import ImagePicker from "react-native-image-crop-picker";
import { ScrollView } from "react-native-gesture-handler";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import LinearButton from "../../../userApp/commonComponents/LinearButton";
import CustomTextInput from "../../../userApp/commonComponents/TextInput";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";

const EditPartnerProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [fullname, setFullName] = useState("");
  const [profile, setProfilePic] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [createvalue, setCreateValue] = useState(false);

  const authReducer = useSelector((State) => State?.authReducer);
  const userDetails = useSelector(
    (state) => state?.authReducer?.partnerUserDetails
  );

  useEffect(() => {
    setFullName(userDetails?.username);
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

  const editPartnerDetail = () => {
    setCreateValue(true);

    if (fullname) {
      let body = {
        username: fullname?.trim(),
        source: "Profile",
      };
      dispatch({
        type: types?.UPDATE_PARTNER_PROFILE,
        payload: { body: body, profile: profile },
      });
      setOpenModal(false);
    } else {
      setOpenModal(false);
      showMessage({
        message: "Please enter valid details in all field!",
        type: "danger",
      });
      setOpenModal(false);
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
              onPress={() => editPartnerDetail()}
              loader={authReducer?.profileLoader}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {alertModal()}

      <HeaderSection
        backButton={true}
        title={message?.editProfile}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.container}>
        <KeyboardAvoidingView>
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
          <View style={styles.inputStyle}>
            <CustomTextInput
              placeholder={"Full name"}
              value={fullname}
              onChangeText={(e) => setFullName(e)}
              error={createvalue && fullname?.length == 0}
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
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default EditPartnerProfile;
