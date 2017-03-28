import { request } from '../utils/request'

export const login = values =>
  request('/api/login', {
    method: 'POST',
    body: JSON.stringify(values)
  })
