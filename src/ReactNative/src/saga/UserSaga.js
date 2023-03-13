import { takeLatest, put, call } from "redux-saga/effects";

// Third Party
import Toast from "react-native-simple-toast";

// Constants
import { types } from "../action/ActionType";
import { serviceUrl } from "../constant/serviceURL";
import { apiCall } from "..//utils/utility";
import { navigationRef } from "../routing/NavigationService";

function* getPointsHistory({ payload }) {
    try {
        yield put({
            type: types.REGISTRATION_LOADER,
            payload: true,
        });
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/PointsHistory?pageNo=${payload.pageNo}&pageSize=${payload.pageSize}`,
            null,
            "GET"
        );
        if (response.status === 200) {
            yield put({
                type: types.REDUCER_POINTS_HISTORY,
                payload: response?.result,
            });
            yield put({
                type: types.SET_POINTS_HISTORY_LIST,
                payload: response?.result?.data,
            });
            yield put({
                type: types.REGISTRATION_LOADER,
                payload: false,
            });
        } else {
            yield put({
                type: types.REGISTRATION_LOADER,
                payload: false,
            });
        }
    } catch (error) {
        yield put({
            type: types.REGISTRATION_LOADER,
            payload: false,
        });
    }
}

function* getPointsBoosted({ payload }) {
    try {
        yield put({
            type: types.REGISTRATION_LOADER,
            payload: true,
        });
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/BoostDetailList?pageNo=${payload?.pageNo}&pageSize=${payload?.pageSize}`,
            null,
            "GET"
        );
        if (response.status === 200) {
            yield put({
                type: types.REDUCER_BOOST_DETAIL_LIST,
                payload: response?.result?.data,
            });
        } else if (response.status === 404) {
            yield put({
                type: types.REDUCER_BOOST_DETAIL_LIST,
                payload: null,
            });
        } else {
            Toast.show("Something went wrong!", Toast.LONG);
        }
    } catch (error) {
        yield put({
            type: types.REGISTRATION_LOADER,
            payload: false,
        });
    }
}
// postPointsBoosted
function* postPointsBoosted(payload) {
    try {
        yield put({
            type: types.BUTTON_LOADER,
            payload: true,
        });
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/UserBoostDetail?pointHistoryId=${payload?.payload}`,
            null,
            "POST"
        );
        if (response.status === 200) {
            Toast.show(response?.result?.message, Toast.LONG);
            yield put({
                type: types?.GET_BOOST_DETAIL_LIST,
                payload: { pageNo: 1, pageSize: 10 }
            });
        } else {
            Toast.show("ERROR", Toast.LONG);
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


function* upgradeToProUser(obj) {
    const { payload } = obj;
    yield put({
        type: types.REGISTRATION_LOADER,
        payload: true,
    });
    try {
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/UpgradeToProUser?SubscriptionId=${payload.subscriptionId}`,
            payload.body,
            "PUT"
        );
        if (response?.status == 200) {
            Toast.show("Your profile upgraded to premium", Toast.LONG);
            yield put({
                type: types?.GET_USER_CURRENT_PLAN,
            });
        } else {
            Toast.show(response?.result?.message, Toast.LONG);
        }
        yield put({
            type: types.REGISTRATION_LOADER,
            payload: false,
        });
    } catch (error) {
        yield put({
            type: types.REGISTRATION_LOADER,
            payload: false,
        });
    }
}

