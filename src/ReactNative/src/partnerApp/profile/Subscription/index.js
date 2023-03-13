import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";

// Third Party
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

// Constants
import { styles } from "./styles";
import { types } from "../../../action/ActionType";
import NoDataFound from "../../../userApp/commonComponents/NodataFound";
import LinearButton from "../../../userApp/commonComponents/LinearButton";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";

const Subscription = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: types.GET_SUBSCRIPTION_LIST,
    });
  }, []);

  const subscriptionList = useSelector(
    (state) => state?.partnerReducer?.subscriptionList
  );

  const buySubscription = (item) => {
    let body = {
      SubscriptionId: item?.subscription_id,
      Amount: item?.amount,
      ValidTill: item?.valid_till,
    };
    dispatch({
      type: types.POST_BUY_SUBSCRIPTION,
      payload: body,
    });
  };

  const subscriptionItem = ({ item }) => {
    return (
      <View style={styles.subscriptionItem}>
        <View style={styles.titleCostView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{item?.title}</Text>
          </View>
          <View style={styles.costView}>
            <Text style={styles.costText}>Cost ${item?.amount}</Text>
          </View>
        </View>
        <Text style={styles.subCategoryText}>
          List {item?.voucher_count} Vouchers
        </Text>
        <Text style={styles.subCategoryText}>{item?.businessReview}</Text>
        <View style={styles.buttonTagView}>
          <View style={styles.validButtonView}>
            <Text style={styles.buttonTitleStyle}>
              Valid for {moment(item?.valid_till).fromNow().substring(3)}
            </Text>
          </View>

          <LinearButton
            onPress={() => buySubscription(item)}
            style={styles.buyButtonStyle}
            title={"Buy"}
            titleStyle={styles.buyButtonTitle}
            colors={["rgba(26, 166, 191,0.6)", "rgba(211, 222, 24,0.6)"]}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderSection
        backButton={true}
        onBackPress={() => navigation?.goBack()}
        title={"Subscription"}
      />
      <FlatList
        data={subscriptionList}
        showsVerticalScrollIndicator={false}
        renderItem={subscriptionItem}
        style={styles.subscriptionList}
        ListEmptyComponent={() => <NoDataFound />}
      />
    </View>
  );
};

export default Subscription;
