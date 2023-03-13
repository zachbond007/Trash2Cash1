/**
 * @format
 */
import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import messaging from "@react-native-firebase/messaging";
import NavigationService from "./src/routing/NavigationService";
import { types } from "./src/action/ActionType";

//     0 - HuntVerified,
//     1 - PurchaseVoucher,
//     2 - RedeemVoucher,
//     3 - FriendRequest,
//     4 - PointExpiration,
//     5 - FriendRequestAccepted,
//     6 - NewHotSpotCreated,
//     7 - BoostPoints

const navigateAccordingToType = (type) => {
  setTimeout(() => {
    switch (type) {
      case "0":
        NavigationService.navigate("Dashboard");
        break;
      case "1":
        NavigationService.navigate("MarketPlaceDetail");
        break;
      case "2":
        NavigationService.navigate("MarketPlaceDetail");
        break;
      case "3":
        NavigationService.navigate("Friends", { tabIndexx: 1 });
        break;
      case "4":
        NavigationService.navigate("PointScreen");
        break;
      case "5":
        NavigationService.navigate("Friends", { tabIndexx: 0 });
        break;
      case "6":
        NavigationService.navigate("TrashList");
        break;
      case "7":
        NavigationService.navigate("PointScreen");
        break;
      default:
        break;
    }
  }, 2000);
};

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  if (remoteMessage) {
    navigateAccordingToType(remoteMessage?.data?.type);
  }
});
messaging()
  .getInitialNotification()
  .then((remoteMessage) => {
    if (remoteMessage) {
      navigateAccordingToType(remoteMessage?.data?.type);
    }
  })
  .catch((error) => { });

AppRegistry.registerComponent(appName, () => App);
