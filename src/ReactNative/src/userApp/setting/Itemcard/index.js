import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

// Constants
import { styles } from "./styles";

const SettinghItemCard = ({
  title,
  onPress,
  isToggle,
  toggleValue,
  onTogglePress,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={styles.touchStyle}
    >
      <View style={styles.titleStyle}>
        <Text style={styles?.titleText}>{title || ""}</Text>
      </View>

      <View
        style={styles.toggleView}
      >
        {isToggle ? (
          <TouchableOpacity onPress={() => onTogglePress()}>
            {!toggleValue ? (
              <Image
                source={require("../../../assets/icons/toggle_off.png")}
                style={styles?.toggleStyle}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../../../assets/icons/toggle_on.png")}
                resizeMode="contain"
                style={styles?.toggleStyle}
              />
            )}
          </TouchableOpacity>
        ) : (
          <Image source={require("../../../assets/icons/right_arrow.png")} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SettinghItemCard;
