import httpCommunicator from '@/api/httpCommunicator';
import type { AxiosResponse } from 'axios';
import { IAccountModel, IPortfolioModel } from '@/api/types';
import qs from 'qs';

const portfolioService = {
  async portfolios(profileId: number): Promise<IAccountModel[]> {
    return httpCommunicator.get(`/portfolios/${profileId}`).then((response: AxiosResponse) => {
      return response.data.data;
    });
  },
  async assets(profileId: number, types: string[] | null): Promise<IPortfolioModel> {
    let config = {};
    if (types) {
      config = {
        params: {
          types: types
        },
        paramsSerializer: (params: any) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        }
      };
    }
    return httpCommunicator
      .get(`/portfolio/${profileId}/assets`, config)
      .then((response: AxiosResponse) => {
        return response.data;
      });
  }
};

export default portfolioService;
