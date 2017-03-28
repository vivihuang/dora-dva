import { routerRedux } from 'dva/router'
import * as authService from '../services/auth'

export default {
  namespace: 'auth',
  state: {
    token: null
  },
  reducers: {
    authSucceed(state, { payload: { token } }) {
      return { ...state, token }
    },
    authFailed(state) {
      return { ...state, token: null }
    }
  },
  effects: {
    * checkAuth({ payload: { auth } }, { select, put }) {
      const token = yield select(state => state.auth.token)
      if (token && !auth) {
        yield put(routerRedux.push('/'))
      } else if (!token && auth) {
        yield put({ type: 'authFailed' })
        yield put(routerRedux.push('/login'))
      }
    },
    * login({ payload: { values } }, { call, put }) {
      const { data } = yield call(authService.login, values)
      if (data.token) {
        yield put({ type: 'authSucceed', payload: { token: data.token } })
        yield put(routerRedux.push('/'))
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const auth = pathname !== '/login'
        dispatch({ type: 'checkAuth', payload: { auth } })
      })
    }
  }
}
