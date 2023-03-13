import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

// Third Party
import { FlatList } from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";

const CustomDropdown = ({
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
  huntQue,
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
          style={styles.textStyle}
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
            <Text
              style={[styles.dropdownRightIconText, { width: "70%" }]}
              numberOfLines={1}
            >
              {rightIconText}
            </Text>
          )}
          <Image
            source={require("../../../assets/icons/dropdown.png")}
            style={styles?.dropdownIcon}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {huntQue ? (
        <View style={{ height: open ? wp("40%") : 0 }}>
          {open === true && data?.length > 0 && (
            <>
              <FlatList
                data={data}
                renderItem={({ item, index }) => renderDropdownItems(item)}
                style={styles.dropdownItemList}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}
        </View>
      ) : (
        <>
          {open === true &&
            data?.length > 0 &&
            data?.map((item) => {
              return (
                <View style={styles.dropdownItemList}>
                  {renderDropdownItems(item)}
                </View>
              );
            })}
        </>
      )}
      {open === true && <View>{children}</View>}
    </View>
  );
};



export default CustomDropdown;
