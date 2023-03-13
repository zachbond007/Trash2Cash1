import React from "react";
import { View } from "react-native";

// Third Party
import { useDispatch } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Constants
import { font } from "../../../constant/font";
import { styles } from "./styles";
import { geoCode } from "../../../constant/keys";
import { colors } from "../../../constant/colors";
import { types } from "../../../action/ActionType";
import NavigationService from "../../../routing/NavigationService";
import HeaderSection from "../../../userApp/commonComponents/HeaderSection";

const SearchLocation = ({ route }) => {
  const dispatch = useDispatch();
  const from = route?.params?.from;
  return (
    <View style={styles.container}>
      <HeaderSection
        title={"Business’s address"}
        backButton={true}
        onBackPress={() => NavigationService?.goBack()}
      />
      <View
        style={styles.mainView}
      >
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={true}
          returnKeyType={"Search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          onPress={(data, details = null) => {
            NavigationService.goBack();
            if (from == "businessProfile") {
              dispatch({
                type: types.UPDATE_BUSINESS_ADDRESS,
                payload: { location: data.description },
              });
            } else if (from == "hotspot") {
              dispatch({
                type: types.UPDATE_HOTSPOT_ADDRESS,
                payload: { location: data.description },
              });
            }
          }}
          getDefaultValue={() => ""}
          query={{
            key: geoCode,
            language: "en", // language of the results, // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              width: "95%",
              alignSelf: "center",
              borderWidth: 1,
              borderColor: colors.borderColor,
              borderRadius: wp("1%"),
              marginTop: wp("3%"),
            },
            description: {
              fontFamily: font.regular,
              fontSize: wp("4%"),
              color: colors?.black,
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
            textInput: {
              color: colors?.black,
            },
          }}
          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          // currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={
            {
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }
          }
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: "distance",
            types: "food",
          }}
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3",
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          // predefinedPlaces={[homePlace, workPlace]}

          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
      </View>
    </View>
  );
};

export default SearchLocation;
