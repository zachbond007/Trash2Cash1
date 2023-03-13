import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";

// Third Party
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

// Constants
import { styles } from "./styles";
import { types } from "../../../action/ActionType";
import NavigationService from "../../../routing/NavigationService";
import HuntItem from "../../../userApp/commonComponents/HuntItem";
import NoDataFound from "../../../userApp/commonComponents/NodataFound";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const PartnerDashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const partnerHotspotList = useSelector(
    (state) => state?.partnerReducer?.partnerHotspotList
  );

  useEffect(() => {
    getPartnerHotspotList();
  }, []);

  const getPartnerHotspotList = () => {
    dispatch({
      type: types?.PARTNER_HOTSPOT_LIST,
    });
  };

  const onCollectionClick = (item) => {
    navigation.navigate("PartnerHotspotDetail", { item: item });
  };

  const editHotspot = (item) => {
    navigation.navigate("EditHotspot", { item: item });
  };

  const onDeleteHotspot = (item) => {
    const body = {
      hotspot_id: item?.hotspot_id,
      is_deleted: 1,
    };
    dispatch({
      type: types?.DELETE_PARTNER_HOTSPOT,
      payload: body,
    });
  };

  const collectionItem = ({ item }) => {
    return (
      <HuntItem
        item={item}
        onPress={() => onCollectionClick(item)}
        onEditPress={() => editHotspot(item)}
        onDeletePress={() => onDeleteHotspot(item)}
      />
    );
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPartnerHotspotList();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContainer}>
        <View>
          <HeaderSection
            profileRight={true}
            onProfilePress={() =>
              NavigationService.navigate("PartnerBusinessProfile")
            }
          />
        </View>
        <View style={styles.container}>

          {/* Collection List */}
          <FlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            style={styles.flatlistContainer}
            data={partnerHotspotList}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              <View style={styles.footContainer} />
            )}
            ListEmptyComponent={() => <NoDataFound />}
            renderItem={collectionItem}
          />
        </View>
      </View>
    </View>
  );
};


export default PartnerDashboard;
