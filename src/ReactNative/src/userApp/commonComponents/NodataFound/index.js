import React from "react";
import { View, Text, Image } from "react-native";

// Constants
import { styles } from "./styles";

const NoDataFound = () => {
  return (
    <View style={styles?.mainContainer}>
      <Image
        source={require("../../../assets/icons/no_data_found.png")}
        style={styles?.imageStyle}
        resizeMode="contain"
      />
      <Text style={styles?.noDataFound}>No Data Found</Text>
    </View>
  );
};

export default NoDataFound;
