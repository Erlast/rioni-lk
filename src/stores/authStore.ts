import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import { LocationQuery } from 'vue-router';
import { IContactModel, ICredentialModel } from '@/api/types';

interface IEntryPoint {
  url: string | undefined;
  query: LocationQuery | undefined;
}

interface IState {
  token: string | null;
  isSmsSend: boolean;
  timerSms: number;
  entryPoint?: IEntryPoint;
  idAuth?: number;
  maskedPhone?: string;
  dataSms?: ICredentialModel;
  blockedTimeLeft: number;
  recoverSmsId: number;
  dataRecover?: IContactModel;
}

interface IGetter {
  isAuthenticated: (s: IState) => boolean;
  accountName: (s: IState) => string | undefined;
  [key: string]: any;
}

interface IAction {
  setToken: (token: string | null) => void;
  clearToken: () => void;
  setSmsSend: (isSmsSend: boolean) => void;
  setTimerSms: (timerSms: number) => void;
  setEntryPoint: (entryPoint: IEntryPoint) => void;
  setIdAuth: (id: number | undefined) => void;
  setMaskedPhoneNumber: (phoneNumber: string | undefined) => void;
  clearEntryPoint: () => void;
  setDataSms: (data: ICredentialModel | undefined) => void;
  setBlockedTimeLeft: (blockedTimeLeft: number) => void;
  setRecoverSmsId: (smsId: number) => void;
  setDataRecover: (dataRecover: IContactModel) => void;
}

export const useAuthStore = defineStore<'auth', IState, IGetter, IAction>('auth', {
  state: (): IState => ({
    token: null,
    isSmsSend: false,
    timerSms: 0,
    entryPoint: undefined,
    idAuth: 0,
    maskedPhone: '',
    dataSms: undefined,
    blockedTimeLeft: 0,
    recoverSmsId: 0,
    dataRecover: undefined
  }),
  persist: true,
  actions: {
    setToken(token: string | null) {
      this.token = token;
    },
    clearToken() {
      this.token = null;
    },
    setSmsSend(isSmsSend: boolean) {
      this.isSmsSend = isSmsSend;
    },
    setTimerSms(timerSms: number) {
      this.timerSms = timerSms;
    },
    setEntryPoint(entryPoint: IEntryPoint) {
      this.entryPoint = entryPoint;
    },
    clearEntryPoint() {
      this.entryPoint = { url: undefined, query: undefined };
    },
    setIdAuth(id: number | undefined) {
      this.idAuth = id;
    },
    setDataSms(data: ICredentialModel | undefined) {
      this.dataSms = data;
    },

    setMaskedPhoneNumber(phoneNumber: string | undefined) {
      this.maskedPhone = phoneNumber;
    },
    setBlockedTimeLeft(blockedTimeLeft: number) {
      this.blockedTimeLeft = blockedTimeLeft;
    },
    setRecoverSmsId(smsId: number) {
      this.recoverSmsId = smsId;
    },
    setDataRecover(dataRecover: IContactModel) {
      this.dataRecover = dataRecover;
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    accountName: state => {
      if (state.token) {
        return jwtDecode(state.token).sub;
      }
      return '';
    }
  }
});
