import { types } from "../action/ActionType";
const INITIAL_STATE = {
  feedlistData: [],
  sessionStatus: false,
  loginType: "USER",
  huntList: [],
  verifyingList: [],
  verifyingListPgNo: 0,
  hotspotList: [],
  initialLocation: { latitude: 28.535517, longitude: 77.391029 },
  marketPlaces: [],
  buttonLoader: false,
  marketPlacesDetails: "",
  trashType: "",
  pointsHistory: null,
  boostDetails: null,
  friendList: null,

  recommendedFriendlist: null,
  userCurrentPlan: null,
  recommendedFriendlist: null,
  requestFriendlist: null,
  facebook: false,
  twitter: false,
  tras2cash: false,

  reviewListData: null,
  userBalancePoints: null,
  nearbyHotspotList: null,
  listOfSpecificUserForHotspot: null,
  getHuntQuestions: null,
  getFriendHotspotList: null,
  requestedList: [],
  navigateDashboard: null,
  pointsHistoryList: [],
  pointsHistoryPageNo: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types?.FEED_LIST:
      return { ...state, feedlistData: [] };
    case types?.CHECK_SESSION:
      return { ...state, sessionStatus: action?.payload };
    case types?.LOGIN_USER_TYPE:
      return { ...state, loginType: action?.payload };

    case types?.GET_HUNT_LIST:
      let listhunt = []
      if (state.verifyingListPgNo > 0) {
        listhunt = [...state.huntList, ...action?.payload?.data?.data]
      } else {
        listhunt = action?.payload?.data?.data
      }
      return { ...state, huntList: listhunt };


    case types?.SAVE_VERIFYING_LIST:
      let list = []
      if (state.verifyingListPgNo > 0) {
        list = [...state.verifyingList, ...action?.payload?.data?.data]
      } else {
        list = action?.payload?.data?.data
      }
      return { ...state, verifyingList: list };
    case types?.SET_VERIFY_LIST_PAGENO:
      return {
        ...state, verifyingListPgNo: action?.payload
      };

    case types?.GET_HOTSPOT_DATA_LIST:
      return { ...state, hotspotList: action?.payload?.data?.data };
    case types?.SAVE_MARKETPLACE_LIST:
      return { ...state, marketPlaces: action?.payload?.data };
    case types?.BUTTON_LOADER:
      return { ...state, buttonLoader: action?.payload };
    case types?.SAVE_MARKETPLACE_DETAILS:
      return { ...state, marketPlacesDetails: action?.payload?.data };
    case types?.SAVE_TRASH_TYPE:
      return { ...state, trashType: action?.payload?.data };
    case types?.REDUCER_POINTS_HISTORY:
      return { ...state, pointsHistory: action?.payload };


    case types.SET_POINTS_HISTORY_LIST: {
      let list = []
      if (state.pointsHistoryPageNo > 0) {
        list = [...state.pointsHistoryList, ...action?.payload]
      } else {
        list = action?.payload
      }
      return { ...state, pointsHistoryList: list };
    }
    case types.SET_POINTS_HISTORY_PAGENO: {
      return { ...state, pointsHistoryPageNo: action.payload };
    }




    case types?.REDUCER_BOOST_DETAIL_LIST:
      return { ...state, boostDetails: action?.payload };
    case types?.REDUCER_FRIEND_LIST:
      return { ...state, friendList: action?.payload };
    case types?.REDUCER_RECOMMENDATION_FRIEND_LIST:
      let payload = action?.payload;
      let requestList = [...state?.requestFriendlist];
      let res = payload?.filter((el) => {
        return requestList?.find((e) => {
          return e.requester_id === el.friend_id;
        });
      });
      let newData = action?.payload?.filter(function (e) {
        return !res?.find(function (i) {
          return e.friend_id === i.friend_id;
        });
      });
      return { ...state, recommendedFriendlist: newData ?? null };
    case types?.REDUCER_USER_CURRENT_PLAN:
      return { ...state, userCurrentPlan: action?.payload };
    case types?.REDUCER_SOCIAL_PLATFORM:
      return {
        ...state,
        facebook: action?.payload?.facebookToggle,
        twitter: action?.payload?.twitterToggle,
        tras2cash: action?.payload?.trash2Cash,
      };
    case types?.REDUCER_REQUEST_FRIEND_LIST:
      return { ...state, requestFriendlist: action?.payload };
    case types?.REDUCER_REVIEW_LIST:
      return { ...state, reviewListData: action?.payload };
    case types?.REDUCER_USER_BALANCE_POINTS:
      return { ...state, userBalancePoints: action?.payload };
    case types?.REDUCER_NEARBY_HOTSPOT_LIST:
      return { ...state, nearbyHotspotList: action?.payload };
    case types?.REDUCER_LIST_OF_SPECIFIC_USERS_FOR_HOTSPOT:
      return { ...state, listOfSpecificUserForHotspot: action?.payload };
    case types?.REDUCER_HUNT_QUESTIONS:
      return { ...state, getHuntQuestions: action?.payload };
    case types?.REDUCER_FRIEND_HOTSPOT_LIST:
      return { ...state, getFriendHotspotList: action?.payload };
    case types?.REDUCER_NAVIGATE_DASHBOARD:
      return { ...state, navigateDashboard: action?.payload };
    default:
      return state;
  }
};
