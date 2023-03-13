import React from "react";
import { View, Text, ImageBackground } from "react-native";

// Third Party
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

// Constants
import { styles } from "./styles";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import HeaderSection from "../../commonComponents/HeaderSection";

const SelectHunt = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const trashItemClick = (trashType) => {
    dispatch({
      type: types?.TRASH_TYPE,
      payload: { id: trashType },
    });

    if (trashType === 1) {
      navigation.navigate("CameraScreen");
    } else {
      navigation.navigate("StartHunt");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/icons/gradient_bg.png")}
        style={styles.container}
      >
        {/* back button  */}
        <HeaderSection
          backButton={true}
          onBackPress={() => navigation?.goBack()}
        />

        <ScrollView
          style={styles.itemScrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Item view  */}
          <View style={styles?.maincontainer}>
            <TouchableOpacity onPress={() => trashItemClick(1)}>
              <ImageBackground
                source={require("../../../assets/icons/item.png")}
                style={styles?.cardBackground}
                resizeMode={"contain"}
              >
                <View style={styles?.titleMainView}>
                  <Text style={styles?.titleStyle}>{message?.item}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          {/* Small trash view */}
          <View style={styles?.maincontainer}>
            <TouchableOpacity onPress={() => trashItemClick(2)}>
              <ImageBackground
                source={require("../../../assets/icons/small.png")}
                style={styles?.cardBackground}
                resizeMode={"contain"}
              >
                <View style={styles?.titleMainView}>
                  <Text style={styles?.titleStyle}>{message?.small}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          {/* large trash view */}
          <View style={styles?.maincontainer}>
            <TouchableOpacity onPress={() => trashItemClick(3)}>
              <ImageBackground
                source={require("../../../assets/icons/large.png")}
                style={styles?.cardBackground}
                resizeMode={"contain"}
              >
                <View style={styles?.titleMainView}>
                  <Text style={styles?.titleStyle}>{message?.large}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SelectHunt;
