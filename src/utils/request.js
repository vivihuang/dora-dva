import fetch from 'dva/fetch'
import ErrorCode from '../constants/ErrorCode'

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }

  return response.text().then((text) => {
    const error = text ? JSON.parse(text) : null
    const errorCode = error || ErrorCode[response.status] || ErrorCode.others
    return new Error(errorCode)
  })
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export const request = async (url, options = null) => {
  const response = await fetch(url, options)

  const data = await checkStatus(response)

  const ret = {
    data,
    headers: {}
  }

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count')
  }

  return ret
}
