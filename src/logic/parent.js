class base {
  constructor() {
    this.processes = [];
    this.time = 0;
    this.steps = [];
  }
  addProcess(task) {
    this.processes.push(task);
  }
  schedule() {}

  printTable() {
    console.log("Process\tWaiting Time\tTurnaround Time");
    this.processes.forEach((process) => {
      console.log(
        `${process.id}\t${process.waiting_time}\t${process.turnaround_time}`
      );
    });
  }
  printSteps() {
    console.log(this.steps);
  }
  getSteps() {
    return [...this.steps];
  }
}

export default base;
