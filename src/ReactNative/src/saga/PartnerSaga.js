import { takeLatest, put, call, select } from "redux-saga/effects";


// Third Party
import Toast from "react-native-simple-toast";
import { showMessage } from "react-native-flash-message";


// Constants
import { types } from "../action/ActionType";
import { serviceUrl } from "../constant/serviceURL";
import { apiCall, uploadFileToAzure } from "..//utils/utility";
import NavigationService, { navigationRef } from "../routing/NavigationService";


function* createHotspot(obj) {
  let { payload } = obj;
  yield put({
    type: types.BUTTON_LOADER,
    payload: true,
  });

  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partners/SubmitHotSpot`,
      payload,
      "POST"
    );
    if (response.status == 200) {
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
      Toast.show("Trash Hotspot Created Successfully", Toast.LONG);

      yield put({
        type: types.UPDATE_HOTSPOT_ADDRESS,
        payload: { location: "" },
      });

      yield put({
        type: types?.PARTNER_HOTSPOT_LIST,
      });

      NavigationService.navigate("PartnerDashboard");
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

function* partnerHotspotList() {
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/PartnerHotSpotList?lat=144.22562&long=251.25552&pageNo=1&pageSize=10`,
      null,
      "GET"
    );
    if (response.status == 200) {
      yield put({
        type: types.GET_PARTNER_HOTSPOT_LIST,
        payload: { data: response?.result },
      });
    } else {
    }
  } catch (error) {
  }
}

