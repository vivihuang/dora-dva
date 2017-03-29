import uniqueId from 'lodash/uniqueId'
import isFunction from 'lodash/isFunction'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'

const getActionName = (prefix = uniqueId()) => actionName => `${prefix}-ACTION-${actionName}`

const genActionNameWithNamespace = (actionType, args) => {
  const namespace = args[0]
  return (!isEmpty(namespace) && isString(namespace)) ? `${namespace}/${actionType}` : actionType
}

const getActionData = (func, args) => {
  const defaultArg = args.length <= 1 ? args[0] : args
  return isFunction(func) ? func(...args) : defaultArg
}

const createActionFunc = (actionType, payloadCreator, metaCreator) =>
  (...args) => ({
    type: genActionNameWithNamespace(actionType, args),
    payload: getActionData(payloadCreator, args.slice(1)),
    meta: getActionData(metaCreator, args.slice(1))
  })

const functionCreator = func => (actionName, payloadCreator, metaCreator) => {
  const uniqueActionName = getActionName()(actionName)
  const creator = (...args) => func(uniqueActionName, payloadCreator, metaCreator)(...args)
  creator.toString = uniqueActionName
  return creator
}

export const createAction = (actionName, payloadCreator, metaCreator) =>
  functionCreator(createActionFunc)(actionName, payloadCreator, metaCreator)

export const handleActions = (actionFunction) => {
  const handlers = {}

  const actionName = actionCreator => (
    (isFunction(actionCreator) && actionCreator.toString)
      ? actionCreator.toString
      : actionCreator)

  const mergeHandlers = (actionName, handler) =>
    Object.assign(handlers, {
      [actionName]: handler
    })

  const on = (actionCreator, handler) => {
    mergeHandlers(actionName(actionCreator), handler)
  }

  actionFunction(on)

  return handlers
}

export const wrapNamespaceToActions = namespace => (...args) => {
  const actionFunc = args[0]
  if (actionFunc && isFunction(actionFunc)) {
    const payload = args.length > 1 ? args.slice(1) : null
    return isEmpty(payload) ? actionFunc(namespace) : actionFunc(namespace, ...payload)
  }
  return null
}
