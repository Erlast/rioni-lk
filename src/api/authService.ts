import clearStores from '@/utils/clearStores'
import httpCommunicator from './httpCommunicator'
import { useAuthStore } from '@/stores/authStore'
import type { ICodeModel, ICredentialModel, ITokenModel } from '@/api/types'
import type { AxiosResponse } from 'axios'

const authService = {
  async login(credentials: ICredentialModel) {
    const response: AxiosResponse<ITokenModel> = await httpCommunicator.post(
      '/auth/login',
      credentials,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data
  },

  async check2faSms(credentials: ICodeModel) {
    const response: AxiosResponse<ITokenModel> = await httpCommunicator.post(
      '/auth/check_sms',
      credentials,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data
  },

  async logout() {
    clearStores()

    // Опционально можно сделать запрос на удаление refreshToken на сервере
    return httpCommunicator.post('/auth/logout').then(() => {
      const authStore = useAuthStore()
      authStore.clearToken() // Очищаем токен через Pinia
      console.log('Logged out successfully')
    })
  },

  async refreshToken() {
    // Сервер автоматически получит refresh_token из HttpOnly cookie
    const response: AxiosResponse<ITokenModel> = await httpCommunicator.get('/auth/refresh')
    const newAccessToken =
      typeof response.data.access_token !== 'undefined' ? response.data.access_token : null
    const authStore = useAuthStore()
    authStore.setToken(newAccessToken) // Обновляем access_token
    return response.data
  },

  // async accountReissue(credentials: IReissueAccountModel) {
  //   const response: AxiosResponse<ITokenModel> = await httpCommunicator.post(
  //     `/auth/reissue/${credentials.account}`
  //   )
  //
  //   const newAccessToken =
  //     typeof response.data.access_token !== 'undefined' ? response.data.access_token : ''
  //
  //   const authStore = useAuthStore()
  //   authStore.setToken(newAccessToken)
  // },
}

export default authService
