import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";

// Third Party
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { styles } from "./styles";
import { images } from "../../constant/images";
import { types } from "../../action/ActionType";

const walkThroughPartner = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => { }, [imageChange]);

  const [imageChange, setImageChange] = useState(0);

  const onSkipClick = () => {
    dispatch({
      type: types.SET_APP_FIRST_OPEN_PARTNER,
      payload: true,
    });
    navigation.navigate("PartnerLogin");
  };
  const onNextClick = () => {
    setImageChange(imageChange + 1);
    if (imageChange === 2) {
      dispatch({
        type: types.SET_APP_FIRST_OPEN_PARTNER,
        payload: true,
      });
      navigation.navigate("PartnerLogin");
    }
  };

  return (
    <View style={styles?.mainContainer}>
      <ImageBackground
        style={styles?.imageBackground}
        source={images?.splash_bg}
      >
        <View style={styles?.upperStyle}>
          <Image
            source={
              imageChange === 0
                ? require("../../assets/icons/secondBusiness.png")
                : imageChange === 1
                  ? require("../../assets/icons/thirdBusiness.png")
                  : require("../../assets/icons/firstBusiness.png")
            }
            style={
              imageChange == 0
                ? { width: wp("150%"), height: wp("150%"), flex: 0.6 }
                : styles?.upperImage
            }
            resizeMode={"contain"}
          />
          <View>
            <Text style={styles?.upperTextStyle}>
              {imageChange === 0
                ? `Click here to create your first voucher`
                : imageChange === 1
                  ? `Consumers will show a staff member this screen at checkout, redeeming their voucher. This voucher expires 30 minutes after usage.`
                  : `Trash Hotspots make all litter picked up at your business worth X2 points to consumers for a limited time. Click here to create one`}
            </Text>
          </View>
        </View>
        <View style={styles?.bottomView}>
          <TouchableOpacity
            style={styles?.bottomTextView}
            onPress={() => onSkipClick()}
          >
            <Text style={styles.bottomText}>Skip</Text>
          </TouchableOpacity>
          <View style={styles.directionRow}>
            <View
              style={[
                styles.dotStyle,
                { opacity: imageChange === 0 ? 1 : 0.5 },
              ]}
            />
            <View
              style={[
                styles.dotStyle,
                { opacity: imageChange === 1 ? 1 : 0.5 },
              ]}
            />
            <View
              style={[styles.dotStyle, { opacity: imageChange >= 2 ? 1 : 0.5 }]}
            />
          </View>
          <TouchableOpacity
            style={styles?.bottomTextView}
            onPress={() => onNextClick()}
          >
            <Text style={styles.bottomText}>Next</Text>
          </TouchableOpacity>
        </View>
        {/*  */}
      </ImageBackground>
    </View>
  );
};

export default walkThroughPartner;
