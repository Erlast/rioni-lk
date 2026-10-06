import cmsHttpCommunicator from '@/api/cmsHttpCommunicator';
import { IFooterModel } from '@/api/types.ts';
import type { AxiosResponse } from 'axios';

const infoService = {
  async footer(locale: string) {
    return cmsHttpCommunicator
      .get(`/site-info?locale=${locale ?? 'en'}`)
      .then((response: AxiosResponse<IFooterModel>) => {
        return response.data.data;
      });
  }
};
export default infoService;
