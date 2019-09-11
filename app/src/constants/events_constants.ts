import {
    FIELD_PHONE_NUMBER,
    FIELD_EMAIL_ADDRESS,
    FIELD_TEXT_FREE,
    FIELD_TEXT_LABEL,
    FIELD_BLOB,
    FIELD_TIMESTAMP_MS,
    FIELD_ANY,
    BASE_FIELD,
} from './fields_constants';

export class EVENT_FIELD_LABEL<T extends typeof BASE_FIELD> {
  readonly displayName: string;
  readonly field: T;

  constructor(field: T, displayName: string) {
    this.displayName = displayName;
    this.field = field;
  }
}


export class BASE_EVENT {}

interface _SMS {
  readonly toPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;
  readonly fromPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;
  readonly messageText: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;
  readonly messageBlob?: EVENT_FIELD_LABEL<typeof FIELD_BLOB>;
}

export class SMS implements BASE_EVENT, _SMS {
  static readonly toPhoneNumber = new EVENT_FIELD_LABEL(FIELD_PHONE_NUMBER, 'To Phone Number')
  static readonly fromPhoneNumber = new EVENT_FIELD_LABEL(FIELD_PHONE_NUMBER, 'From Phone Number')
  static readonly messageText = new EVENT_FIELD_LABEL(FIELD_TEXT_FREE, 'Message Text')
  static readonly messageBlob = new EVENT_FIELD_LABEL(FIELD_BLOB, 'Message Blob')

  readonly toPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;
  readonly fromPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;
  readonly messageText: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;
  readonly messageBlob?: EVENT_FIELD_LABEL<typeof FIELD_BLOB>;

  constructor(props: _SMS) {
    this.toPhoneNumber = props.toPhoneNumber;
    this.fromPhoneNumber = props.fromPhoneNumber;
    this.messageText = props.messageText;
    this.messageBlob = props.messageBlob;
  }
}

interface _VOICE_CALL {
  readonly toPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;
  readonly fromPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;
}

export class VOICE_CALL implements BASE_EVENT, _VOICE_CALL {
  static readonly toPhoneNumber = new EVENT_FIELD_LABEL(FIELD_PHONE_NUMBER, 'To Phone Number')
  static readonly fromPhoneNumber = new EVENT_FIELD_LABEL(FIELD_PHONE_NUMBER, 'From Phone Number')
  readonly toPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;
  readonly fromPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;

  constructor(props: _VOICE_CALL) {
    this.toPhoneNumber = props.toPhoneNumber;
    this.fromPhoneNumber = props.fromPhoneNumber;
  }
}

interface _USER_PROPERTY_CHANGE {
  readonly property: EVENT_FIELD_LABEL<typeof FIELD_TEXT_LABEL>;
  readonly oldValue: EVENT_FIELD_LABEL<typeof FIELD_ANY>;
  readonly newValue: EVENT_FIELD_LABEL<typeof FIELD_ANY>;
}

export class USER_PROPERTY_CHANGE implements BASE_EVENT, _USER_PROPERTY_CHANGE {
  static readonly property = new EVENT_FIELD_LABEL(FIELD_TEXT_LABEL, 'Property Name');
  static readonly oldValue = new EVENT_FIELD_LABEL(FIELD_ANY, 'Old Value');
  static readonly newValue = new EVENT_FIELD_LABEL(FIELD_ANY, 'New Value');
  readonly property: EVENT_FIELD_LABEL<typeof FIELD_TEXT_LABEL>;
  readonly oldValue: EVENT_FIELD_LABEL<typeof FIELD_ANY>;
  readonly newValue: EVENT_FIELD_LABEL<typeof FIELD_ANY>;

  constructor(props: _USER_PROPERTY_CHANGE) {
    this.property = props.property;
    this.oldValue = props.oldValue;
    this.newValue = props.newValue;
  }
}

interface _EMAIL {
  readonly toEmail: EVENT_FIELD_LABEL<typeof FIELD_EMAIL_ADDRESS>;
  readonly fromEmail: EVENT_FIELD_LABEL<typeof FIELD_EMAIL_ADDRESS>;
  readonly messageText: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;
}

export class EMAIL implements BASE_EVENT, _EMAIL {
  // TODO: update to support subject lines, multiple recipients, cc's, bcc's, etc
  static readonly toEmail = new EVENT_FIELD_LABEL(FIELD_EMAIL_ADDRESS, 'To Email Address');
  static readonly fromEmail = new EVENT_FIELD_LABEL(FIELD_EMAIL_ADDRESS, 'From Email Address');
  static readonly messageText = new EVENT_FIELD_LABEL(FIELD_TEXT_FREE, 'Email Body Text');
  readonly toEmail: EVENT_FIELD_LABEL<typeof FIELD_EMAIL_ADDRESS>;
  readonly fromEmail: EVENT_FIELD_LABEL<typeof FIELD_EMAIL_ADDRESS>;
  readonly messageText: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;

  constructor(props: _EMAIL) {
    this.toEmail = props.toEmail;
    this.fromEmail = props.fromEmail;
    this.messageText = props.messageText;
  }
}

interface _COMMIT {
  readonly authorName: EVENT_FIELD_LABEL<typeof FIELD_TEXT_LABEL>;
  readonly sha: EVENT_FIELD_LABEL<typeof FIELD_TEXT_LABEL>;
}

export class COMMIT implements BASE_EVENT, _COMMIT {
  static readonly authorName = new EVENT_FIELD_LABEL(FIELD_TEXT_LABEL, 'Author Name');
  static readonly sha = new EVENT_FIELD_LABEL(FIELD_TEXT_LABEL, 'Commit SHA');
  readonly authorName: EVENT_FIELD_LABEL<typeof FIELD_TEXT_LABEL>;
  readonly sha: EVENT_FIELD_LABEL<typeof FIELD_TEXT_LABEL>;

  constructor(props: _COMMIT) {
    this.authorName = props.authorName;
    this.sha = props.sha;
  }
}

interface _CALENDAR_EVENT {
  readonly eventName: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;
  readonly eventDescription: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;
  readonly startTimestampMS: EVENT_FIELD_LABEL<typeof FIELD_TIMESTAMP_MS>;
  readonly endTimestampMs: EVENT_FIELD_LABEL<typeof FIELD_TIMESTAMP_MS>;
}

export class CALENDAR_EVENT implements BASE_EVENT, _CALENDAR_EVENT {
  static readonly eventName = new EVENT_FIELD_LABEL(FIELD_TEXT_FREE, 'Event Name');
  static readonly eventDescription = new EVENT_FIELD_LABEL(FIELD_TEXT_FREE, 'Event Description');
  static readonly startTimestampMS = new EVENT_FIELD_LABEL(FIELD_TIMESTAMP_MS, 'Start Time');
  static readonly endTimestampMs = new EVENT_FIELD_LABEL(FIELD_TIMESTAMP_MS, 'End Time');
  readonly eventName: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;
  readonly eventDescription: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;
  readonly startTimestampMS: EVENT_FIELD_LABEL<typeof FIELD_TIMESTAMP_MS>;
  readonly endTimestampMs: EVENT_FIELD_LABEL<typeof FIELD_TIMESTAMP_MS>;

  constructor(props: _CALENDAR_EVENT) {
    this.eventName = props.eventName;
    this.eventDescription = props.eventDescription;
    this.startTimestampMS = props.startTimestampMS;
    this.endTimestampMs = props.endTimestampMs;
  }
}
