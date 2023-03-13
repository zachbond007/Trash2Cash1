import React, { useEffect } from "react";
import { Linking } from "react-native";

// Third Party
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Constants
import { navigationRef } from "./NavigationService";

// UserApp
import TabNavigation from "./TabNavigation";
import { useDispatch, useSelector } from "react-redux";
import walkThroughUser from "../userApp/walkThroughUser";
import { Settings, ChangePassword, StaticPages } from "../userApp/setting";
import { CreateHotspot, Hunters, EditHotspot, } from "../partnerApp/createHotspot";
import { SelectHunt, CameraScreen, VerifyQuestions, VerifyHunt, StartHunt, VerifyHuntImage, VerifiedHunt, } from "../userApp/hunt";
import { OnBoarding, Login, Register, ForgotPassword, Profile, OTPVerification, CreateNewPassword, EditUserProfile, } from "../userApp/authentication";

// partnerApp
import Friends from "../userApp/Friends";
import PointScreen from "../userApp/PointScreen";
import PartnerSettings from "../partnerApp/settings";
import { TrashList, TrashListDetail } from "../userApp/trashList";
import walkThroughPartner from "../partnerApp/walkThroughPartner";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { Dashboard, Notifications, Plan } from "../userApp/dashboard";
import { MarketPlaceDetail, RateReview } from "../userApp/marketplace";
import { CreateVoucher, Voucher, EditVoucher, } from "../partnerApp/voucher";
import PartnerBusinessProfile from "../partnerApp/partnerBusinessProfile";
import PartnerHotspotDetail from "../partnerApp/partnerDashboard/PartnerHotspotDetail";
import { PartnerProfile, Subscription, SendMoney, SendGifts, EditPartnerProfile, EditBusinessProfile, } from "../partnerApp/profile";
import { PartnerLogin, PartnerRegister, SignupConfirmation, PartnerForgotPassword, BusinessProfile, SearchLocation, } from "../partnerApp/authentication";

