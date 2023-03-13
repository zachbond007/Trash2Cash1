import * as React from "react";
import { CommonActions } from "@react-navigation/native";

// NavigationContainer is refered here - Check NavigationStack
export const navigationRef = React.createRef();

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

function navigateAndReset() {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "Login" }],
    })
  );
}

function resetToLogin() {
  return this.props.navigation.dispatch(
    CommonActions.reset({
      index: 0,
      actions: [navigationRef.current?.navigate({ routeName: "Login" })],
    })
  );
}

export default {
  setTopLevelNavigator,
  navigate,
  goBack,
  navigateAndReset,
  resetToLogin,
};
