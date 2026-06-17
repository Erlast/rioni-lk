import httpCommunicator from '@/api/httpCommunicator';
import type { AxiosResponse } from 'axios';
import { IOrdersModel } from '@/api/types';
import { FilterOrdersRequestModel } from '@/components/types/OperationHistory.ts';

const ordersService = {
  async orders(accountId: number, args?: FilterOrdersRequestModel) {
    return httpCommunicator
      .get(`/orders/${accountId}`, {
        params: args
      })
      .then((response: AxiosResponse<IOrdersModel>) => {
        return { data: response.data.orders, total: response.headers['x-orders-total'] };
      });
  }
};
export default ordersService;
