import { BASE_EVENT, SMS } from './events_constants';
import { BASE_FIELD } from './fields_constants';


export interface BASE_ACTION {
  readonly displayName: string;
  readonly type: typeof BASE_EVENT;
}