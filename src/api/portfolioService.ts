import httpCommunicator from '@/api/httpCommunicator';
import type { AxiosResponse } from 'axios';
import { IPortfoliosModel, IPortfolioModel, IAccountCostModel } from '@/api/types';
import qs from 'qs';
import { TimeframeType } from '@/stores/accountChartCostStore.ts';

const portfolioService = {
  async portfolios(profileId: number): Promise<IPortfoliosModel> {
    return httpCommunicator.get(`/portfolios/${profileId}`).then((response: AxiosResponse) => {
      return response.data;
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
  },
  async portfolioData(accountId: number, timeframe:TimeframeType): Promise<IAccountCostModel[]> {
    return httpCommunicator.get(`/portfolio/${accountId}?timeframe=${timeframe}`).then((response: AxiosResponse) => {
      return response.data;
    });
  }
};

export default portfolioService;
