class Process {
  constructor(id, arrival_time, burst_time, priority = null, quantum = null) {
    this.arrival_time = arrival_time;
    this.burst_time = burst_time;
    this.remaining_time = burst_time;
    this.id = id;
    this.priority = priority;
    this.quantum = quantum;
    this.active = false;
    this.completion_time = 0;
    this.turnaround_time = 0;
    this.waiting_time = 0;
    this.response_time = 0;
  }
}

export default Process;
