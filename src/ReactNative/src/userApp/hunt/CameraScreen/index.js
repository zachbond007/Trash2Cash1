import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";

// Third Party
import Geocoder from "react-native-geocoding";
import { RNCamera } from "react-native-camera";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

// Constants
import { styles } from "./styles";
import { geoCode } from "../../../constant/keys";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import LinearButton from "../../commonComponents/LinearButton";
import HeaderSection from "../../commonComponents/HeaderSection";

Geocoder.init(geoCode);

const CameraScreen = () => {
  const camRef = useRef();
  const navigation = useNavigation();
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraType, changeCameraType] = useState("back");
  const [flashType, changeFlashType] = useState("on");

  const dispatch = useDispatch();
  const homeReducer = useSelector((State) => State?.homeReducer);
  const authReducer = useSelector((State) => State?.authReducer);

  useEffect(() => {
    dispatch({
      type: types?.BUTTON_LOADER,
      payload: false,
    });
  }, []);

  // Capture picture
  const takePicture = async () => {
    if (camRef?.current) {
      const options = {
        quality: 0.8,
        base64: false,
        mirrorImage: cameraType == "front" ? true : false,
        forceUpOrientation: true,
        fixOrientation: true,
        pauseAfterCapture: true,
      };
      const data = await camRef?.current.takePictureAsync(options);

      setCapturedImage(data?.uri);
    }
  };

  const createHunt = () => {
    if (capturedImage) {
      if (homeReducer?.trashType == 1) {
        Geocoder.from(
          authReducer?.userCurrentLocation?.latitude,
          authReducer?.userCurrentLocation?.longitude
        ).then((res) => {
          addressComponent1 = addressComponent2 =
            res.results[0]?.formatted_address;
          let myAddress = addressComponent1;

          const address = myAddress;
          const body = {
            trash_type: homeReducer?.trashType,
            latitude: authReducer?.userCurrentLocation?.latitude,
            longitude: authReducer?.userCurrentLocation?.longitude,
            address: address,
          };

          dispatch({
            type: types?.CREATE_HUNT,
            payload: { body: body, image: capturedImage },
          });
        });
      } else {
        Geocoder.from(
          authReducer?.userCurrentLocation?.latitude,
          authReducer?.userCurrentLocation?.longitude
        ).then((res) => {
          addressComponent1 = addressComponent2 =
            res.results[0]?.formatted_address;
          let myAddress = addressComponent1;

          const address = myAddress;

          if (
            capturedImage &&
            authReducer?.userCurrentLocation?.latitude &&
            authReducer?.userCurrentLocation?.longitude &&
            homeReducer?.trashType
          ) {
            const body = {
              trash_type: homeReducer?.trashType,
              latitude: authReducer?.userCurrentLocation?.latitude,
              longitude: authReducer?.userCurrentLocation?.longitude,
              address: address,
            };

            dispatch({
              type: types?.CREATE_HUNT,
              payload: { body: body, image: capturedImage },
            });
          }
        });
      }
    } else {
      showMessage({
        message: "Please Click Image First",
        type: "danger",
      });
    }
  };

  const OnDeleteMEdiaPress = () => {
    setCapturedImage(null);
    if (camRef && camRef?.current) {
      camRef?.current.resumePreview();
    }

    showMessage({
      message: "Please Click Your Image",
      type: "success",
    });
  };

  return (
    <View style={styles.container}>
      <HeaderSection
        backButton={true}
        onBackPress={() => navigation.goBack()}
        flash={true}
        onFlashPress={() => {
          changeFlashType(flashType == "on" ? "off" : "on");
        }}
        camera={true}
        onCameraPress={() =>
          changeCameraType(cameraType == "front" ? "back" : "front")
        }
      />
      <View style={styles?.cameraMainView}>
        <RNCamera
          ref={camRef}
          style={styles?.camerastyle}
          flashMode={
            flashType == "on"
              ? RNCamera.Constants.FlashMode.on
              : RNCamera.Constants.FlashMode.off
          }
          captureAudio={false}
          onMountError={(error) => null}
          type={
            cameraType == "front"
              ? RNCamera.Constants.Type.front
              : RNCamera.Constants.Type.back
          }
        >
          <View style={styles?.clickView}>
            <Pressable
              onPressIn={() => takePicture()}
              onPressOut={() => takePicture()}
            >
              <Image
                source={require("../../../assets/icons/camera.png")}
                style={styles?.clickIcon}
              />
            </Pressable>
          </View>
        </RNCamera>
      </View>

      {/* submit button view */}
      <View style={styles?.submitview}>
        <LinearButton
          title={"SUBMIT"}
          onPress={() => createHunt()}
          loader={homeReducer?.buttonLoader}
        />
        {capturedImage !== null && (
          <Text
            style={styles?.deleteMediaStyle}
            disabled={capturedImage === null ? true : false}
            onPress={() => OnDeleteMEdiaPress()}
          >
            {message?.deleteMedia}
          </Text>
        )}
      </View>
    </View>
  );
};

export default CameraScreen;
