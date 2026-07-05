export interface RecruitmentSettings {
  webhookUrl: string;
  contactNumber: string;
  bannerUrl: string;
  endDate: string;
  typography: {
    fontFamily: string;
    fontWeight: string;
  };
}

export const defaultRecruitment: RecruitmentSettings = {
  webhookUrl: '',
  contactNumber: '',
  bannerUrl: '',
  endDate: '',
  typography: {
    fontFamily: 'Inter',
    fontWeight: 'normal'
  }
};
