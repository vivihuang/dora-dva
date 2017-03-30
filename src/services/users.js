import { request } from '../utils/request'
import { PAGE_SIZE } from '../constants/Users'

export const fetch = page => request(`/api/users?page=${page}&limit=${PAGE_SIZE}`)

export const remove = id => request(`/api/users/${id}`, { method: 'DELETE' })

export const patch = (id, values) =>
  request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values)
  })

export const create = values =>
  request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values)
  })
