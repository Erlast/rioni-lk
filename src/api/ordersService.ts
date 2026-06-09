import httpCommunicator from '@/api/httpCommunicator';
import type { AxiosResponse } from 'axios';
import { IOrdersModel } from '@/api/types';

const ordersService = {
  async orders(accountId: number) {
    return httpCommunicator
      .get(`/orders/${accountId}`)
      .then((response: AxiosResponse<IOrdersModel>) => {
        return { data: response.data.orders, total: response.headers['x-orders-total'] };
      });
  }
};
export default ordersService;
