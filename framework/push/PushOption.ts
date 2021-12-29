import { DateTime, Duration } from 'luxon';

export interface PushOption {
  sendAfter?: DateTime | Duration;
}
