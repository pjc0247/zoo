import nodeSchedule from 'node-schedule';

import Task from './task';

export const schedule = (time: string) => {
  return (ctor: any) => {
    const inst = (new ctor()) as Task;

    if (!(inst instanceof Task)) {
      console.error(`'${ctor.name}' won't be scheduled since it does not extend 'Task'.`);
      return;
    }

    nodeSchedule.scheduleJob(time, () => {
      inst.execute();
    });
  };
}

@schedule('0/1 * * * * *')
class boo extends Task {
  execute() {
    console.log('1');
  }
}
