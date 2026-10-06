import cmsHttpCommunicator from '@/api/cmsHttpCommunicator';

const testsService = {
  async tests(locale: string) {
    return cmsHttpCommunicator.get(`/tests?locale=${locale ?? 'en'}`).then((response: any) => {
      return response.data;
    });
  },
  async test(locale: string, testId: string) {
    return cmsHttpCommunicator
      .get(`/tests/${testId}?locale=${locale ?? 'en'}`)
      .then((response: any) => {
        return response.data;
      });
  }
};
export default testsService;
