import base from "./parent.js";

class shortestJobFirst extends base {
  constructor() {
    super();
  }
  schedule() {
    const processes = this.processes;
    processes.sort((a, b) => a.arrival_time - b.arrival_time);

    while (processes.some((p) => p.remaining_time > 0)) {
      const avaialableProcesses = processes.filter((p) => {
        return p.arrival_time <= this.time && p.remaining_time > 0;
      });

      let currentProcess = avaialableProcesses.toSorted((a, b) => {
        return a.remaining_time - b.remaining_time;
      });

      if (currentProcess) {
        currentProcess.find((p) => p.active === true);
      }

      if (!currentProcess) {
        currentProcess = avaialableProcesses[0];
        currentProcess.active = true;
        this.time++;
      } else {
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

export default shortestJobFirst;

// ! Not working be safe don't use causing memory overflow
