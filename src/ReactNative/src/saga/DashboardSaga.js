import { takeLatest, put, call, select } from "redux-saga/effects";

// Third Party
import Toast from "react-native-simple-toast";

// Constants
import { types } from "../action/ActionType";
import { serviceUrl } from "../constant/serviceURL";
import { apiCall, uploadFileToAzure } from "../utils/utility";
import NavigationService, { navigationRef } from "../routing/NavigationService";

function* getFeedList(obj) {
  let { payload } = obj;
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}?limit=${payload?.pageSize}&offset=${payload?.pageNo}`,
      null,
      "GET"
    );
    if (response.status == 200) {
      yield put({
        type: types.SAVE_FEED_LIST_DATA,
        payload: { data: response.result?.results, pageNo: payload?.pageNo },
      });
    } else {
    }
  } catch (error) {
  }
}

function* getHuntData(obj) {
  let { payload } = obj;
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Hunt/GetHuntList?hunt_Status=${payload?.huntStatus || 0
      }&pageNo=${payload?.pageNo || 1}&pageSize=${payload?.pageSize || 10}`,
      null,
      "GET"
    );

    if (response.status == 200) {
      yield put({
        type: types.GET_HUNT_LIST,
        payload: { data: response?.result },
      });
    } else {
    }
  } catch (error) {
  }
}

function* getVerifyingData(obj) {
  let { payload } = obj;
  yield put({
    type: types.BUTTON_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Hunt/VerifyingList?hunt_status=${payload?.huntStatus || 1
      }&pageNo=${payload?.pageNo || 1}&pageSize=${payload?.pageSize || 10}`,
      null,
      "GET"
    );
    if (response.status == 200) {
      yield put({
        type: types.SAVE_VERIFYING_LIST,
        payload: { data: response?.result },
      });
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    } else {
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: types.BUTTON_LOADER,
      payload: false,
    });
  }
}

function* createHunt(obj) {
  let { payload } = obj;
  yield put({
    type: types.BUTTON_LOADER,
    payload: true,
  });

  let huntImage = yield call(uploadFileToAzure, payload?.image, "huntimage");

  let body = payload?.body;

  if (huntImage) {
    body["hunt_image"] = huntImage;
  }
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Hunt/SubmitHunt`,
      body,
      "POST"
    );
    if (response.status == 200) {
      Toast.show("Hunt Created Successfully ", Toast.LONG);

      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });

      yield put({
        type: types?.GET_HUNT_DATA,
      });
      NavigationService.navigate("TabNavigation");
    } else {
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: types.BUTTON_LOADER,
      payload: false,
    });

  }
}

function* getHotspotList() {
  const state = yield select();
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}HotSpot/GetHotSpotListForMap?lat=${state?.authReducer?.userCurrentLocation?.latitude}&long=${state?.authReducer?.userCurrentLocation?.longitude}`,
      null,
      "GET"
    );
    if (response.status == 200) {
      yield put({
        type: types.GET_HOTSPOT_DATA_LIST,
        payload: { data: response?.result },
      });
    } else {
    }
  } catch (error) {
  }
}

function* submitVerify(obj) {
  let { payload } = obj;
  yield put({
    type: types.BUTTON_LOADER,
    payload: true,
  });

  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Hunt/SubmitVerification`,
      payload,
      "POST"
    );
    if (response.status == 200) {
      Toast.show("Verification Successfully Completed", Toast.LONG);
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });

      yield put({
        type: types?.GET_VERIFYING_DATA,
      });
      NavigationService.navigate("TabNavigation");
    } else if (response.status == 400) {
      Toast.show("Verification Not Completed", Toast.LONG);
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });

      yield put({
        type: types?.GET_VERIFYING_DATA,
      });
      NavigationService.navigate("TabNavigation");
    } else {
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: types.BUTTON_LOADER,
      payload: false,
    });

  }
}

// marketplaces api
function* marketplacesList(obj) {
  const { payload } = obj;
  yield put({
    type: types.BUTTON_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/get-partner-list?industryId=${payload?.id}`,
      null,
      "GET"
    );
    if (response.status == 200) {
      yield put({
        type: types.SAVE_MARKETPLACE_LIST,
        payload: { data: response?.result?.data },
      });
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    } else {
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: types.BUTTON_LOADER,
      payload: false,
    });
  }
}

// marketplaces api
function* marketplacesDetails(obj) {
  const { payload } = obj;
  try {
    yield put({
      type: types.BUTTON_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/GetPartnerDetails?partnerId=${payload?.market_id}`,
      null,
      "GET"
    );
    if (response.status == 200) {
      yield put({
        type: types.SAVE_MARKETPLACE_DETAILS,
        payload: { data: response?.result },
      });
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    } else {
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: types.BUTTON_LOADER,
      payload: false,
    });
  }
}

function* getTrashType(obj) {
  const { payload } = obj;

  yield put({
    type: types.SAVE_TRASH_TYPE,
    payload: { data: payload?.id },
  });
}


