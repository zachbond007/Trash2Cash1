import React from "react";
import { View, Text, Image } from "react-native";

// Third Party
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

// Constant
import { styles } from "./styles";
import LinearButton from "../../commonComponents/LinearButton";
import HeaderSection from "../../commonComponents/HeaderSection";
import { questions } from "../../../constant/staticData";

const VerifyHunt = () => {
  const navigation = useNavigation();

  const questionItems = (item) => (
    <View>
      <Text style={styles?.titleTextStyle}>{item?.title}</Text>
      {/* options and radio button */}
      <View style={styles?.optionsMainView}>
        {item?.options?.map((item1, index) => (
          <View style={styles?.optionSubView}>
            <View style={styles?.optionView}>
              <Image
                source={
                  item1?.isTrue
                    ? require("../../../assets/icons/radio_on.png")
                    : require("../../../assets/icons/radio_off.png")
                }
                style={styles?.imageView}
              />
              <Text style={styles?.optionsTitleText}>{item1?.title}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        {/* Header section  */}
        <HeaderSection
          backButton={true}
          onBackPress={() => navigation?.goBack()}
        />
        {/* card design */}
        <View style={styles?.cardMainView}>
          <View style={styles?.cardItemView}>
            <Image
              source={require("../../../assets/icons/location.png")}
              style={styles?.itemImageStyle}
              resizeMode={"contain"}
            />
            <Text style={styles?.itemTextStyle}>
              {"Hunting at Los Angeles, CA"}
            </Text>
          </View>

          <View style={styles?.cardItemView}>
            <Image
              source={require("../../../assets/icons/calender_green.png")}
              style={styles?.calenderImageStyle}
              resizeMode={"contain"}
            />
            <Text style={styles?.itemTextStyle}>{"August 28, 2021"}</Text>
          </View>
        </View>

        {/* Image view  */}
        <View style={styles?.trashImageView}>
          <Image
            source={{
              uri: "https://acropolis-wp-content-uploads.s3.us-west-1.amazonaws.com/outside-dumpster-trash-garbage1.jpg",
            }}
            style={styles?.trashImage}
          />
        </View>

        {/* question main view */}
        <View style={styles?.questionSubView}>
          {questions?.map((item) => questionItems(item))}
        </View>

        {/* Submit button */}
        <View style={styles?.submitMainView}>
          <LinearButton
            title={"VERIFY"}
            onPress={() => navigation.navigate("TabNavigation")}
          />
        </View>

        <View style={styles.spacingView} />
      </ScrollView>
    </View>
  );
};


export default VerifyHunt;
