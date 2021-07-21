import { RetriableTask } from './retriable_task';

export class InlineTask {
  static runRetriableTask(task: Function, maxRetry = 3, interval = 1000) {
    const klass = class InlineRetriableTask extends RetriableTask {
      maxRetry = maxRetry;
      interval = interval;

      execute() {
        return task();
      }
    };

    (new klass()).beginTask();
  }
};
