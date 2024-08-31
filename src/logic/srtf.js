import base from "./parent.js";

class shortestRemainingTimeFirst extends base {
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

      const currentProcess = avaialableProcesses.toSorted((a, b) => {
        return a.remaining_time - b.remaining_time;
      })[0];

      if (!currentProcess) {
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

export default shortestRemainingTimeFirst;
