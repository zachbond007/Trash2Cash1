import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, } from "react-native";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";

const CustomDropDown = ({
  children,
  onPress,
  title,
  data,
  open,
  value,
  dropdownStyle,
  titleStyle,
  rightIconText,
  onValueChange,
  extraText,
  error,
}) => {
  const [dropdownValue, setdropdownValue] = useState(value);

  const renderDropdownItems = (item) => {
    const onItemClick = (item) => {
      setdropdownValue(item?.title);
      onValueChange(item);
      onPress();
    };

    return (
      <TouchableOpacity
        style={styles.dropdownDataItem}
        onPress={() => onItemClick(item)}
      >
        <Text
          style={styles.itemStyle}
        >
          {item || ""}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        ...(dropdownStyle || styles.mainDropdownView),
        borderColor: error ? "red" : colors?.lightGrey,
      }}
    >
      <TouchableOpacity
        style={styles.dropdownView}
        onPress={() => onPress && onPress()}
      >
        <View style={styles.dropdownValue}>
          <Text
            style={
              titleStyle || {
                ...styles.dropdownText,
                color: dropdownValue || extraText ? colors.black : colors.grey,
              }
            }
          >
            {dropdownValue ? dropdownValue : title || "Select"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.dropdownIconView}
          onPress={() => onPress && onPress()}
        >
          {rightIconText && (
            <Text style={styles.dropdownRightIconText}>{rightIconText}</Text>
          )}
          <Image
            source={require("../../../assets/icons/dropdown.png")}
            style={styles?.dropdownIcon}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <ScrollView style={{ height: open && 0 }}>
        {open === true &&
          data?.length > 0 &&
          data?.map((item) => {
            return (
              <View style={styles.dropdownItemList}>
                {renderDropdownItems(item)}
              </View>
            );
          })}
      </ScrollView>
      {open === true && <View>{children}</View>}
    </View>
  );
};


export default CustomDropDown;
