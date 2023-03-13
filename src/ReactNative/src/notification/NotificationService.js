import { useEffect } from "react";

// Third Party
import { useDispatch } from "react-redux";
import messaging from "@react-native-firebase/messaging";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

// constants
import { types } from "../action/ActionType";
import NavigationService from "../routing/NavigationService";

export default function NotificationService() {
  useEffect(() => {
    reqUserPermission();
    checkUserPermission();
  }, []);

  const dispatch = useDispatch();

  //Navigation to screen according to their type
  const navigateAccordingToType = (type, notification_id) => {
    switch (type) {
      case "0":
        dispatch({
          type: types?.REDUCER_NAVIGATE_DASHBOARD,
          payload: type,
        });
        NavigationService.navigate("TabNavigation", {
          screen: "HUNT",
          params: { data: type },
        });

        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });

        break;
      case "1":
        NavigationService.navigate("MarketPlaceDetail");
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      case "2":
        NavigationService.navigate("MarketPlaceDetail");
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      case "3":
        NavigationService.navigate("Friends", { tabIndexx: 1 });
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      case "4":
        NavigationService.navigate("PointScreen");
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      case "5":
        NavigationService.navigate("Friends", { tabIndexx: 0 });
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      case "6":
        NavigationService.navigate("TRASH LIST");
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      case "7":
        NavigationService.navigate("TabNavigation", {
          screen: "POINTS",
        });
        dispatch({
          type: types?.PUT_READ_NOTIFICATION,
          payload: notification_id,
        });
        break;
      default:
        break;
    }
  };

  // authorization for messaging granted
  const reqUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      (authStatus === messaging.AuthorizationStatus.AUTHORIZED) |
      (authStatus === messaging.AuthorizationStatus.PROVISIONAL);
    if (enabled) {
    }
  };

  // checking user permission
  const checkUserPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getUserFcmToken();
    } else {
      reqUserPermission();
    }
  };

  // get user fcm device token
  const getUserFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      AsyncStorageLib.setItem("deviceToken", fcmToken);
    } else {
    }
  };

  // messages listener
  useEffect(() => {
    //foreground app
    messaging().onMessage(async (remoteMessage) => {
      let message = JSON.stringify(remoteMessage);
    });
  }, []);

  useEffect(() => {
    // background app
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      let message = remoteMessage;

      if (message) {
        navigateAccordingToType(
          message?.data?.type,
          message?.data?.notification_id
        );
      }
    });
    // return unsubcribe
  }, []);

  useEffect(() => {
    // check whether initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        let message = JSON.stringify(remoteMessage);
        if (message) {
          navigateAccordingToType(message?.data?.type);
        }
      })
      .catch((error) => { });
    // return unsubcribe
  }, []);

  return null;
}
