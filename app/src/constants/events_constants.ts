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
import SIM_BASE from './base_constants';

export class EVENT_FIELD_LABEL<T extends typeof BASE_FIELD> extends SIM_BASE {
  readonly parent?: SIM_BASE;
  readonly displayName: string;
  readonly field: T;

  constructor(field: T, displayName: string) {
    super();
    this.displayName = displayName;
    this.field = field;
  }
}

interface STRING_FIELD_MAP {
  [key: string]: EVENT_FIELD_LABEL<typeof BASE_FIELD>;
}

export class BASE_EVENT implements STRING_FIELD_MAP {
  [key: string]: EVENT_FIELD_LABEL<typeof BASE_FIELD>;
  constructor(props: { [key: string]: EVENT_FIELD_LABEL<typeof BASE_FIELD> }) {}
}

interface _NONE extends STRING_FIELD_MAP {}

export class NONE extends BASE_EVENT implements _NONE {}

interface _SMS extends STRING_FIELD_MAP {
  readonly toPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;
  readonly fromPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;
  readonly messageText: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;
  readonly messageBlob: EVENT_FIELD_LABEL<typeof FIELD_BLOB>;
}

export class SMS extends BASE_EVENT implements _SMS {
  static readonly toPhoneNumber = new EVENT_FIELD_LABEL(FIELD_PHONE_NUMBER, 'To Phone Number')
  static readonly fromPhoneNumber = new EVENT_FIELD_LABEL(FIELD_PHONE_NUMBER, 'From Phone Number')
  static readonly messageText = new EVENT_FIELD_LABEL(FIELD_TEXT_FREE, 'Message Text')
  static readonly messageBlob = new EVENT_FIELD_LABEL(FIELD_BLOB, 'Message Blob')

  readonly toPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;
  readonly fromPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;
  readonly messageText: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;
  readonly messageBlob: EVENT_FIELD_LABEL<typeof FIELD_BLOB>;

  constructor(props: _SMS) {
    super(props);
    this.toPhoneNumber = props.toPhoneNumber;
    this.fromPhoneNumber = props.fromPhoneNumber;
    this.messageText = props.messageText;
    this.messageBlob = props.messageBlob;
  }
}

interface _VOICE_CALL extends STRING_FIELD_MAP {
  readonly toPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;
  readonly fromPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;
}

export class VOICE_CALL extends BASE_EVENT implements _VOICE_CALL {
  static readonly toPhoneNumber = new EVENT_FIELD_LABEL(FIELD_PHONE_NUMBER, 'To Phone Number')
  static readonly fromPhoneNumber = new EVENT_FIELD_LABEL(FIELD_PHONE_NUMBER, 'From Phone Number')
  readonly toPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;
  readonly fromPhoneNumber: EVENT_FIELD_LABEL<typeof FIELD_PHONE_NUMBER>;

  constructor(props: _VOICE_CALL) {
    super(props);
    this.toPhoneNumber = props.toPhoneNumber;
    this.fromPhoneNumber = props.fromPhoneNumber;
  }
}

interface _USER_PROPERTY_CHANGE extends STRING_FIELD_MAP {
  readonly property: EVENT_FIELD_LABEL<typeof FIELD_TEXT_LABEL>;
  readonly oldValue: EVENT_FIELD_LABEL<typeof FIELD_ANY>;
  readonly newValue: EVENT_FIELD_LABEL<typeof FIELD_ANY>;
}

export class USER_PROPERTY_CHANGE extends BASE_EVENT implements _USER_PROPERTY_CHANGE {
  static readonly property = new EVENT_FIELD_LABEL(FIELD_TEXT_LABEL, 'Property Name');
  static readonly oldValue = new EVENT_FIELD_LABEL(FIELD_ANY, 'Old Value');
  static readonly newValue = new EVENT_FIELD_LABEL(FIELD_ANY, 'New Value');
  readonly property: EVENT_FIELD_LABEL<typeof FIELD_TEXT_LABEL>;
  readonly oldValue: EVENT_FIELD_LABEL<typeof FIELD_ANY>;
  readonly newValue: EVENT_FIELD_LABEL<typeof FIELD_ANY>;

