import Geocoder from "react-native-geocoding";
import { geoCode } from "../../../constant/keys";
Geocoder.init(geoCode);

export default AddressByLatLong = (lat, long) => {
  // from here
  Geocoder.from(lat, long).then((res) => {
    addressComponent1 = addressComponent2 =
      res.results[0].address_components[4].long_name;
    let myAddress = addressComponent1 + "," + addressComponent2;
    let state = "";
    state = res.results.reduce((state, item) => {
      if (item.types.includes("administrative_area_level_1")) {
        return item.formatted_address;
      } else if (item.types.includes("administrative_area_level_2")) {
        return item.formatted_address;
      } else if (item.types.includes("locality")) {
        return item.formatted_address;
      }
      return state;
    }, "unknown");
    address = myAddress;
    let body = {
      address: myAddress,
      location: state,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  });
  // return address;
  // end of code
};
