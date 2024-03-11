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

export enum EngagementState {
  DRAFT = "draft",//Drafted, user will choose the list of issues to be closed, or accept the risk, or will be fixed later and is accepted for now.
  OPEN = "open",//Created, and waiting to be acknowledged by the team
  IN_PROGRESS = "in_progress",// Acknoewledged, and assinged to resource
  PENDING_REVIEW = "pending_review",// Assignement was completed, and is waiting for review to be done by L2, admin, etc.
  UNDER_REVIEW = "under_review",// Under review
  ACCEPTED = "accepted",// Review completed, accepted, and is good to be published
  REJECTED = "rejected",// Review rejected, and goe back to in_progress on aseessor's screen
  CLOSED = "closed",
  ARCHIVED = "archived"
}




export const PlatformEngagementCompatibility: EnumDictionary<Platform, Engagement[]> = {
  [Platform.WEBAPP]: [Engagement.DAST, Engagement.SAST, Engagement.SAST],
  [Platform.WEBSERVICE]: [Engagement.SAST, Engagement.PENTEST],
  [Platform.IOS]: [Engagement.SAST, Engagement.PENTEST],
  [Platform.ANDROID]: [Engagement.SAST, Engagement.PENTEST],
}