function* validatingPlan(obj) {
    const { payload } = obj;
    yield put({
        type: types.REGISTRATION_LOADER,
        payload: true,
    });
    try {
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}Partners/BuySubscription?SubscriptionId=${payload.subscriptionId}`,
            payload.body,
            "POST"
        );
        if (response?.status == 200) {
            Toast.show("Your profile upgraded to premium", Toast.LONG);
            yield put({
                type: types?.GET_USER_CURRENT_PLAN,
            });
        } else {
            Toast.show(response?.result?.message, Toast.LONG);
        }
        yield put({
            type: types.REGISTRATION_LOADER,
            payload: false,
        });
    } catch (error) {
        yield put({
            type: types.REGISTRATION_LOADER,
            payload: false,
        });
    }
}

function* getUserCurrentPlan() {
    try {
        yield put({
            type: types.REGISTRATION_LOADER,
            payload: true,
        });
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/GetCurrentPlan`,
            null,
            "GET"
        );
        if (response?.status == 200) {
            yield put({
                type: types.REDUCER_USER_CURRENT_PLAN,
                payload: response?.result,
            });
            yield put({
                type: types.REGISTRATION_LOADER,
                payload: false,
            });
        }
    } catch (error) {
        yield put({
            type: types.REGISTRATION_LOADER,
            payload: false,
        });
    }
}

function* attendHotspot(obj) {
    const { payload } = obj;
    try {
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/AttendEventsRsvp?HotspotId=${payload}`,
            null,
            "POST"
        );
        if (response?.status == 200) {
            Toast.show(response?.result?.message, Toast.LONG);
            navigationRef.current.goBack();
        } else {
            navigationRef.current.goBack();
        }
    } catch (error) {
    }
}

// Friends API
function* getFriendList() {
    try {
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/GetFriendList`,
            null,
            "GET"
        );
        yield put({
            type: types.REDUCER_FRIEND_LIST,
            payload: response?.result,
        });
        yield put({
            type: types.BUTTON_LOADER,
            payload: false,
        });
    } catch (error) {
    }
}

function* unfriendFriend(obj) {
    let friendId = obj.payload;
    try {
        yield put({
            type: types.BUTTON_LOADER,
            payload: true,
        });
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/Unfriend?userFriendId=${friendId}`,
            null,
            "PUT"
        );
        if (response?.status === 200) {
            if (response?.result?.status === 1)
                Toast.show("Removed Firend", Toast.LONG);
            yield put({
                type: types.GET_FRIEND_LIST,
            });
        } else {
            Toast.show("Try again", Toast.LONG);
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

function* acceptRejectRequest(obj) {
    try {
        yield put({
            type: types.BUTTON_LOADER,
            payload: true,
        });
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/AcceptFriendRequest?requester=${obj.payload.friendId}&status=${obj.payload.requestKey}`,
            null,
            "PUT"
        );
        if (response?.status === 200) {
            if (response?.result?.status === 1)
                Toast.show("Request accepted ", Toast.LONG);
            yield put({
                type: types?.GET_REQUEST_FRIEND_LIST,
            });
        } else {
            Toast.show("Request rejected ", Toast.LONG);
            yield put({
                type: types?.GET_REQUEST_FRIEND_LIST,
            });
        }
    } catch (error) {
    }
}

function* getRequestFriendList() {
    try {
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/RequestList?Status=0`,
            null,
            "GET"
        );
        yield put({
            type: types.REDUCER_REQUEST_FRIEND_LIST,
            payload: response?.result?.friendRequests,
        });
        yield put({
            type: types.BUTTON_LOADER,
            payload: false,
        });
    } catch (error) {
    }
}


function* getRecommendedFriends() {
    try {
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/FriendRecommendationList?pageNo=1&pageSize=100`,
            null,
            "GET"
        );
        if (response.status === 200) {
            yield put({
                type: types.REDUCER_RECOMMENDATION_FRIEND_LIST,
                payload: response?.result?.recommendations,
            });
        }
        yield put({
            type: types.BUTTON_LOADER,
            payload: false,
        });
    } catch (error) {
    }
}

function* sendFriendRequest(payload) {
    try {
        yield put({
            type: types.BUTTON_LOADER,
            payload: true,
        });
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/SendFriendRequest?FriendId=${payload.payload}`,
            null,
            "POST"
        );
        if (response.status === 200) {
            Toast.show(response?.result?.message, Toast.LONG);
            yield put({
                type: types?.GET_RECOMMENDATION_FRIEND_LIST,
            });
        } else {
            Toast.show("ERROR", Toast.LONG);
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


function* putRedeemVoucher(payload) {
    try {
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/RedeemVoucher`,
            payload.payload,
            "PUT"
        );
        if (response.status === 200) {
            Toast.show(response?.result?.message, Toast.LONG);
        } else {
            Toast.show(response?.result?.message, Toast.LONG);
        }
    } catch (error) {
    }
}

