type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

export class ColorSeverity {
  static INFO = '#3498db';   // Informative (Dark Blue)
  static LOW = '#2ecc71';   // Low (Dark Green)
  static MEDIUM = '#e67e22';   // Medium (Dark Orange)
  static HIGH = '#e74c3c';   // High (Dark Red)
  static CRITICAL = '#c0392b';   // Critical (Darker Red)
}

export class Severity {
  static INFO = 'Info';   // Informative (Dark Blue)
  static LOW = 'Low';   // Low (Dark Green)
  static MEDIUM = 'Medium';   // Medium (Dark Orange)
  static HIGH = 'High';   // High (Dark Red)
  static CRITICAL = 'Critical';   // Critical (Darker Red)
}

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


export enum FindingState {
  OPEN = "open",// The finding has been identified but has not yet been resolved or mitigated.
  CLOSED = "closed",// The finding has been addressed and resolved satisfactorily.
  UNDER_INVESTIGATION = "under_investigation",//The finding is being analyzed or investigated to determine its validity or severity.
  MITiGATED = "mitigated",// Action has been taken to reduce the risk associated with the finding.
  REOPENED = "reopened",// he finding was closed but has been reopened due to it resurfacing or not being adequately addressed.
  PENDING_REVIEW = "pending_review",// The finding is awaiting review or approval from relevant stakeholders.
  DEFERRED = "deferred",// The finding is acknowledged but scheduled for resolution at a later time.
  FALSE_POSITIVE = "false_postive",// The finding was initially flagged as a security issue but has been determined to be a benign or false alert.
  RESOLVED = "resolved", // Similar to closed, but may imply a partial resolution or temporary fix.
  ESCALATED = "escalated", //The finding has been escalated to higher levels of authority for attention or action.
}


export const PlatformEngagementCompatibility: EnumDictionary<Platform, Engagement[]> = {
  [Platform.WEBAPP]: [Engagement.DAST, Engagement.SAST, Engagement.SAST],
  [Platform.WEBSERVICE]: [Engagement.SAST, Engagement.PENTEST],
  [Platform.IOS]: [Engagement.SAST, Engagement.PENTEST],
  [Platform.ANDROID]: [Engagement.SAST, Engagement.PENTEST],
}
