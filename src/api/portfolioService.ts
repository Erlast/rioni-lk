import httpCommunicator from '@/api/httpCommunicator';
import type { AxiosResponse } from 'axios';
import {
  IPortfoliosModel,
  IPortfolioModel,
  IAccountCostModel,
  IAccountYieldModel
} from '@/api/types';
import qs from 'qs';
import { TimeframeType } from '@/stores/accountChartCostStore.ts';

const portfolioService = {
  async portfolios(): Promise<IPortfoliosModel> {
    return httpCommunicator.get(`/portfolios`).then((response: AxiosResponse) => {
      return response.data;
    });
  },
  async assets(types: string[] | null): Promise<IPortfolioModel> {
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
      .get(`/portfolio/assets`, config)
      .then((response: AxiosResponse) => {
        return response.data;
      });
  },
  async portfolioData(accountId: number, timeframe: TimeframeType): Promise<IAccountCostModel[]> {
    return httpCommunicator
      .get(`/portfolio/${accountId}?timeframe=${timeframe}`)
      .then((response: AxiosResponse) => {
        return response.data;
      });
  },
  async portfolioAccountYield(
    accountId: number,
    timeframe: TimeframeType
  ): Promise<IAccountYieldModel> {
    return httpCommunicator
      .get(`/portfolio/${accountId}/yield?period=${timeframe}`)
      .then((response: AxiosResponse) => {
        return response.data;
      });
  }
};

export default portfolioService;