function* getHuntQuestions(obj) {
    const { payload } = obj;
    try {
        yield put({
            type: types.REGISTRATION_LOADER,
            payload: true,
        });
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}Hunt/HuntQuestions?HuntId=${payload}`
        );
        if (response?.status == 200) {
            yield put({
                type: types.REDUCER_HUNT_QUESTIONS,
                payload: response?.result?.questions,
            });
            yield put({
                type: types.REGISTRATION_LOADER,
                payload: false,
            });
        } else {
            yield put({
                type: types.REGISTRATION_LOADER,
                payload: false,
            });
        }
    } catch (error) {
        yield put({
            type: types.REGISTRATION_LOADER,
            payload: false,
        });
    }
}

function* shareVoucherPoints(obj) {
    let { payload } = obj;

    yield put({
        type: types.BUTTON_LOADER,
        payload: true,
    });

    try {
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/ShareVoucher`,
            payload,
            "POST"
        );
        if (response.status == 200) {
            yield put({
                type: types.BUTTON_LOADER,
                payload: false,
            });

            yield put({
                type: types?.GET_VERIFYING_DATA,
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

function* getFriendHotspotList(obj) {
    const { payload } = obj;
    try {
        yield put({
            type: types.BUTTON_LOADER,
            payload: true,
        });
        let response = yield call(
            apiCall,
            `${serviceUrl.baseUrl}User/GetListOfSpecificUsersForHotSpot?pageNo=1&pageSize=100&isFriend=${payload}`,
            null,
            "GET"
        );
        if (response?.status == 200) {
            yield put({
                type: types.REDUCER_FRIEND_HOTSPOT_LIST,
                payload: response?.result?.data,
            });
            yield put({
                type: types.BUTTON_LOADER,
                payload: false,
            });
        } else if (response?.status == 404) {
            yield put({
                type: types.REDUCER_FRIEND_HOTSPOT_LIST,
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

export function* UserSaga() {
    yield takeLatest(types.GET_POINTS_HISTORY, getPointsHistory);
    yield takeLatest(types.GET_BOOST_DETAIL_LIST, getPointsBoosted);
    yield takeLatest(types.POST_BOOST_DETAIL_LIST, postPointsBoosted);
    yield takeLatest(types.PUT_UPGRADE_TO_PRO_USER, upgradeToProUser);
    yield takeLatest(types.POST_VALIDATE_PLAN, validatingPlan);
    yield takeLatest(types.GET_USER_CURRENT_PLAN, getUserCurrentPlan);
    yield takeLatest(types.POST_ATTEND_HOTSPOT, attendHotspot);
    yield takeLatest(types.GET_FRIEND_LIST, getFriendList);
    yield takeLatest(types.POST_UNFRIEND_FRIEND, unfriendFriend);
    yield takeLatest(types.POST_ACCEPT_FRIEND_REQUEST, acceptRejectRequest);
    yield takeLatest(types.GET_REQUEST_FRIEND_LIST, getRequestFriendList);
    yield takeLatest(types.GET_RECOMMENDATION_FRIEND_LIST, getRecommendedFriends);
    yield takeLatest(types.POST_SEND_FRIEND_REQUEST, sendFriendRequest);
    yield takeLatest(types.PUT_REDEEM_VOUCHER, putRedeemVoucher);
    yield takeLatest(types.GET_HUNT_QUESTIONS, getHuntQuestions);
    yield takeLatest(types.POST_SHARE_VOUCHER_POINTS, shareVoucherPoints);
    yield takeLatest(types.GET_FRIEND_HOTSPOT_LIST, getFriendHotspotList);
}