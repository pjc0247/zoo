export const timeStringToCronString = (input: string) => {
  if (input.startsWith('every ')) {
    const tokens = input.split(' ');
    const num = +tokens[1];
    const unit = tokens[2];

    if (tokens.length !== 3 || isNaN(num))
      throw new Error(`'${input}' is not a valid time string.`);

    if (unit === 'seconds')
      return `*/${num} * * * * *`;
    if (unit === 'minutes')
      return `* */${num} * * * *`;
    if (unit === 'hours')
      return `* * */${num} * * *`;
    if (unit === 'days')
      return `* * * */${num} * *`;

    throw new Error(`unrecognized time unit: ${unit}.`);
  }
  return input;
};
