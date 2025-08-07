import type { TaskModel } from "./TaskModels"

export type TaskStateModel = {
    tasks: TaskModel[];
    secondsRemaining: number;
    formattedSecondsRemaining: string;
    activeTask: TaskModel | null;
    currentCycle: number;
    config: {
        workTime: number  ;
        shortBreakTime: number;
        longBreakTime: number ;
    }
}