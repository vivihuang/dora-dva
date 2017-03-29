import { routerRedux } from 'dva/router'
import * as authService from '../services/auth'

export default {
  namespace: 'auth',
  state: {
    token: null,
    error: null
  },
  reducers: {
    authSucceed(state, { payload: { token } }) {
      return { ...state, token, error: null }
    },
    authFailed(state, { payload: { error } }) {
      return { ...state, token: null, error }
    },
    removeToken(state) {
      return { ...state, token: null }
    }
  },
  effects: {
    * checkAuth({ payload: { auth } }, { select, put }) {
      const token = yield select(state => state.auth.token)
      if (token && !auth) {
        yield put(routerRedux.push('/'))
      } else if (!token && auth) {
        yield put(routerRedux.push('/login'))
      }
    },
    * login({ payload: { values } }, { call, put }) {
      const { data } = yield call(authService.login, values)
      if (data instanceof Error) {
        yield put({ type: 'authFailed', payload: { error: data.message } })
      } else if (data.token) {
        yield put({ type: 'authSucceed', payload: { token: data.token } })
        yield put(routerRedux.push('/'))
      }
    },
    * logout(action, { put }) {
      yield put({ type: 'removeToken' })
      yield put(routerRedux.push('/login'))
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
