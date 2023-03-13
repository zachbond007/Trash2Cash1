import { types } from '../action/ActionType';
const INITIAL_STATE = {
  partnerHotspotList: [],
  buttonLoader: false,
  partnerVoucherList: [],
  partnerUsedVoucherList: [],
  partnerNewVoucherList: [],
  subscriptionList: null,
  hotspotHunterList: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types?.GET_PARTNER_HOTSPOT_LIST:
      return { ...state, partnerHotspotList: action?.payload?.data?.data }
    case types?.BUTTON_LOADER:
      return { ...state, buttonLoader: action?.payload }
    case types?.REDUCER_VOUCHER_LIST_PARTNER:
      return { ...state, partnerVoucherList: action?.payload }
    case types?.REDUCER_SUBSCRIPTION_LIST:
      return { ...state, subscriptionList: action?.payload }
    case types?.REDUCER_HOTSPOT_HUNTERS_LIST:
      return { ...state, hotspotHunterList: action?.payload }
    case types?.REDUCER_USED_VOUCHER_LIST_PARTNER:
      return { ...state, partnerUsedVoucherList: action?.payload }
    case types?.REDUCER_NEW_VOUCHER_LIST_PARTNER:
      return { ...state, partnerNewVoucherList: action?.payload }
    default:
      return state;
  }
};
