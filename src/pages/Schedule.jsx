import SchedulerProvider from "Providers/SchedulerProvider";

import Controls from "./schedule/ControlGroup/Controls";
import ProcessAnimationViewer from "./schedule/ProcessAnimationView";

export default function Scheduller() {
  return (
    <div className="md:h-full w-full flex flex-col md:flex-row gap-8 relative">
      <SchedulerProvider>
        <Controls />
        <ProcessAnimationViewer />
      </SchedulerProvider>
    </div>
  );
}
