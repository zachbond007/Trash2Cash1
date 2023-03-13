// Third Party
import { showMessage } from "react-native-flash-message";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { takeLatest, put, call, select, delay } from "redux-saga/effects";

// Constants
import { types } from "../action/ActionType";
import { serviceUrl } from "../constant/serviceURL";
import NavigationService from "../routing/NavigationService";
import { apiCall, uploadFileToAzure } from "..//utils/utility";

// one-tiime walk-through-User
function* setFirstTimeOpen(value) {
  yield put({
    type: types.REDUCER_APP_FIRST_OPEN,
    payload: value.payload,
  });
}
// one-tiime walk-through-Partner
function* setFirstTimeOpenPartner(value) {
  yield put({
    type: types.REDUCER_APP_FIRST_OPEN_PARTNER,
    payload: value.payload,
  });
}

// user login API
function* userLogin(obj) {
  let { payload } = obj;
  try {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}user/login`,
      payload?.body,
      "POST"
    );
    if (response.status == 200) {
      yield put({
        type: types?.SAVE_LOGGED_IN_USER_DATA,
        payload: { data: response?.result },
      });
      AsyncStorageLib.setItem("Token", response.result?.accessToken);
      AsyncStorageLib.setItem("RefreshToken", response.result?.refreshToken);

      yield put({
        type: types.CHECK_SESSION,
        payload: true,
      });

      yield put({
        type: types.USER_DETAILS,
      });

      delay(1000);

      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
    } else {
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      showMessage({
        message: response.result?.message,
        type: "danger",
      });
      if (response?.result?.message === "Email verification is pending.") {
        alert(
          "We have sent you a verification link on your mail. Please verify your email first"
        );
      }
    }
  } catch (error) {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: false,
    });
  }
}

// user signup API
function* userSignup(obj) {
  let { payload } = obj;
  try {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}user/sign-up`,
      payload?.body,
      "POST"
    );

    if (response?.result?.success) {
      yield put({
        type: types?.SAVE_LOGGED_IN_USER_DATA,
        payload: { data: response?.result },
      });

      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      alert(
        "We have sent you a verification link on your mail. Please verify your email first"
      );
      showMessage({
        message: "Account created successfully!",
        type: "success",
      });
      NavigationService.goBack();
    } else {
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      showMessage({
        message: response.result?.message,
        type: "danger",
      });
    }
  } catch (error) {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: false,
    });
  }
}

// user signup API
function* partnerSignup(obj) {
  let { payload } = obj;
  try {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: true,
    });
    let profileImage = yield call(
      uploadFileToAzure,
      payload?.profile,
      "bussinessimage"
    );

    let newBody = JSON.stringify(payload?.body);
    let newBody1 = JSON.parse(newBody);
    newBody1["business_pic"] = profileImage || "";
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/Partner-Sign-up`,
      newBody1,
      "POST"
    );

    if (response.result?.success) {
      NavigationService.navigate("SignupConfirmation");

      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      yield put({
        type: types.UPDATE_BUSINESS_ADDRESS,
        payload: { location: "" },
      });
    } else {
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      showMessage({
        message: response.result?.message,
        type: "danger",
      });
    }
  } catch (error) {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: false,
    });
  }
}

// user logout API
function* userLogout() {
  try {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/Logout`,
      null,
      "GET"
    );
    if (response.status == 200) {
      AsyncStorageLib.setItem("Token", "");
      AsyncStorageLib.setItem("RefreshToken", "");
      yield put({
        type: types.CHECK_SESSION,
        payload: false,
      });
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      yield put({
        type: types.CLEAR_REDUCER,
      });
    } else {
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      showMessage({
        message: response.result?.data?.message,
        type: "danger",
      });
    }
  } catch (error) {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: false,
    });
  }
}

function* userDeleteAccount() {
  try {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/Delete`,
      null,
      "PUT"
    );
    if (response.status == 200) {
      AsyncStorageLib.setItem("Token", "");
      AsyncStorageLib.setItem("RefreshToken", "");
      yield put({
        type: types.CHECK_SESSION,
        payload: false,
      });
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      yield put({
        type: types.CLEAR_REDUCER,
      });
    } else {
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      showMessage({
        message: response.result?.data?.message,
        type: "danger",
      });
    }
  } catch (error) {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: false,
    });
  }
}

// user details
function* userDetails() {
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/get-user-details`,
      null,
      "GET"
    );
    if (response.status == 200) {
      yield put({
        type: types.SAVE_USER_DETAILS,
        payload: { data: response?.result },
      });
    } else {
    }
  } catch (error) {
  }
}

function* socialMediaSignIn(obj) {
  let { payload } = obj;

  try {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/SocialMediaLogin`,
      payload?.body,
      "POST"
    );
    if (response.status == 200) {
      yield put({
        type: types?.SAVE_LOGGED_IN_USER_DATA,
        payload: { data: response?.result },
      });
      AsyncStorageLib.setItem("Token", response.result?.accessToken);
      AsyncStorageLib.setItem("RefreshToken", response.result?.refreshToken);

      yield put({
        type: types.CHECK_SESSION,
        payload: true,
      });

      yield put({
        type: types.USER_DETAILS,
      });

      delay(1000);

      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
    } else {
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      showMessage({
        message: response.result?.data?.message,
        type: "danger",
      });
    }
  } catch (error) {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: false,
    });
  }
}
// notification list
function* getNotificationList({ payload }) {
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/GetNotificationList?pageNo=${payload.pageNo}&pageSize=${payload.pageSize}`,
      null,
      "GET"
    );
    if (response.status == 200) {
      yield put({
        type: types.SAVE_NOTIFICATION_LIST,
        payload: { data: response?.result?.data },
      });
    } else {
    }
  } catch (error) {
  }
}

