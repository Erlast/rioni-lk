import httpCommunicator from '@/api/httpCommunicator';
import type { AxiosResponse } from 'axios';
import {
  IBankAccountModel,
  IProfileModel,
  IResidencePermit,
  ITaxResidenceModel
} from '@/api/types';

const accountsService = {
  async profile() {
    return httpCommunicator.get(`/profile/me`).then((response: AxiosResponse<IProfileModel>) => {
      return response.data;
    });
  },

  async profileSave(data: any) {
    return httpCommunicator.patch(`/profile/me`, data);
  },

  async profileContactsSave(data: any) {
    return httpCommunicator.put(`/profile/me/contacts`, data);
  },

  async profileAddressesSave(data: any) {
    return httpCommunicator.put(`/profile/me/addresses`, data);
  },

  async profileTaxResidences() {
    return httpCommunicator
      .get(`/profile/me/tax-residences`)
      .then((response: AxiosResponse<ITaxResidenceModel[]>) => {
        return response.data;
      });
  },

  async profileResidencePermits() {
    return httpCommunicator
      .get(`/profile/me/residence-permits`)
      .then((response: AxiosResponse<IResidencePermit[]>) => {
        return response.data;
      });
  },

  async profileTaxResidencesSave(data: any) {
    return httpCommunicator.put(`/profile/me/tax-residences`, data);
  },

  async profileResidencePermitsSave(data: any) {
    return httpCommunicator.put(`/profile/me/residence-permits`, data);
  },

  async profileBankAccounts() {
    return httpCommunicator
      .get(`/profile/me/bank-accounts`)
      .then((response: AxiosResponse<IBankAccountModel[]>) => {
        return response.data;
      });
  },

  async profileBankAccountsSave(data: any) {
    return httpCommunicator.put(`/profile/me/bank-accounts`, data);
  },

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return httpCommunicator.post(`/profile/me/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  async deleteAvatar() {
    return httpCommunicator.delete(`/profile/me/avatar`);
  },
  async profileTariffSave(data: any) {
    return httpCommunicator.post(`/profile/tariff`, data);
  },

  async uploadFiles(files: File[], path: string) {
    const formData = new FormData();
    files.forEach((file: File) => {
      formData.append('file', file);
    });
    formData.append('path', path);
    return httpCommunicator.post(`/files/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};
export default accountsService;
