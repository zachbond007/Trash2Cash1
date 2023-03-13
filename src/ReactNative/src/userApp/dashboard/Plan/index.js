import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Platform, FlatList, Alert, } from "react-native";

// Third Party
import moment from "moment";
import * as RNIap from "react-native-iap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import LinearButton from "../../commonComponents/LinearButton";
import HeaderSection from "../../commonComponents/HeaderSection";

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

const Plan = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userCurrentPlan = useSelector(
    (state) => state?.homeReducer?.userCurrentPlan
  );
  const userOtherPlan = useSelector(
    (state) => state?.homeReducer?.userCurrentPlan?.available_plans
  );
  const loader = useSelector((state) => state?.authReducer?.registrationLoader);
  const [restorePurchase, setRestorePurchase] = useState(false);
  const [productList, setProductList] = useState([]);
  const productIds = [
    "com.trash2cash.monthlysubscription",
    "com.trash2cash.halfyearlysubscription",
    "com.trash2cash.annualsubscription",
  ];

  useEffect(() => {
    dispatch({
      type: types.GET_USER_CURRENT_PLAN,
    });
  }, [upgradeUserToPremium]);

  const upgradeUserToPremium = (receipt, item) => {
    const body = {
      deviceId: Platform.OS === "ios" ? 1 : 2,
      recieptData: receipt,
    };
    dispatch({
      type: types?.POST_VALIDATE_PLAN,
      payload: { body: body, subscriptionId: item },
    });
  };

  useEffect(() => {
    initConnection();

    //  TO BE USED LATER
    // setRestorePurchase(false)

    purchaseErrorSubscription = RNIap.purchaseErrorListener((err) => {
      if (!(err["responseCode"] === "2")) {
        Alert.alert(
          "Error",
          "There has been an error with your purchase, error code",
          err["code"]
        );
      }
    });

    //  TO BE USED LATER
    // purchaseUpdateSubscription = RNIap.purchaseUpdatedListener((purchase) => {
    //   // setPurchased(true);
    //   const receipt = purchase.transactionReceipt;
    //   if (receipt) {
    //     validate(receipt);
    //     RNIap.finishTransaction(purchase);
    //   }
    // }
    // );
    // restoreInAppPurchase();

    return () => {
      try {
        purchaseUpdateSubscription.remove();
      } catch (err) {
        alert(err);
      }
      try {
        purchaseErrorSubscription.remove();
      } catch (err) {
        alert("purchaseErrorSubscription.remove", err);
      }
      try {
        RNIap.endConnection();
      } catch (err) {
        alert(err);
      }
    };
  }, []);

  const validate = async (item) => {
    try {
      purchaseUpdateSubscription = RNIap.purchaseUpdatedListener((purchase) => {
        const receipt = purchase.transactionReceipt;

        if (receipt) {
          upgradeUserToPremium(receipt, item);
          RNIap.finishTransaction(purchase);
        }
      });
    } catch (error) {
    }
  };

  const initConnection = async () => {
    try {
      const result = await RNIap.initConnection()
        .catch((err) => {
        })
        .then((result) => {
          getSubscriptionData(productIds);
        });
    } catch (err) {
    }
  };

  const getSubscription = (productid) => {
    let productId = productid?.subscription_id;
    let firstObj = productList[0].productId;
    let secObj = productList[1].productId;
    let thirdObj = productList[2].productId;
    if (productId === 8) {
      purchaseSubscription(thirdObj, productId);
    } else if (productId === 9) {
      purchaseSubscription(secObj, productId);
    } else if (productId === 10) {
      purchaseSubscription(firstObj, productId);
    }
  };

  const getSubscriptionData = async (productIds) => {
    try {
      if (Platform.OS == "android") {
        const getSubsc = await RNIap.getSubscriptions(productIds)
          .then((subscriptions) => {
            setProductList(subscriptions);
          })
          .catch((err) => {
          });
      } else {
        const getSubsc = await RNIap.getProducts(productIds)
          .then((subscriptions) => {
            setProductList(subscriptions);
          })
          .catch((err) => {
          });
      }
    } catch (err) {
      console.warn("getSubscriptionData: warning =>", err);
    }
  };

  const restoreInAppPurchase = async () => {
    try {
      setRestorePurchase(true);
      // await getPurchaseHistory();
      let receipt = await RNIap.getAvailablePurchases();
      if (receipt) {
        // Restore the purchase.
        Alert.alert("settings.restorePurchaseSuccess");
      } else {
        Alert.alert("No subscription available to restore.");
      }
      setRestorePurchase(false);
    } catch (err) {
      console.warn(err); // standardized err.code and err.message available
      Alert.alert(err.message);
      setRestorePurchase(false);
    }
  };

  const purchaseSubscription = async (product, item) => {
    try {
      if (product) {
        let prevPlan = [];
        if (Platform.OS == "android") {
          prevPlan = await RNIap.getAvailablePurchases();
        } else {
          // alert("TransactionCleared");
          // prevPlan = await RNIap.getAvailablePurchases();
        }
        if (Platform.OS == "android") {
          const reqSubs = RNIap.requestSubscription({
            sku: product,
          })
            .then((purchase) => {
              validate(item);
            })
            .catch((error) => {
            });
        } else {
          const reqSubs = RNIap.requestSubscription({
            sku: product,
            andDangerouslyFinishTransactionAutomaticallyIOS: false,
          })
            .then((purchase) => {
              validate(item);
            })
            .catch((error) => {
            });
        }
      } else {
      }
    } catch (error) {
    }
  };

  const otherPlanItem = ({ item }) => {
    return item?.subscription_id === 4 ? null : (
      <View style={styles.otherPlanItems}>
        <View
          style={styles.directionColumn}
        >
          <Text style={styles.planText}>
            {"$" + item?.amount + " / " + item?.duration_in_month}
            {item?.duration_in_month === 1 ? " month" : " months"}
          </Text>
          <View style={styles.hotspotRewardView}>
            <Text
              style={styles.hotspotRewardText}
            >
              {item?.rewards}
              {"X Points Booster"}
            </Text>
          </View>
        </View>
        <View style={styles.dateStatusView}>
          <LinearButton
            onPress={() => {
              // selectSubscription(item)
              getSubscription(item);
            }}
            style={styles.statusButtonStyle}
            title={"Upgrade"}
            titleStyle={styles.buttonTitleStyle}
            colors={[colors.turquoiseBlue, colors.limeGreen]}
          />
        </View>
      </View>
    );
  };

  const otherPlanHeader = () => {
    return (
      <View style={styles.planListHeader}>
        {restorePurchase && (
          <LinearButton
            onPress={() => restoreInAppPurchase()}
            style={styles.statusButtonStyle1}
            title={"Restore Plan"}
            titleStyle={styles.buttonTitleStyle}
            colors={[colors.turquoiseBlue, colors.limeGreen]}
          />
        )}
        <Text style={styles.planHeaderText}>{"Other Plans"}</Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <HeaderSection
        backButton={true}
        onBackPress={() => navigation.goBack()}
        title={"Premium Plans"}
      />

      <Text style={styles.planDiscription}>
        At certain areas (beaches, large waterways, nature preserves, public
        parks etc.) all trash Collected is worth x2!
      </Text>
      <View style={{ ...styles.planListHeader, ...styles.planList }}>
        <Text style={{ ...styles.planHeaderText, color: colors.errorout }}>
          {"Current Plan"}
        </Text>
      </View>
      {loader ? (
        <ActivityIndicator color={colors.appBlueColor} />
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[colors?.lightBlue2, colors?.yellow3]}
          style={{ ...styles.planItem, ...styles.planList }}
        >
          <Text style={{ ...styles.planText, color: colors.white }}>
            {"$" + userCurrentPlan?.amount + " / " + "month"}
          </Text>
          <View style={styles.hotspotRewardView}>
            <Text style={styles.mostNearText}>
              Participate at businesses' hotspots
            </Text>
          </View>
          {userCurrentPlan?.getNotification && (
            <Text style={styles.getNotificationsText}>
              {userCurrentPlan?.getNotification}
            </Text>
          )}
          {userCurrentPlan?.amount !== 0 && (
            <View style={styles.dateStatusView}>
              <View
                style={styles.expiryDateView}
              >
                <Text
                  style={{ ...styles.buttonTitleStyle, color: colors.white }}
                >
                  Expires on {moment(userCurrentPlan?.valid_till).format("D")}{" "}
                  {moment(userCurrentPlan?.valid_till).format("MMM")}
                </Text>
              </View>

              {/* Can be used later */}
              {/* <TouchableOpacity
                style={{
                  ...styles.statusButtonStyle,
                  backgroundColor: colors.white,
                }}
                // onPress={() => {
                //   // selectSubscription(item)
                //   upgradeUserToPremium(item);
                // }}
              >
                <Text style={styles.buttonTitleStyle}>{"Cancel"}</Text>
              </TouchableOpacity> */}
            </View>
          )}
        </LinearGradient>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={otherPlanHeader}
        data={userOtherPlan?.plan}
        renderItem={otherPlanItem}
        style={styles.planList}
      />
    </View>
  );
};

export default Plan;
