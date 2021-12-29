import Task from './task';

const waitFor = (time: number) => {
  return new Promise((resolve: Function) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export enum RetryIntervalType {
  Linear = 'linear',
  Exponential = 'exponential',
};

export class RetriableTask extends Task {
  protected maxRetry: number = 3;
  protected interval: number = 1000;
  protected intervalType: RetryIntervalType = RetryIntervalType.Exponential;

  async beginTask() {
    for (let i=0; i < this.maxRetry; i++) {
      try {
        await this.execute();
        break;
      } catch(e) {
        await waitFor(this.getNextDelay(i));
      }
    }
  }

  private getNextDelay(tryCount: number) {
    if (this.intervalType === RetryIntervalType.Linear)
      return this.interval;
    else if (this.intervalType === RetryIntervalType.Exponential)
      return Math.pow(2, tryCount) * this.interval;
  }
}
