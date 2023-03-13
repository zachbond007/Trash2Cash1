import { types } from "../action/ActionType";
const INITIAL_STATE = {
  isFirstTimeOpened: false,
  isFirstTimeOpenedPartner: false,
  loginData: "",
  registrationLoader: false,
  userDetails: "",
  profileLoader: false,
  notificationList: [],
  notifPgNo: 0,
  partnerUserDetails: "",
  userCurrentLocation: "",
  userBusinessAddress: "",
  userHotspotAddress: "",
  currentLocationStatus: false,
  userCoordinates: [],
};

const currentCoordinates = (currentState, updatedCoordinates) => {
  const coordinates = currentState.concat({
    latitude: updatedCoordinates?.latitude,
    longitude: updatedCoordinates?.longitude,
  });

  return coordinates;
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REDUCER_APP_FIRST_OPEN:
      return {
        ...state,
        isFirstTimeOpened: action.payload,
      };
    case types.REDUCER_APP_FIRST_OPEN_PARTNER:
      return {
        ...state,
        isFirstTimeOpenedPartner: action.payload,
      };
    case types?.SAVE_LOGGED_IN_USER_DATA:
      return { ...state, loginData: action?.payload?.data };
    case types?.REGISTRATION_LOADER:
      return { ...state, registrationLoader: action?.payload };
    case types?.SAVE_USER_DETAILS:
      return { ...state, userDetails: action?.payload?.data };
    case types.SAVE_NOTIFICATION_LIST: {
      let list = []
      if (state.notifPgNo > 0) {
        list = [...state.notificationList, ...action?.payload?.data]
      } else {
        list = action?.payload?.data
      }
      return { ...state, notificationList: list };
    }
    case types.SET_NOTIFICATION_PAGENO: {
      return { ...state, notifPgNo: action.payload };
    }
    case types?.PROFILE_LOADER:
      return { ...state, profileLoader: action?.payload };
    case types?.SAVE_PARTNER_USER_DETAILS:
      return { ...state, partnerUserDetails: action?.payload?.data };
    case types?.UPDATE_USER_CURRENT_LOCATION:
      return {
        ...state,
        userCurrentLocation: action?.payload?.location,
        currentLocationStatus: true,
        userCoordinates: currentCoordinates(
          state.userCoordinates,
          action?.payload?.location
        ),
      };
    case types?.UPDATE_BUSINESS_ADDRESS:
      return { ...state, userBusinessAddress: action?.payload?.location };
    case types?.UPDATE_HOTSPOT_ADDRESS:
      return { ...state, userHotspotAddress: action?.payload?.location };
    case types?.CURRENT_LOCATION_STATUS:
      return { ...state, currentLocationStatus: action?.payload };
    case types?.CLEAR_REDUCER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