function* postBuyVoucher(payload) {
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/BuyVouchers?VoucherId=${payload.payload}`,
      null,
      "POST"
    );
    if (response.status === 200) {
      Toast.show(response?.result?.message, Toast.LONG);
    } else {
      Toast.show(response?.result?.message, Toast.LONG);
    }
  } catch (error) {
  }
}

function* postReview(payload) {
  yield put({
    type: types.BUTTON_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/SubmitReview`,
      payload.payload,
      "POST"
    );
    if (response?.status == 200) {
      Toast.show(response?.result?.message, Toast.LONG);
      showMessage({
        message: response.result?.message,
        type: "success",
      });
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    } else if (response?.status == 500) {
      showMessage({
        message: "response.result?.message",
        type: "danger",
      });
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: types.BUTTON_LOADER,
      payload: false,
    });
  }
}

function* getReviewList(payload) {
  yield put({
    type: types.BUTTON_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/ReviewList?partnerId=${payload.payload}`,
      null,
      "GET"
    );
    if (response?.status == 200) {
      yield put({
        type: types.REDUCER_REVIEW_LIST,
        payload: response?.result,
      });
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    } else {
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: types.BUTTON_LOADER,
      payload: false,
    });
  }
}

function* getUserBalancePoints() {
  yield put({
    type: types.BUTTON_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/GetBalancePoints`,
      null,
      "GET"
    );
    if (response?.status == 200) {
      yield put({
        type: types.REDUCER_USER_BALANCE_POINTS,
        payload: response?.result,
      });
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    } else {
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: types.BUTTON_LOADER,
      payload: false,
    });
  }
}

function* sendGiftPointsToUser(obj) {
  const { ToUserId, Points } = obj.payload;
  yield put({
    type: types.BUTTON_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/SendGift?ToUserId=${ToUserId}&Points=${Points}`,
      null,
      "POST"
    );
    if (response?.status == 200) {
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
      Toast.show("Gift Points Send Successfully ", Toast.LONG);
      navigationRef.current?.goBack();
    } else {
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: types.BUTTON_LOADER,
      payload: false,
    });
  }
}

function* getNearbyHotspotList() {
  const state = yield select();
  try {
    yield put({
      type: types.PROFILE_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/GetNearByHotSpotList?lat=${state?.authReducer?.userCurrentLocation?.latitude}&long=${state?.authReducer?.userCurrentLocation?.longitude}`,
      null,
      "GET"
    );

    if (response?.status == 200) {
      yield put({
        type: types.REDUCER_NEARBY_HOTSPOT_LIST,
        payload: response?.result?.data,
      });
      yield put({
        type: types.PROFILE_LOADER,
        payload: false,
      });
    } else if (response?.status == 404) {
      yield put({
        type: types.REDUCER_NEARBY_HOTSPOT_LIST,
        payload: null,
      });

      yield put({
        type: types.PROFILE_LOADER,
        payload: false,
      });
    } else {
      yield put({
        type: types.PROFILE_LOADER,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: types.PROFILE_LOADER,
      payload: false,
    });
  }
}

function* getListOfSpecificUserForHotspot(obj) {
  const { payload } = obj;
  try {
    yield put({
      type: types.BUTTON_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/GetListOfSpecificUsersForHotSpot?isFriend=${payload}`,
      null,
      "GET"
    );

    if (response?.status == 200) {
      yield put({
        type: types.REDUCER_LIST_OF_SPECIFIC_USERS_FOR_HOTSPOT,
        payload: response?.result?.data,
      });
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    } else if (response?.status == 404) {
      yield put({
        type: types.REDUCER_LIST_OF_SPECIFIC_USERS_FOR_HOTSPOT,
        payload: response,
      });
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    } else {
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: types.BUTTON_LOADER,
      payload: false,
    });
  }
}

function* readNotification(obj) {
  const { payload } = obj;
  try {
    yield put({
      type: types.BUTTON_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/ReadNotifications?NotificationId=${payload}`,
      null,
      "PUT"
    );
  } catch (error) {
    yield put({
      type: types.BUTTON_LOADER,
      payload: false,
    });
  }
}

export function* DashboardSaga() {
  yield takeLatest(types.FEED_LIST, getFeedList);
  yield takeLatest(types.GET_HUNT_DATA, getHuntData);
  yield takeLatest(types.GET_VERIFYING_DATA, getVerifyingData);
  yield takeLatest(types.CREATE_HUNT, createHunt);
  yield takeLatest(types.GET_HOTSPOT_LIST, getHotspotList);
  yield takeLatest(types.SUBMIT_VERIFY, submitVerify);
  yield takeLatest(types.GET_MARKETPLACES_API, marketplacesList);
  yield takeLatest(types.GET_MARKET_PLACE_DETAILS, marketplacesDetails);
  yield takeLatest(types.TRASH_TYPE, getTrashType);
  yield takeLatest(types.GET_REVIEW_LIST, getReviewList);
  yield takeLatest(types.POST_REVIEW_LIST, postReview);
  yield takeLatest(types.GET_USER_BALANCE_POINTS, getUserBalancePoints);
  yield takeLatest(types.POST_SEND_GIFT_POINT_TO_USER, sendGiftPointsToUser);
  yield takeLatest(types.GET_NEARBY_HOTSPOT_LIST, getNearbyHotspotList);
  yield takeLatest(types.POST_BUY_VOUCHER, postBuyVoucher);
  yield takeLatest(types.GET_LIST_OF_SPECIFIC_USERS_FOR_HOTSPOT, getListOfSpecificUserForHotspot);
  yield takeLatest(types.PUT_READ_NOTIFICATION, readNotification);
}
