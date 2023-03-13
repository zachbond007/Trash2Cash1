import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";

// Third Party
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Constants
import { styles } from './styles'
import { Voucher } from "../../partnerApp/voucher";
import PointScreen from "../../userApp/PointScreen";
import { TrashList } from "../../userApp/trashList";
import { Dashboard } from "../../userApp/dashboard";
import { Notifications } from "../../userApp/dashboard";
import { MarketPlace } from "../../userApp/marketplace";
import { PartnerDashboard } from "../../partnerApp/partnerDashboard";
import { PartnerBusinessProfile } from "../../partnerApp/partnerBusinessProfile";

const Tab = createBottomTabNavigator();

const TabNavigation = ({ route }) => {
  let key = route?.params;

  const loginType = useSelector((state) => state?.homeReducer?.loginType);

  function UserTabBar({ state, descriptors, navigation }) {
    return (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={["rgba(26, 166, 191,0.9)", "rgba(211, 222, 24,0.6)"]}
        style={styles.mainContainer}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const tabIcon = () => {
            if (route.name === "HUNT") {
              if (isFocused === true) {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/hunt_active.png")}
                  />
                );
              } else {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/hunt_inactive.png")}
                  />
                );
              }
            } else if (route.name === "MARKETPLACE") {
              if (isFocused === true) {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/marketplace_active.png")}
                  />
                );
              } else {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/marketplace_inactive.png")}
                  />
                );
              }
            } else if (route.name === "TRASH LIST") {
              if (isFocused === true) {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/location_active.png")}
                  />
                );
              } else {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/location_inactive.png")}
                  />
                );
              }
            } else if (route.name === "POINTS") {
              if (isFocused === true) {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/money_inactive.png")}
                  />
                );
              } else {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/money_active.png")}
                  />
                );
              }
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.touchView}
            >
              {tabIcon()}

              {isFocused === true && (
                <Text
                  style={[
                    styles.tabIconText,
                    {
                      width:
                        options.tabBarLabel === "MARKETPLACE" ? "110%" : null,
                    },
                  ]}
                >
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    );
  }

  function PartnerTabBar({ state, descriptors, navigation }) {
    return (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={["rgba(26, 166, 191,0.9)", "rgba(211, 222, 24,0.6)"]}
        style={styles.partnerContainer}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const tabIcon = () => {
            if (route.name === "VOUCHER") {
              if (isFocused === true) {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/percent_active.png")}
                  />
                );
              } else {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/percent_inactive.png")}
                  />
                );
              }
            } else if (route.name === "MARKETPLACE") {
              if (isFocused === true) {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/home_active.png")}
                  />
                );
              } else {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/home_inactive.png")}
                  />
                );
              }
            } else if (route.name === "EMPLOYEE") {
              if (isFocused === true) {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/users_active.png")}
                  />
                );
              } else {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/users_inactive.png")}
                  />
                );
              }
            } else if (route.name === "NOTIFICATION") {
              if (isFocused === true) {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/notification_active.png")}
                  />
                );
              } else {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/notification_inactive.png")}
                  />
                );
              }
            } else if (route.name === "PartnerDashboard") {
              if (isFocused === true) {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/hunt_active.png")}
                  />
                );
              } else {
                return (
                  <Image
                    resizeMode={"contain"}
                    style={styles.tabIconSize}
                    source={require("../../assets/icons/hunt_inactive.png")}
                  />
                );
              }
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.touchView}
            >
              {tabIcon()}

              {isFocused === true && (
                <Text style={styles.partnerTabIconText}>{label}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    );
  }

  if (loginType === "USER") {
    return (
      <Tab.Navigator
        defaultScreenOptions={{ headerShown: false, animationEnabled: false }}
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
          tabBarActiveTintColor: "#e91e63",
          tabBarHideOnKeyboard: true,
        }}
        initialRouteName="HUNT"
        tabBar={(props) => <UserTabBar {...props} />}
      >
        <Tab.Screen
          name="HUNT"
          component={Dashboard}
          options={{
            tabBarLabel: "HUNT",
            headerShown: false,
          }}
          initialParams={key === "verified" ? { initialParams: key } : null}
        />
        <Tab.Screen
          name="MARKETPLACE"
          component={MarketPlace}
          options={{
            tabBarLabel: "MARKETPLACE",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="TRASH LIST"
          component={TrashList}
          options={{
            tabBarLabel: "TRASH LIST",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="POINTS"
          component={PointScreen}
          options={{
            tabBarLabel: "POINTS",
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  } else {
    return (
      <Tab.Navigator
        defaultScreenOptions={{ headerShown: false, animationEnabled: false }}
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
          tabBarActiveTintColor: "#e91e63",
        }}
        initialRouteName="MARKETPLACE"
        tabBar={(props) => <PartnerTabBar {...props} />}
      >
        <Tab.Screen
          name="VOUCHER"
          component={Voucher}
          options={{
            tabBarLabel: "VOUCHER",
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="PartnerDashboard"
          component={PartnerDashboard}
          options={{
            tabBarLabel: "HUNT",
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="MARKETPLACE"
          component={PartnerBusinessProfile}
          options={{
            tabBarLabel: "HOME",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="NOTIFICATION"
          component={Notifications}
          options={{
            tabBarLabel: "NOTIFICATION",
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }
};

export default TabNavigation;