function* updatePartnerProfileApi(obj) {
  let { payload } = obj;
  try {
    yield put({
      type: types.PROFILE_LOADER,
      payload: true,
    });

    let body = payload?.body;

    if (payload?.profile) {
      let profileImage = yield call(
        uploadFileToAzure,
        payload?.profile,
        "userprofileimage"
      );
      body["profile_pic"] = profileImage;
    }

    if (payload?.businessProfile) {
      let profileImage = yield call(
        uploadFileToAzure,
        payload?.businessProfile,
        "bussinessimage"
      );
      body["business_pic"] = profileImage;
    }

    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/UpdatePartnerProfile`,
      body,
      "PUT"
    );
    if (response.status == 200) {
      yield put({
        type: types.GET_PARTNER_DETAILS,
      });
      yield put({
        type: types.PROFILE_LOADER,
        payload: false,
      });

      if (payload?.profile) {
        NavigationService.navigate("PartnerProfile");
        yield put({
          type: types.PROFILE_LOADER,
          payload: false,
        });
      } else {
        NavigationService.navigate("PartnerBusinessProfile");
        yield put({
          type: types.PROFILE_LOADER,
          payload: false,
        });
      }
      showMessage({
        message: response.result?.message,
        type: "success",
      });
    } else {
      yield put({
        type: types.PROFILE_LOADER,
        payload: false,
      });
      showMessage({
        message: response.result?.message,
        type: "success",
      });
    }
  } catch (error) {
    yield put({
      type: types.PROFILE_LOADER,
      payload: false,
    });
  }
}

function* updateHotspot(obj) {
  let { payload } = obj;
  yield put({
    type: types.BUTTON_LOADER,
    payload: true,
  });

  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/UpdatePartnerHotspot`,
      payload,
      "PUT"
    );
    if (response.status == 200) {
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
      yield put({
        type: types.UPDATE_HOTSPOT_ADDRESS,
        payload: { location: "" },
      });
      showMessage({
        message: response.result?.message,
        type: "success",
      });

      yield put({
        type: types?.PARTNER_HOTSPOT_LIST,
      });

      NavigationService.navigate("PartnerDashboard");
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

function* deletePartnerHotspot(obj) {
  let { payload } = obj;
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/DeletePartnerHotspot`,
      payload,
      "PUT"
    );
    if (response.status == 200) {
      showMessage({
        message: response.result?.message,
        type: "success",
      });

      yield put({
        type: types?.PARTNER_HOTSPOT_LIST,
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

function* postCreateVoucher(obj) {
  const payload = obj.payload;
  yield put({
    type: types.BUTTON_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/SubmitVoucher`,
      payload,
      "POST"
    );
    if (response.status == 200) {
      showMessage({
        message: response.result?.message,
        type: "success",
      });
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
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

function* putEditVoucher(obj) {
  const payload = obj.payload;
  yield put({
    type: types.BUTTON_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/EditVoucher`,
      payload,
      "PUT"
    );
    if (response.status == 200) {
      showMessage({
        message: response.result?.message,
        type: "success",
      });
      yield put({
        type: types.BUTTON_LOADER,
        payload: false,
      });
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

function* getVoucherListPartner(obj) {
  const { payload } = obj;

  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/VoucherList?MyVoucher=${payload}`,
      null,
      "GET"
    );
    if (response?.status == 200) {
      if (payload === 0) {
        yield put({
          type: types?.REDUCER_VOUCHER_LIST_PARTNER,
          payload: response?.result?.vouchers,
        });
      } else if (payload === 3) {
        yield put({
          type: types?.REDUCER_USED_VOUCHER_LIST_PARTNER,
          payload: response?.result?.vouchers,
        });
      } else if (payload === 2) {
        yield put({
          type: types?.REDUCER_NEW_VOUCHER_LIST_PARTNER,
          payload: response?.result?.vouchers,
        });
      }
    }
  } catch (error) {
    yield put({
      type: types.BUTTON_LOADER,
      payload: false,
    });
  }
}

function* getSubscriptionList() {
  yield put({
    type: types.BUTTON_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/SubscriptionList`,
      null,
      "GET"
    );
    if (response?.status == 200) {
      yield put({
        type: types.REDUCER_SUBSCRIPTION_LIST,
        payload: response?.result?.subscriptions,
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

function* postBuySubscription(obj) {
  let payload = obj.payload;
  yield put({
    type: types.BUTTON_LOADER,
    payload: true,
  });
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partners/BuySubscription?SubscriptionId=${payload.SubscriptionId}&Amount=${payload.Amount}&ValidTill=${payload.ValidTill}`,
      null,
      "POST"
    );
    if (response?.status == 200) {
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

function* deletePartnerVoucher(obj) {
  let { payload } = obj;
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/DeleteVoucher?IsDeleted=${payload?.is_deleted}&VoucherId=${payload.voucher_id}`,
      null,
      "PUT"
    );
    if (response.status == 200) {
      showMessage({
        message: response.result?.message,
        type: "success",
      });
      yield put({
        type: types?.PARTNER_HOTSPOT_LIST,
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

function* getHotspotHunterList(obj) {
  const { payload } = obj;
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Hunt/HuntersList?HotspotId=${payload}&pageNo=1&pageSize=20`,
      null,
      "GET"
    );
    if (response.status == 200 || 400) {
      yield put({
        type: types?.REDUCER_HOTSPOT_HUNTERS_LIST,
        payload: response?.result?.data,
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

export function* PartnerSaga() {
  yield takeLatest(types.CREATE_HOTSPOT, createHotspot);
  yield takeLatest(types.UPDATE_HOTSPOT, updateHotspot);
  yield takeLatest(types.PARTNER_HOTSPOT_LIST, partnerHotspotList);
  yield takeLatest(types.UPDATE_PARTNER_PROFILE, updatePartnerProfileApi);
  yield takeLatest(types.DELETE_PARTNER_HOTSPOT, deletePartnerHotspot);
  yield takeLatest(types.POST_CREATE_VOUCHER, postCreateVoucher);
  yield takeLatest(types.GET_SUBSCRIPTION_LIST, getSubscriptionList);
  yield takeLatest(types.POST_BUY_SUBSCRIPTION, postBuySubscription);
  yield takeLatest(types.GET_PARTNER_VOUCHER_LIST, getVoucherListPartner);
  yield takeLatest(types.DELETE_PARTNER_VOUCHER, deletePartnerVoucher);
  yield takeLatest(types.PUT_EDIT_VOUCHER, putEditVoucher);
  yield takeLatest(types.GET_HOTSPOT_HUNTERS_LIST, getHotspotHunterList);
}
