import React, { useEffect } from "react";
import { View, StatusBar, Platform, LogBox } from "react-native";

// Third Party
import { Provider } from "react-redux";
import RNBootSplash from "react-native-bootsplash";
import FlashMessage from "react-native-flash-message";
import { startNetworkLogging } from "react-native-network-logger";

// Constants
import { store } from "./reducers/store";
import AppNavigation from "./routing/AppNavigation";
import NotificationService from "./notification/NotificationService";

const App = () => {
  useEffect(() => {
    startNetworkLogging({ forceEnable: true });

    RNBootSplash.hide();
  }, []);

  return (
    <Provider store={store}>
      <NotificationService />
      <View style={{ flex: 1 }}>
        {Platform.OS === "ios" && (
          <StatusBar hidden={false} barStyle={"dark-content"} />
        )}
        <AppNavigation />
        <FlashMessage position="bottom" />
      </View>
    </Provider>
  );
};

LogBox.ignoreAllLogs(true);
export default App;
