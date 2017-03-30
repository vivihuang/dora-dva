import { createAction, wrapNamespaceToActions } from '../utils/actionsHelper'

export const NAMESPACE = 'auth'

export const wrapNamespace = wrapNamespaceToActions(NAMESPACE)

export const authSucceed = createAction('authSucceed', token => ({ token }))

export const authFailed = createAction('authFailed', error => ({ error }))

export const removeToken = createAction('removeToken')

export const checkAuth = createAction('checkAuth', auth => ({ auth }))

export const login = createAction('login', values => ({ values }))

export const logout = createAction('logout')
