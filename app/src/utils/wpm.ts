export const calculateWpm = (done: number, timeInSec: number): number => {
  const divider = timeInSec / 60;
  return Math.round(done / divider / 5);
};

/**
 * returns current timestamp rounded to nearest second
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const currentTimestampSec = (): number =>
  Math.round(new Date().getTime() / 1000);
