import test from 'ava'
import values from 'lodash/values'
import { createAction, wrapNamespaceToActions, handleActions } from './actionsHelper'

const NAMESPACE = 'test'
const actionName = 'firstAction'
const payloadContent = { title: 'firstTest', content: 'testContent' }

const wrapNamespace = wrapNamespaceToActions(NAMESPACE)

let uniqueId = 0

test.beforeEach(() => { uniqueId += 1 })

test('should return action as an object with type when action has no payload', (t) => {
  const testAction = createAction(actionName)
  const actual = testAction()
  const expected = { type: `${uniqueId}-ACTION-${actionName}`, payload: undefined, meta: undefined }
  t.deepEqual(actual, expected)
})

test('should return action as an object with type and payload', (t) => {
  const testAction = createAction(actionName, (title, content) => ({ title, content }))
  const actual = testAction(null, payloadContent.title, payloadContent.content)
  const expected = { type: `${uniqueId}-ACTION-${actionName}`, payload: payloadContent, meta: values(payloadContent) }
  t.deepEqual(actual, expected)
})

test('should return action with namespace', (t) => {
  const testAction = createAction(actionName, (title, content) => ({ title, content }))
  const actual = wrapNamespace(testAction, payloadContent.title, payloadContent.content)
  const expected = { type: `${NAMESPACE}/${uniqueId}-ACTION-${actionName}`, payload: payloadContent, meta: values(payloadContent) }
  t.deepEqual(actual, expected)
})

test('should return action handle method object when called handleActions method', (t) => {
  const testAction = createAction(actionName)
  const testActionFunc = (state, action) => {
    const data = action.payload
    return { ...state, ...data }
  }
  const actual = handleActions((on) => {
    on(testAction, testActionFunc)
  })
  const expected = {
    [testAction().type]: testActionFunc
  }
  t.deepEqual(actual, expected)
})

test('should return action handle methods as object when called handleActions method', (t) => {
  const testAction1 = createAction(actionName)
  const testAction1Func = (state, action) => {
    const data = action.payload
    return { ...state, ...data }
  }
  const testAction2 = createAction('secondAction')
  const testAction2Func = (state, action) => state
  const actual = handleActions((on) => {
    on(testAction1, testAction1Func)
    on(testAction2, testAction2Func)
  })
  const expected = {
    [testAction1().type]: testAction1Func,
    [testAction2().type]: testAction2Func
  }
  t.deepEqual(actual, expected)
})
