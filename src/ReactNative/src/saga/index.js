import { all, fork } from 'redux-saga/effects';
import { DashboardSaga } from './DashboardSaga';
import { AuthSaga } from './AuthSaga';
import { PartnerSaga } from './PartnerSaga';
import { UserSaga } from './UserSaga';

// Redux Saga: Root Saga
export function* rootSaga() {
    yield all([
        fork(DashboardSaga),
        fork(AuthSaga),
        fork(PartnerSaga),
        fork(UserSaga)
    ]);
};