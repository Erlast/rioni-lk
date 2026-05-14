import httpCommunicator from '@/api/httpCommunicator';
import type { AxiosResponse } from 'axios';
import {
  IBankAccountModel,
  IProfileModel,
  IResidencePermit,
  ITaxResidenceModel
} from '@/api/types';

const accountsService = {
  async profile(id: number) {
    return httpCommunicator.get(`/profile/${id}`).then((response: AxiosResponse<IProfileModel>) => {
      return response.data;
    });
  },

  async profileSave(id: number, data: any) {
    return httpCommunicator.patch(`/profile/${id}`, data);
  },

  async profileContactsSave(id: number, data: any) {
    return httpCommunicator.put(`/profile/${id}/contacts`, data);
  },

  async profileAddressesSave(id: number, data: any) {
    return httpCommunicator.put(`/profile/${id}/addresses`, data);
  },

  async profileTaxResidences(id: number) {
    return httpCommunicator
      .get(`/profile/${id}/tax-residences`)
      .then((response: AxiosResponse<ITaxResidenceModel[]>) => {
        return response.data;
      });
  },

  async profileResidencePermits(id: number) {
    return httpCommunicator
      .get(`/profile/${id}/residence-permits`)
      .then((response: AxiosResponse<IResidencePermit[]>) => {
        return response.data;
      });
  },

  async profileTaxResidencesSave(id: number, data: any) {
    return httpCommunicator.put(`/profile/${id}/tax-residences`, data);
  },

  async profileResidencePermitsSave(id: number, data: any) {
    return httpCommunicator.put(`/profile/${id}/residence-permits`, data);
  },

  async profileBankAccounts(id: number) {
    return httpCommunicator
      .get(`/profile/${id}/bank-accounts`)
      .then((response: AxiosResponse<IBankAccountModel[]>) => {
        return response.data;
      });
  },

  async profileBankAccountsSave(id: number, data: any) {
    return httpCommunicator.put(`/profile/${id}/bank-accounts`, data);
  },

  async uploadAvatar(id: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return httpCommunicator.post(`/profile/${id}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  async deleteAvatar(id: number) {
    return httpCommunicator.delete(`/profile/avatar/${id}`);
  }
};
export default accountsService;
