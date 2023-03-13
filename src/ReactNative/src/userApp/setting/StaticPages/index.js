import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

// Third Party
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

// Constants
import { styles } from "./styles";
import { colors } from "../../../constant/colors";
import { serviceUrl } from "../../../constant/serviceURL";
import HeaderSection from "../../commonComponents/HeaderSection";

const StaticPages = ({ route }) => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [type, setType] = useState(1);

  useEffect(() => {
    setType(route?.params?.type);
  }, []);

  return (
    <View style={styles?.mainContainer}>
      <HeaderSection
        title={
          type == 1 ? "About Us" : type == 2 ? "Contact Us" : "Terms & Policies"
        }
        backButton={true}
        on
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.containerStyle}>
        <View style={styles.container}>
          {loader ? (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size={"small"} color={colors.appBlueColor} />
            </View>
          ) : null}
          <WebView
            onLoadStart={() => setLoader(true)}
            onLoadEnd={() => setLoader(false)}
            source={{
              uri:
                route?.params?.type == 1
                  ? serviceUrl?.aboutUs
                  : route?.params?.type == 2
                    ? serviceUrl?.contactUS
                    : route?.params?.type == 3 && serviceUrl?.termsConditions,
            }}
          />
        </View>

        <View style={styles.blankView} />
      </ScrollView>
    </View>
  );
};

export default StaticPages;

