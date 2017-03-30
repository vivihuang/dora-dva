import { routerRedux } from 'dva/router'
import { handleActions } from '../utils/actionsHelper'
import * as authService from '../services/auth'
import * as authActions from '../actions/auth'

export default {
  namespace: authActions.NAMESPACE,
  state: {
    token: null,
    error: null
  },
  reducers: handleActions((on) => {
    on(authActions.authSucceed, (state, action) => {
      const { token } = action.payload
      return { ...state, token, error: null }
    })
    on(authActions.authFailed, (state, action) => {
      const { error } = action.payload
      return { ...state, token: null, error }
    })
    on(authActions.removeToken, state => ({ ...state, token: null }))
  }),
  effects: handleActions((on) => {
    on(authActions.checkAuth, function* (action, { select, put }) {
      const { auth } = action.payload
      const token = yield select(state => state.auth.token)
      if (token && !auth) {
        yield put(routerRedux.push('/'))
      } else if (!token && auth) {
        yield put(routerRedux.push('/login'))
      }
    })
    on(authActions.login, function* (action, { call, put }) {
      const { values } = action.payload
      const { data } = yield call(authService.login, values)
      if (data instanceof Error) {
        yield put(authActions.authFailed(null, data.message))
      } else if (data.token) {
        yield put(authActions.authSucceed(null, data.token))
        yield put(routerRedux.push('/'))
      }
    })
    on(authActions.logout, function* (action, { put }) {
      yield put(authActions.removeToken())
      yield put(routerRedux.push('/login'))
    })
  }),
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const auth = pathname !== '/login'
        dispatch(authActions.checkAuth(null, auth))
      })
    }
  }
}
