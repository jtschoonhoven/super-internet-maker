import {
    FIELD_PHONE_NUMBER,
    FIELD_EMAIL_ADDRESS,
    FIELD_TEXT_FREE,
    FIELD_TEXT_LABEL,
    FIELD_BLOB,
    FIELD_TIMESTAMP_MS,
} from './fields';


export class BASE_EVENT {}

export class SMS implements BASE_EVENT {
  static readonly toPhoneNumber: FIELD_PHONE_NUMBER;
  static readonly fromPhoneNumber: FIELD_PHONE_NUMBER;
  static readonly messageText: FIELD_TEXT_FREE;
  static readonly messageBlob?: FIELD_BLOB;
}

export class VOICE_CALL implements BASE_EVENT {
  static readonly toPhoneNumber: FIELD_PHONE_NUMBER;
  static readonly fromPhoneNumber: FIELD_PHONE_NUMBER;
}

export class USER_PROPERTY_CHANGE implements BASE_EVENT {
  static readonly property: FIELD_TEXT_LABEL;
  static readonly oldValue: any;
  static readonly newValue: any;
}

export class EMAIL implements BASE_EVENT {
  static readonly toEmail: FIELD_EMAIL_ADDRESS;
  static readonly fromEmail: FIELD_EMAIL_ADDRESS;
  static readonly messageText: FIELD_TEXT_FREE;
}

export class COMMIT implements BASE_EVENT {
  static readonly authorName: FIELD_TEXT_LABEL;
  static readonly sha: FIELD_TEXT_LABEL;
}

export class CALENDAR_EVENT implements BASE_EVENT {
  static readonly eventName: FIELD_TEXT_FREE;
  static readonly eventDescription: FIELD_TEXT_FREE;
  static readonly startTimestampMS: FIELD_TIMESTAMP_MS;
  static readonly endTimestampMs: FIELD_TIMESTAMP_MS;
}
