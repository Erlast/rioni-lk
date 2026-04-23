import httpCommunicator from '@/api/httpCommunicator';
import type { AxiosResponse } from 'axios';
import { IPortfolioModel } from '@/api/types';

const accountsService = {
  async portfolio(id: number) {
    return httpCommunicator
      .get(`/profile/${id}`)
      .then((response: AxiosResponse<IPortfolioModel>) => {
        return response.data;
      });
  },

  async deleteAvatar(id: number) {
    return httpCommunicator.delete(`/profile/avatar/${id}`);
  }
};
export default accountsService;
