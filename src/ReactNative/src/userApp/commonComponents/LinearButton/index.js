import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";

// Third Party
import LinearGradient from "react-native-linear-gradient";

// Constants
import { styles } from "./styles";
import * as color from "../../../constant/colors";

const LinearButton = ({
  title,
  style,
  onPress,
  loader,
  titleStyle,
  colors,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      disabled={disabled ? disabled : loader}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors || ["#1AA6BF", "#D3DE18"]}
        style={style || styles.linearGradient}
      >
        {loader ? (
          <ActivityIndicator color={color?.white} />
        ) : (
          <Text style={titleStyle || styles.buttonText}>{title || ""}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LinearButton;
