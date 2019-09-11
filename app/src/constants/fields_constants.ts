import User from './user_constants';

export abstract class BASE_FIELD {
  static readonly type: string;
  static readonly displayName: string;
  readonly value: any;
  readonly displayName: string;

  constructor({ value }: { value: any }) {
    this.value = value;
    this.displayName = (this.constructor as typeof BASE_FIELD).displayName;
  }
}

export abstract class _FIELD_USER_IDENTIFIER extends BASE_FIELD {
  static readonly type: 'userId' | 'phoneNumber' | 'emailAddress';
  readonly value: string;
  readonly userModel?: User;

  constructor({ value, userModel }: { value: any, userModel?: User }) {
    super({ value });
    this.value = value;
    this.userModel = userModel;
  }

  getUser() { } // TODO
  getOrCreateUser() { } // TODO
}

export class FIELD_PHONE_NUMBER extends _FIELD_USER_IDENTIFIER {
  type = 'phoneNumber';
  displayName = 'Phone Number';
}

export function FIELD_PHONE_NUMBER_FACTORY(displayName: string) {
  return 
}

export class FIELD_EMAIL_ADDRESS extends _FIELD_USER_IDENTIFIER {
  type = 'emailAddress';
  displayName = 'Email Address';
}

export class FIELD_TEXT_FREE extends BASE_FIELD {
  type = 'text';
  displayName = 'Long Text Field';
  static readonly value: string;
}

export class FIELD_TEXT_LABEL extends BASE_FIELD {
  type = 'name';
  displayName = 'Short Text Field'
  static readonly value: string;
}

export class FIELD_BLOB extends BASE_FIELD {
  type = 'blob';
  displayName = 'Binary Data'
  static readonly mimeType: 'image/jpeg' | 'image/png';
  static readonly value: string;
}

export class FIELD_TIMESTAMP_MS extends BASE_FIELD {
  type = 'timestampMs';
  displayName = 'Time Stamp (milliseconds)'
  static readonly value: number;
}

export class FIELD_ANY extends BASE_FIELD {
  type = 'any'; // TODO: reevaluate if this is a good idea
  displayName = 'Other';
}