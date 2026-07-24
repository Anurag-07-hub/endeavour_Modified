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
  webhookUrl: 'https://script.google.com/macros/s/AKfycbwgSL3_jp1_UgSgG4WrVr6DV1rc-DqVR1w3PiSlL_MyPd4f0yJfqQp2G5fe68fTCWE-/exec',
  contactNumber: '',
  bannerUrl: '',
  endDate: '',
  typography: {
    fontFamily: 'Inter',
    fontWeight: 'normal'
  }
};
