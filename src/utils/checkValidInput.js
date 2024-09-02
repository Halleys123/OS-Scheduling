function checkValidInput({
  arrivalTime,
  burstTime,
  priority,
  selectedAlgorithm,
  options,
}) {
  let valid = false;

  let arrival_array = arrivalTime.trim().split(" ");
  let burst_array = burstTime.trim().split(" ");
  let priority_array = priority.trim().split(" ");

  if (!arrivalTime || !burstTime) return valid;
  if (!selectedAlgorithm) return valid;
  if (
    options
      .find((o) => o.value === selectedAlgorithm)
      .requirements.includes("Priority")
  ) {
    valid =
      arrival_array.length === burst_array.length &&
      burst_array.length === priority_array.length;
    // no two priorities should have same value
    if (valid) {
      let priority_set = new Set(priority_array);
      valid = priority_set.size === priority_array.length;
    }
  } else {
    valid = arrival_array.length === burst_array.length;
  }
  return valid;
}

export default checkValidInput;
