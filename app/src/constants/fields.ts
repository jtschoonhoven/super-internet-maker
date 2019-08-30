import User from './user';

export abstract class BASE_FIELD {
  static readonly type: string;
  static readonly value: any;
}

export class _FIELD_USER_IDENTIFIER extends BASE_FIELD {
  static readonly type: 'userId' | 'phoneNumber' | 'emailAddress';
  static readonly value: string;
  static readonly userModel?: User;

  getUser() { } // TODO
  getOrCreateUser() { } // TODO
}

export class FIELD_PHONE_NUMBER extends _FIELD_USER_IDENTIFIER {
  type = 'phoneNumber';
}

export class FIELD_EMAIL_ADDRESS extends _FIELD_USER_IDENTIFIER {
  type = 'emailAddress';
}

export class FIELD_TEXT_FREE extends BASE_FIELD {
  type = 'text';
  static readonly value: string;
}

export class FIELD_TEXT_LABEL extends BASE_FIELD {
  type = 'name';
  static readonly value: string;
}

export class FIELD_BLOB extends BASE_FIELD {
  type = 'blob';
  static readonly mimeType: 'image/jpeg' | 'image/png';
  static readonly value: string;
}

export class FIELD_TIMESTAMP_MS extends BASE_FIELD {
  type = 'timestampMs';
  static readonly value: number;
}
