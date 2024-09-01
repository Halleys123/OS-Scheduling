import base from "./parent.js";
import Process from "./process.js";

class priorityNonPreemptive extends base {
  constructor() {
    super();
  }
  schedule() {
    // mark active process as active

    const processes = this.processes;
    processes.sort((a, b) => a.arrival_time - b.arrival_time);

    let currentProcessIndex = 0;

    while (processes.some((p) => p.remaining_time > 0)) {
      const currentProcess = processes.find((p, index) => {
        if (
          index >= currentProcessIndex &&
          p.arrival_time <= this.time &&
          p.remaining_time > 0
        ) {
          currentProcessIndex = index;
          return true;
        }
        return false;
      });

      if (!currentProcess) {
        this.time++;
      } else {
        let highestPriority = 0;
        let highestPriorityIndex = 0;
        for (let i = 0; i < processes.length; i++) {
          if (
            processes[i].arrival_time <= this.time &&
            processes[i].remaining_time > 0
          ) {
            if (processes[i].priority > highestPriority) {
              highestPriority = processes[i].priority;
              highestPriorityIndex = i;
            }
          }
        }

        const currentProcess = processes[highestPriorityIndex];

        currentProcess.remaining_time--;
        this.time++;

        if (currentProcess.remaining_time === 0) {
          currentProcess.turnaround_time =
            this.time - currentProcess.arrival_time;
          currentProcess.waiting_time =
            currentProcess.turnaround_time - currentProcess.burst_time;
          currentProcess.completion_time = this.time;
        }
      }
      this.steps.push(this.processes.map((p) => ({ ...p })));
    }
  }
}

const test = new priorityNonPreemptive();

test.addProcess(new Process(1, 0, 5, 1));
test.addProcess(new Process(2, 1, 4, 5));
test.addProcess(new Process(3, 2, 2, 2));
test.addProcess(new Process(4, 3, 1, 4));
test.addProcess(new Process(5, 4, 2, 3));

test.schedule();
test.printTable();

export default priorityNonPreemptive;
