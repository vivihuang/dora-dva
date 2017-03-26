import request from '../utils/request'

export const fetch = ({ page = 1 }) => request(`/api/users?_page=${page}&_limit=5`)
