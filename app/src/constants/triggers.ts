import {
    BASE_EVENT,
    SMS,
    VOICE_CALL,
    USER_PROPERTY_CHANGE,
    EMAIL,
    COMMIT,
    CALENDAR_EVENT,
} from './events';


export interface BASE_TRIGGER {
    readonly displayName: string;
    readonly type: BASE_EVENT;
}

interface _TRIGGERS {
  smsReceived: BASE_TRIGGER;
  voiceCallReceived: BASE_TRIGGER;
  userModelUpdated: BASE_TRIGGER;
  userLoginSucceeded: BASE_TRIGGER;
  emailReceived: BASE_TRIGGER;
  gitBranchUpdated: BASE_TRIGGER;
  calendarEventStarted: BASE_TRIGGER;
}

const TRIGGERS: _TRIGGERS = {
    smsReceived: {
      displayName: 'Receive SMS',
      type: SMS,
    },
    voiceCallReceived: {
      displayName: 'Receive Voice Call',
      type: VOICE_CALL,
    },
    userModelUpdated: {
      displayName: 'User Property Changed',
      type: USER_PROPERTY_CHANGE,
    },
    userLoginSucceeded: {
      displayName: 'User Logged In',
      type: USER_PROPERTY_CHANGE,
    },
    emailReceived: {
      displayName: 'Receive Email',
      type: EMAIL,
    },
    gitBranchUpdated: {
      displayName: 'Git Branch Updated',
      type: COMMIT,
    },
    calendarEventStarted: {
      displayName: 'Calendar Event Started',
      type: CALENDAR_EVENT,
    },
  }
  export default TRIGGERS;
