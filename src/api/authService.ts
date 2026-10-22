import clearStores from '@/utils/clearStores';
import httpCommunicator from './httpCommunicator';
import { useAuthStore } from '@/stores/authStore';
import type {
  ICodeModel,
  IContactModel,
  ICredentialModel,
  IRegistrationModel,
  IRegistrationSendSmsModel,
  ITokenModel
} from '@/api/types';
import type { AxiosResponse } from 'axios';
import { keycloak } from '@/utils/keycloak.ts';

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

    return response.data;
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

    return response.data;
  },

  async logout() {
    await keycloak.logout({
      redirectUri: window.location.origin + '/'
    });

    clearStores();
  },

  async refreshToken() {
    const response: AxiosResponse<ITokenModel> = await httpCommunicator.get('/auth/refresh');
    const newAccessToken =
      typeof response.data.access_token !== 'undefined' ? response.data.access_token : null;
    const authStore = useAuthStore();
    authStore.setToken(newAccessToken); // Обновляем access_token
    return response.data;
  },

  async checkContact(contactRequest: IContactModel) {
    const response: AxiosResponse = await httpCommunicator.post(
      '/auth/check-contact',
      contactRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  },

  async recoverSms(contactRequest: IContactModel) {
    const response: AxiosResponse = await httpCommunicator.post(
      '/auth/recover-sms',
      contactRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  },

  async registrationSendSms(registrationSendSmsRequest: IRegistrationSendSmsModel) {
    const response: AxiosResponse = await httpCommunicator.post(
      '/auth/registration-sms-code',
      registrationSendSmsRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  },

  async registration(registrationRequest: IRegistrationModel) {
    const response: AxiosResponse = await httpCommunicator.post(
      '/auth/registration',
      registrationRequest,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  }
};

export default authService;
