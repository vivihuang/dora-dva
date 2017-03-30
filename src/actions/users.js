import { createAction, wrapNamespaceToActions } from '../utils/actionsHelper'

export const NAMESPACE = 'users'

export const wrapNamespace = wrapNamespaceToActions(NAMESPACE)

export const save = createAction('save', (list, total, page) => ({ list, total, page }))

export const fetch = createAction('fetch', page => ({ page }))

export const remove = createAction('remove', id => ({ id }))

export const patch = createAction('patch', (id, values) => ({ id, values }))

export const create = createAction('create', values => ({ values }))

export const reload = createAction('reload')
