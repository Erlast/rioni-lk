import httpCommunicator from '@/api/httpCommunicator';
import type { AxiosResponse } from 'axios';
import { INBGRatesModel } from '@/api/types';

const currenciesService = {
  async currencies() {
    return httpCommunicator
      .get(`/currencies/nbg-rates`)
      .then((response: AxiosResponse<INBGRatesModel>) => {
        return response.data;
      });
  }
};
export default currenciesService;
