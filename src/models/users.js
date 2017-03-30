import { message } from 'antd'
import { handleActions } from '../utils/actionsHelper'
import * as usersService from '../services/users'
import * as usersActions from '../actions/users'

export default {
  namespace: usersActions.NAMESPACE,
  state: {
    list: [],
    total: null,
    page: null
  },
  reducers: handleActions((on) => {
    on(usersActions.save, (state, action) => {
      const { list, total, page } = action.payload
      return { ...state, list, total, page }
    })
  }),
  effects: handleActions((on) => {
    on(usersActions.fetch, function* (action, { call, put }) {
      const { page } = action.payload
      const { data, headers } = yield call(usersService.fetch, page)
      yield put(usersActions.save(null, data, parseInt(headers['x-total-count'], 10), parseInt(page, 10)))
    })
    on(usersActions.remove, function* (action, { call, put }) {
      const { id } = action.payload
      yield call(usersService.remove, id)
      message.success('Delete succeed.')
      yield put(usersActions.reload())
    })
    on(usersActions.patch, function* (action, { call, put }) {
      const { id, values } = action.payload
      yield call(usersService.patch, id, values)
      message.success('Edit succeed.')
      yield put(usersActions.reload())
    })
    on(usersActions.create, function* (action, { call, put }) {
      const { values } = action.payload
      yield call(usersService.create, values)
      message.success('Create succeed.')
      yield put(usersActions.reload())
    })
    on(usersActions.reload, function* (action, { select, put }) {
      const page = yield select(state => state.users.page)
      yield put(usersActions.fetch(null, page))
    })
  }),
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          const { page } = query
          dispatch(usersActions.fetch(null, page || 1))
        }
      })
    }
  }
}
