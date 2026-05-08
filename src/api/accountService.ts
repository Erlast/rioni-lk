import httpCommunicator from '@/api/httpCommunicator';
import type { AxiosResponse } from 'axios';
import { IProfileModel } from '@/api/types';

const accountsService = {
  async profile(id: number) {
    return httpCommunicator.get(`/profile/${id}`).then((response: AxiosResponse<IProfileModel>) => {
      return response.data;
    });
  },

  async profileSave(id: number, data: any) {
    return httpCommunicator.patch(`/profile/${id}`, data);
  },

  async deleteAvatar(id: number) {
    return httpCommunicator.delete(`/profile/avatar/${id}`);
  }
};
export default accountsService;
