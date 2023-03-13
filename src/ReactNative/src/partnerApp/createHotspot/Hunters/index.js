import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

// Third Party
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

// Constants
import { styles } from "./styles";
import { types } from "../../../action/ActionType";
import { message } from "../../../constant/message";
import NoDataFound from "../../../userApp/commonComponents/NodataFound";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";


const Hunters = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const hotspotHunterList = useSelector(
    (state) => state?.partnerReducer?.hotspotHunterList
  );
  const hotspotId = route.params.hotspotId;

  useEffect(() => {
    dispatch({
      type: types.GET_HOTSPOT_HUNTERS_LIST,
      payload: hotspotId,
    });
  }, []);

  const huntersItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.huntersItemView}>
        <Image
          style={styles.profileImageView}
          source={
            item?.profile_pic
              ? { uri: item?.profile_pic }
              : require("../../../assets/icons/user_icon.png")
          }
        />
        <View style={styles.hunterNameView}>
          <Text style={styles.hunterNameText}>{item?.first_name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderSection
        backButton={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles?.welcomeView}>
        <Text style={styles?.welcometext}>{message?.hunters}</Text>
      </View>

      <FlatList
        data={hotspotHunterList}
        showsVerticalScrollIndicator={false}
        renderItem={huntersItem}
        style={styles.hunterlist}
        ListEmptyComponent={<NoDataFound />}
      />
    </View>
  );
};


export default Hunters;
