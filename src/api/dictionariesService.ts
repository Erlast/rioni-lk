import httpCommunicator from '@/api/httpCommunicator';
import type { AxiosResponse } from 'axios';
import { IDictionariesModel } from '@/api/types';

const dictionariesService = {
  async dictionaries() {
    return httpCommunicator
      .get(`/dictionaries/`)
      .then((response: AxiosResponse<IDictionariesModel>) => {
        return response.data;
      });
  }
};
export default dictionariesService;
