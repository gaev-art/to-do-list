import {instance} from './instance'
import {LoginParamsType, ResponseType} from '../utils/types'


export const authApi = {
  me() {
    return instance.get<ResponseType<{ id: string, email: string, login: string }>>(`auth/me`)
      .then(res => res.data)
  },
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>(`auth/login`, data)
      .then(res => res.data)
  },
  logout() {
    return instance.delete(`auth/login`)
  },
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`)
  }
}