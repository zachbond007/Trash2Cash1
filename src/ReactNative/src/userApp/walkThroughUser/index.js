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

const walkThroughUser = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => { }, [imageChange]);

  const [imageChange, setImageChange] = useState(0);

  const onSkipClick = () => {
    navigation.navigate("Login");
    dispatch({
      type: types.SET_APP_FIRST_OPEN,
      payload: true,
    });
  };
  const onNextClick = () => {
    setImageChange(imageChange + 1);
    if (imageChange === 7) {
      navigation.navigate("Login");
      dispatch({
        type: types.SET_APP_FIRST_OPEN,
        payload: true,
      });
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
                ? require("../../assets/icons/one.png")
                : imageChange == 1
                  ? require("../../assets/icons/two.png")
                  : imageChange == 2
                    ? require("../../assets/icons/three.png")
                    : imageChange == 3
                      ? require("../../assets/icons/four.png")
                      : imageChange == 4
                        ? require("../../assets/icons/five.png")
                        : imageChange == 5
                          ? require("../../assets/icons/six.png")
                          : imageChange == 6
                            ? require("../../assets/icons/seven.png")
                            : require("../../assets/icons/eight.png")
            }
            style={
              imageChange == 0
                ? styles.upperImage1
                : styles?.upperImage
            }
            resizeMode={"contain"}
          />
          <View style={{ marginTop: imageChange == 0 ? -wp("11%") : 0 }}>
            <Text style={styles?.upperTextStyle}>
              {imageChange === 0
                ? `Welcome to Trash2Cash!`
                : imageChange == 1
                  ? `Select the type of hunt you are doing.`
                  : imageChange == 2
                    ? `Make sure the trash can and your trash is clearly visible!`
                    : imageChange == 3
                      ? `Click on a hunt to verify it.`
                      : imageChange == 4
                        ? `Click out the photo then fill in the correct answers to earn points.`
                        : imageChange == 5
                          ? `Take earned points to a business of your choosing.`
                          : imageChange == 6
                            ? `Spend these points on a discount you'd enjoy!`
                            : `Show this to the corresponding business's staff member upon checkout to receive your discount!`}
            </Text>
            {imageChange === 0 && (
              <Text style={styles?.upperTextStyle1}>
                Click here to collect points
              </Text>
            )}
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
              style={[
                styles.dotStyle,
                { opacity: imageChange === 2 ? 1 : 0.5 },
              ]}
            />
            <View
              style={[
                styles.dotStyle,
                { opacity: imageChange === 3 ? 1 : 0.5 },
              ]}
            />
            <View
              style={[
                styles.dotStyle,
                { opacity: imageChange === 4 ? 1 : 0.5 },
              ]}
            />
            <View
              style={[
                styles.dotStyle,
                { opacity: imageChange === 5 ? 1 : 0.5 },
              ]}
            />
            <View
              style={[
                styles.dotStyle,
                { opacity: imageChange === 6 ? 1 : 0.5 },
              ]}
            />
            <View
              style={[styles.dotStyle, { opacity: imageChange >= 7 ? 1 : 0.5 }]}
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

export default walkThroughUser;
