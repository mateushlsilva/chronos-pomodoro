import type { TaskModel } from "../models/TaskModels";

export function getNextCycleType(currentCycle: number): TaskModel['type']{
    if (currentCycle === 8) return 'longBreakTime'
    else if(currentCycle % 2 === 0) return 'shortBreakTime'
    return 'workTime'
}