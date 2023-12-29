type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

export enum Platform {
  WEBAPP = 'webapp',
  WEBSERVICE = 'webservice',
  IOS = 'ios',
  ANDROID = 'android',
}

export enum Engagement {
  SAST = 'sast',
  DAST = 'dast',
  PENTEST = 'pentest',
}

export const PlatformEngagementCompatibility: EnumDictionary<Platform, Engagement[]> = {
  [Platform.WEBAPP]: [Engagement.DAST, Engagement.SAST, Engagement.SAST],
  [Platform.WEBSERVICE]:  [Engagement.SAST, Engagement.PENTEST],
  [Platform.IOS]:  [Engagement.SAST, Engagement.PENTEST],
  [Platform.ANDROID]:  [Engagement.SAST, Engagement.PENTEST],
}