  constructor(props: _USER_PROPERTY_CHANGE) {
    super(props);
    this.property = props.property;
    this.oldValue = props.oldValue;
    this.newValue = props.newValue;
  }
}

interface _EMAIL extends STRING_FIELD_MAP {
  readonly toEmail: EVENT_FIELD_LABEL<typeof FIELD_EMAIL_ADDRESS>;
  readonly fromEmail: EVENT_FIELD_LABEL<typeof FIELD_EMAIL_ADDRESS>;
  readonly messageText: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;
}

export class EMAIL extends BASE_EVENT implements _EMAIL {
  // TODO: update to support subject lines, multiple recipients, cc's, bcc's, etc
  static readonly toEmail = new EVENT_FIELD_LABEL(FIELD_EMAIL_ADDRESS, 'To Email Address');
  static readonly fromEmail = new EVENT_FIELD_LABEL(FIELD_EMAIL_ADDRESS, 'From Email Address');
  static readonly messageText = new EVENT_FIELD_LABEL(FIELD_TEXT_FREE, 'Email Body Text');
  readonly toEmail: EVENT_FIELD_LABEL<typeof FIELD_EMAIL_ADDRESS>;
  readonly fromEmail: EVENT_FIELD_LABEL<typeof FIELD_EMAIL_ADDRESS>;
  readonly messageText: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;

  constructor(props: _EMAIL) {
    super(props);
    this.toEmail = props.toEmail;
    this.fromEmail = props.fromEmail;
    this.messageText = props.messageText;
  }
}

interface _COMMIT extends STRING_FIELD_MAP {
  readonly authorName: EVENT_FIELD_LABEL<typeof FIELD_TEXT_LABEL>;
  readonly sha: EVENT_FIELD_LABEL<typeof FIELD_TEXT_LABEL>;
}

export class COMMIT extends BASE_EVENT implements _COMMIT {
  static readonly authorName = new EVENT_FIELD_LABEL(FIELD_TEXT_LABEL, 'Author Name');
  static readonly sha = new EVENT_FIELD_LABEL(FIELD_TEXT_LABEL, 'Commit SHA');
  readonly authorName: EVENT_FIELD_LABEL<typeof FIELD_TEXT_LABEL>;
  readonly sha: EVENT_FIELD_LABEL<typeof FIELD_TEXT_LABEL>;

  constructor(props: _COMMIT) {
    super(props);
    this.authorName = props.authorName;
    this.sha = props.sha;
  }
}

interface _CALENDAR_EVENT extends STRING_FIELD_MAP {
  readonly eventName: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;
  readonly eventDescription: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;
  readonly startTimestampMS: EVENT_FIELD_LABEL<typeof FIELD_TIMESTAMP_MS>;
  readonly endTimestampMs: EVENT_FIELD_LABEL<typeof FIELD_TIMESTAMP_MS>;
}

export class CALENDAR_EVENT extends BASE_EVENT implements _CALENDAR_EVENT {
  static readonly eventName = new EVENT_FIELD_LABEL(FIELD_TEXT_FREE, 'Event Name');
  static readonly eventDescription = new EVENT_FIELD_LABEL(FIELD_TEXT_FREE, 'Event Description');
  static readonly startTimestampMS = new EVENT_FIELD_LABEL(FIELD_TIMESTAMP_MS, 'Start Time');
  static readonly endTimestampMs = new EVENT_FIELD_LABEL(FIELD_TIMESTAMP_MS, 'End Time');
  readonly eventName: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;
  readonly eventDescription: EVENT_FIELD_LABEL<typeof FIELD_TEXT_FREE>;
  readonly startTimestampMS: EVENT_FIELD_LABEL<typeof FIELD_TIMESTAMP_MS>;
  readonly endTimestampMs: EVENT_FIELD_LABEL<typeof FIELD_TIMESTAMP_MS>;

  constructor(props: _CALENDAR_EVENT) {
    super(props);
    this.eventName = props.eventName;
    this.eventDescription = props.eventDescription;
    this.startTimestampMS = props.startTimestampMS;
    this.endTimestampMs = props.endTimestampMs;
  }
}
