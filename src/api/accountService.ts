import httpCommunicator from '@/api/httpCommunicator';
import type { AxiosResponse } from 'axios';
import { IPortfolioModel } from '@/api/types';

const accountsService = {
  async portfolio(id: number) {
    return httpCommunicator
      .get(`/profile/?userId=${id}`)
      .then((response: AxiosResponse<IPortfolioModel>) => {
        return response.data;
      });
  },

  async deleteAvatar(id: number) {
    return httpCommunicator.delete(`/profile/avatar/?userId=${id}`);
  }
};
export default accountsService;
