import httpCommunicator from '@/api/httpCommunicator';
import type { AxiosResponse } from 'axios';
import { IDictionariesModel, IGlossaryModel, ITariffModel } from '@/api/types';

const dictionariesService = {
  async dictionaries() {
    return httpCommunicator
      .get(`/dictionaries/`)
      .then((response: AxiosResponse<IDictionariesModel>) => {
        return response.data;
      });
  },
  async glossary(lang: string) {
    return httpCommunicator
      .get(`/dictionaries/glossary/?lang=${lang}`)
      .then((response: AxiosResponse<IGlossaryModel[]>) => {
        return response.data;
      });
  },
  async tariffs() {
    return httpCommunicator
      .get(`/dictionaries/tariffs`)
      .then((response: AxiosResponse<ITariffModel[]>) => {
        return response.data;
      });
  }
};
export default dictionariesService;
