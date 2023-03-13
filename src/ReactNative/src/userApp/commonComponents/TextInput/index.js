import React from "react";
import { View, Image, TouchableOpacity, TextInput, } from "react-native";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";

const CustomTextInput = ({
  placeholder,
  maxlength,
  autoCapitalize,
  onChangeText,
  value,
  setShowPassword,
  showPassword,
  type,
  keyboardType,
  error,
  textInputProps,
  editable,
  onFocus,
  onBlur,
  isfocus,
}) => {
  return type !== "password" ? (
    <View style={styles.emailAndTextinputView}>
      <View
        style={{
          ...styles.textInpuViewStyle,
          borderColor: error ? "red" : colors?.lightGrey,
          textInputProps,
          borderColor: isfocus ? colors.logout : colors.lightGrey,
        }}
      >
        <TextInput
          keyboardType={keyboardType == "phone" ? "phone-pad" : "default"}
          placeholder={placeholder || ""}
          placeholderTextColor={colors?.grey}
          autoCapitalize={autoCapitalize || "none"}
          maxLength={maxlength || 50}
          onChangeText={(text) => {
            onChangeText && onChangeText(text);
          }}
          style={styles.textInputStyle}
          value={value || ""}
          editable={editable}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
    </View>
  ) : (
    <View style={styles.passAndTextinputView}>
      <View
        style={styles.textInpuViewStyle1}
      >
        <TextInput
          maxLength={20}
          autoCapitalize="none"
          placeholder={placeholder || ""}
          placeholderTextColor={colors?.grey}
          onChangeText={(text) => {
            onChangeText && onChangeText(text);
          }}
          style={styles.textInputStyle1}
          secureTextEntry={!showPassword}
          value={value || ""}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Image
              source={require("../../../assets/icons/eye_on.png")}
              style={styles?.eyeIcon}
              resizeMode={"contain"}
            />
          ) : (
            <Image
              source={require("../../../assets/icons/eye_off.png")}
              style={styles?.eyeIcon}
              resizeMode={"contain"}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomTextInput;