function* changePasswordApi(obj) {
  let { payload } = obj;
  try {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/ChangePassword`,
      payload?.body,
      "PUT"
    );
    if (response.status == 200) {
      showMessage({
        message: response.result?.message,
        type: "success",
      });
      NavigationService?.goBack();
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
    } else {
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      showMessage({
        message: response.result?.message,
        type: "success",
      });
    }
  } catch (error) {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: false,
    });
  }
}

function* updateUserProfileApi(obj) {
  let { payload } = obj;

  try {
    yield put({
      type: types.PROFILE_LOADER,
      payload: true,
    });

    let body = payload?.body;

    if (payload?.body?.profile) {
      let profileImage = yield call(
        uploadFileToAzure,
        payload?.body?.profile,
        "userprofileimage"
      );
      if (profileImage) {
        body["profile_pic"] = profileImage;
      }
    }

    if (payload?.body?.is_current_location) {
      body["is_current_location"] = payload?.body?.is_current_location || 0;
    }

    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/UpdateUserProfile`,
      body,
      "PUT"
    );
    if (response.status == 200) {
      yield put({
        type: types.USER_DETAILS,
      });
      yield put({
        type: types.PROFILE_LOADER,
        payload: false,
      });
      NavigationService.navigate("Profile");
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

function* getPartnerUserDetails() {
  try {
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}Partner/GetPartnerDetails`,
      null,
      "GET"
    );
    if (response.status == 200) {
      yield put({
        type: types.SAVE_PARTNER_USER_DETAILS,
        payload: { data: response?.result },
      });
    }
  } catch (error) {
    yield put({
      type: types.PROFILE_LOADER,
      payload: false,
    });
  }
}

function* userEmailVerification(obj) {
  let { payload } = obj;
  yield put({
    type: types.REGISTRATION_LOADER,
    payload: true,
  });
  try {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: true,
    });

    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/ForgotPassword`,
      payload.body,
      "PUT"
    );
    if (response.result?.success) {
      showMessage({
        message: response.result?.message,
        type: "success",
      });
      NavigationService?.navigate("OTPVerification", {
        email: payload?.body?.email,
      });
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      NavigationService.navigate("OTPVerification", {
        email: payload?.body?.email,
      });
    } else {
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      showMessage({
        message: response.result?.message,
        type: "danger",
      });
    }
  } catch (error) {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: false,
    });
  }
}

// new password
function* createNewPassword(obj) {
  let { payload } = obj;
  const state = yield select();

  try {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/ResetPassword`,
      payload?.body,
      "PUT"
    );
    if (response?.result?.success) {
      showMessage({
        message: response.result?.message,
        type: "success",
      });

      if (state?.homeReducer?.loginType == "USER") {
        NavigationService?.navigate("Login");
      } else {
        NavigationService?.navigate("PartnerLogin");
      }
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
    } else {
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      showMessage({
        message: response.result?.message,
        type: "success",
      });
    }
  } catch (error) {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: false,
    });
  }
}

// new password
function* otpVerifyAPi(obj) {
  let { payload } = obj;
  try {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: true,
    });
    let response = yield call(
      apiCall,
      `${serviceUrl.baseUrl}User/VerifyForgetPasswordOTP`,
      payload?.body,
      "POST"
    );
    if (response.result?.success) {
      showMessage({
        message: response.result?.message,
        type: "success",
      });
      NavigationService?.navigate("CreateNewPassword", { body: payload?.body });
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
    } else {
      yield put({
        type: types.REGISTRATION_LOADER,
        payload: false,
      });
      showMessage({
        message: response.result?.message,
        type: "danger",
      });
    }
  } catch (error) {
    yield put({
      type: types.REGISTRATION_LOADER,
      payload: false,
    });
  }
}

function* fetchFacebookFriends() {
  FB.api("/me/friends", function (response) {
    if (response && !response.error) {
      /* handle the result */
    }
  });
}
export function* AuthSaga() {
  yield takeLatest(types.SET_APP_FIRST_OPEN, setFirstTimeOpen);
  yield takeLatest(types.SET_APP_FIRST_OPEN_PARTNER, setFirstTimeOpenPartner);
  yield takeLatest(types.USER_LOGIN, userLogin);
  yield takeLatest(types.USER_SIGNUP, userSignup);
  yield takeLatest(types.PARTNER_SIGNUP, partnerSignup);
  yield takeLatest(types.USER_LOGOUT, userLogout);
  yield takeLatest(types.USER_DELETE_ACCOUNT, userDeleteAccount);
  yield takeLatest(types.USER_DETAILS, userDetails);
  yield takeLatest(types.SOCIAL_MEDIA_SIGNIN, socialMediaSignIn);
  yield takeLatest(types.GET_NOTIFICATION_LIST, getNotificationList);
  yield takeLatest(types.CHANGE_PASSWORD_API, changePasswordApi);
  yield takeLatest(types.UPDATE_USER_PROFILE, updateUserProfileApi);
  yield takeLatest(types.GET_PARTNER_DETAILS, getPartnerUserDetails);
  yield takeLatest(types.CREATE_NEW_PASSWORD, createNewPassword);
  yield takeLatest(types.OTP_VERIFY_API, otpVerifyAPi);

  yield takeLatest(types.USER_EMAIL_VERIFICATION, userEmailVerification);
  yield takeLatest(types.GET_FACEBOOK_FRIENDS, fetchFacebookFriends);
}
