import { DateTime, Duration } from 'luxon';

const OneSignalTimeFormat = 'y-m-d HH:mm:ss ZZZZ';

export const reinterpretSendAfter = (x: DateTime | Duration) => {
  if (x instanceof DateTime) {
    return x.toFormat(OneSignalTimeFormat);
  } else if (x instanceof Duration) {
    return DateTime.local().plus(x).toFormat(OneSignalTimeFormat);
  }
};
