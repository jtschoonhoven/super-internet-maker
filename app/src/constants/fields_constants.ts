import User from './user_constants';

export abstract class BASE_FIELD {
  static readonly type: string;
  static readonly displayName: string;
  readonly type: string;
  readonly displayName: string;
  readonly value: any;

  constructor({ value }: { value: any }) {
    this.type = (this.constructor as typeof BASE_FIELD).type;
    this.displayName = (this.constructor as typeof BASE_FIELD).displayName;
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
  static readonly type = 'phoneNumber';
  static readonly displayName = 'Phone Number';
  readonly value: string = 'TODO';
}

export class FIELD_EMAIL_ADDRESS extends _FIELD_USER_IDENTIFIER {
  static readonly type = 'emailAddress';
  static readonly displayName = 'Email Address';
  readonly value: string = 'TODO';
}

export class FIELD_TEXT_FREE extends BASE_FIELD {
  static readonly type = 'text';
  static readonly displayName = 'Long Text Field';
  readonly value: string = 'TODO';
}

export class FIELD_TEXT_LABEL extends BASE_FIELD {
  type = 'name';
  displayName = 'Short Text Field'
  readonly value: string = 'TODO';
}

export class FIELD_BLOB extends BASE_FIELD {
  static type = 'blob';
  static displayName = 'Binary Data'
  readonly mimeType: 'image/jpeg' | 'image/png' = 'image/jpeg'; // TODO
  readonly value: string = 'TODO';
}

export class FIELD_TIMESTAMP_MS extends BASE_FIELD {
  static readonly type = 'timestampMs';
  static readonly displayName = 'Time Stamp (milliseconds)'
  readonly value: number = -99; // TODO
}

export class FIELD_ANY extends BASE_FIELD {
  static readonly type = 'any'; // TODO: reevaluate if this is a good idea
  static readonly displayName = 'Other';
}