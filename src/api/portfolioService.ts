import httpCommunicator from '@/api/httpCommunicator';
import type { AxiosResponse } from 'axios';
import { IAccountModel } from '@/api/types';

const portfolioService = {
  async portfolios(profileId: number): Promise<IAccountModel[]> {
    return httpCommunicator.get(`/portfolios/${profileId}`).then((response: AxiosResponse) => {
      return response.data.data;
    });
  }
};
export default portfolioService;
