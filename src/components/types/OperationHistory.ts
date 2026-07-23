export type OrderTypes = 'stock' | 'off-exchange' | 'ipo';
export type OrderAccount = string;
export type OrderStatus = 'active' | 'excluded' | 'removed';
export type OrderPeriod = 'week' | 'month' | '3-months' | '6-months' | 'year' | 'period';
export type OperationTypes = 'Перевод ДС' | 'Зачисление ДС' | 'Списание ДС';

export type FilterOrdersRequestModel = {
  orderTypes?: OrderTypes;
  account?: OrderAccount;
  status?: number;
  periodStart?: string;
  periodEnd?: string;
  operationType?: OperationTypes;
  operation?: number;
  page?: number;
  limit?: number;
};

export type DataOptions = {
  page: number;
  itemsPerPage: number;
  sortBy?: [];
  groupBy?: [];
  search?: string;
};