const AppNavigation = () => {
  const HomeStack = createStackNavigator();
  const AuthStack = createStackNavigator();

  const dispatch = useDispatch();

  const { sessionStatus } = useSelector((state) => state?.homeReducer);
  const checkSession = async () => {
    let token = await AsyncStorageLib.getItem("Token");
    if (token) {
      dispatch({
        type: types.CHECK_SESSION,
        payload: true,
      });
    } else {
      dispatch({
        type: types.CHECK_SESSION,
        payload: false,
      });
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const config = {
    screens: {
      Login: {
        path: "login",
      },
      PartnerLogin: {
        path: "partner",
      },
    },
  };
  const deepLink = {
    prefixes: ["trash2cashh-app://"],
    config,
  };

  useEffect(() => {
    Linking.addEventListener("url", ({ url }) => { });
    Linking.getInitialURL().then((url) => {
    });
    return () => {
      removeLinkingListeners();
    };
  }, []);

  const removeLinkingListeners = async () => {
    Linking.removeAllListeners("url");
  };

  return (
    <NavigationContainer ref={navigationRef} linking={deepLink}>
      {sessionStatus ? (
        <HomeStack.Navigator
          headerMode="none"
          initialRouteName="TabNavigation"
          screenOptions={{ headerShown: false, animationEnabled: false }}
        >
          <HomeStack.Screen name="TabNavigation" component={TabNavigation} />
          <HomeStack.Screen name="SendGifts" component={SendGifts} />
          <HomeStack.Screen name="SendMoney" component={SendMoney} />
          <HomeStack.Screen
            name="PartnerForgotPassword"
            component={PartnerForgotPassword}
          />
          <HomeStack.Screen name="StartHunt" component={StartHunt} />
          <HomeStack.Screen name="CreateHotspot" component={CreateHotspot} />
          <HomeStack.Screen
            name="TrashListDetail"
            component={TrashListDetail}
          />
          <HomeStack.Screen name="Hunters" component={Hunters} />
          <HomeStack.Screen name="CameraScreen" component={CameraScreen} />
          <HomeStack.Screen name="SelectHunt" component={SelectHunt} />
          <HomeStack.Screen
            name="PartnerSettings"
            component={PartnerSettings}
          />
          <HomeStack.Screen name="PartnerProfile" component={PartnerProfile} />
          <HomeStack.Screen
            name="VerifyHuntImage"
            component={VerifyHuntImage}
          />
          <HomeStack.Screen name="VerifiedHunt" component={VerifiedHunt} />
          <HomeStack.Screen
            name="VerifyQuestions"
            component={VerifyQuestions}
          />
          <HomeStack.Screen name="VerifyHunt" component={VerifyHunt} />
          <HomeStack.Screen
            name="MarketPlaceDetail"
            component={MarketPlaceDetail}
          />
          <HomeStack.Screen name="RateReview" component={RateReview} />
          <HomeStack.Screen name="Friends" component={Friends} />
          <HomeStack.Screen name="Settings" component={Settings} />
          <HomeStack.Screen name="Profile" component={Profile} />
          <HomeStack.Screen name="Notifications" component={Notifications} />
          <HomeStack.Screen name="ChangePassword" component={ChangePassword} />
          <HomeStack.Screen name="StaticPages" component={StaticPages} />
          <HomeStack.Screen
            name="PartnerBusinessProfile"
            component={PartnerBusinessProfile}
          />
          <HomeStack.Screen name="CreateVoucher" component={CreateVoucher} />
          <HomeStack.Screen name="Voucher" component={Voucher} />
          <HomeStack.Screen
            name="PartnerHotspotDetail"
            component={PartnerHotspotDetail}
          />
          <HomeStack.Screen name="SearchLocation" component={SearchLocation} />
          <HomeStack.Screen
            name="EditUserProfile"
            component={EditUserProfile}
          />
          <HomeStack.Screen
            name="EditPartnerProfile"
            component={EditPartnerProfile}
          />
          <HomeStack.Screen name="EditHotspot" component={EditHotspot} />
          <HomeStack.Screen
            name="EditBusinessProfile"
            component={EditBusinessProfile}
          />
          <HomeStack.Screen name="Subscription" component={Subscription} />
          <HomeStack.Screen name="Plan" component={Plan} />
          <HomeStack.Screen name="EditVoucher" component={EditVoucher} />

          {/* Notification */}
          <HomeStack.Screen name="Dashboard" component={Dashboard} />
          <HomeStack.Screen name="TrashList" component={TrashList} />
          <HomeStack.Screen name="PointScreen" component={PointScreen} />
        </HomeStack.Navigator>
      ) : (
        <AuthStack.Navigator
          headerMode="none"
          screenOptions={{ headerShown: false, animationEnabled: false }}
          initialRouteName={"Login"}
        >
          <AuthStack.Screen name="OnBoarding" component={OnBoarding} />
          <AuthStack.Screen
            name="PartnerRegister"
            component={PartnerRegister}
          />
          <AuthStack.Screen
            name="BusinessProfile"
            component={BusinessProfile}
          />
          <AuthStack.Screen
            name="walkThroughUser"
            component={walkThroughUser}
          />
          <AuthStack.Screen
            name="walkThroughPartner"
            component={walkThroughPartner}
          />
          <AuthStack.Screen name="PartnerLogin" component={PartnerLogin} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Register" component={Register} />
          <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
          <AuthStack.Screen
            name="MarketPlaceDetail"
            component={MarketPlaceDetail}
          />
          <AuthStack.Screen name="RateReview" component={RateReview} />
          <AuthStack.Screen name="Friends" component={Friends} />
          <AuthStack.Screen name="Subscription" component={Subscription} />
          <AuthStack.Screen name="Voucher" component={Voucher} />
          <AuthStack.Screen
            name="SignupConfirmation"
            component={SignupConfirmation}
          />
          <AuthStack.Screen name="SearchLocation" component={SearchLocation} />
          <AuthStack.Screen
            name="OTPVerification"
            component={OTPVerification}
          />
          <AuthStack.Screen
            name="CreateNewPassword"
            component={CreateNewPassword}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
