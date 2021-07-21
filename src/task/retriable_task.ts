import Task from './task';

const waitFor = (time: number) => {
  return new Promise((resolve: Function) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export class RetriableTask extends Task {
  protected maxRetry: number = 3;
  protected interval: number = 1000;

  async beginTask() {
    for (let i=0; i < this.maxRetry; i++) {
      try {
        await this.execute();
        break;
      } catch(e) {
        await waitFor(this.interval);
      }
    }
  }
}
