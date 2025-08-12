import { useEffect, useReducer, useRef } from "react"
import { initialTaskState } from "./initialTaskState"
import { TaskContext } from "./TaskContext"
import { taskReducer } from "./taskReducer"
import { TimerWorkerManager } from "../../workers/TimerWorkerManager"
import { TaskActionTypes } from "./taskActions"
import { loadBeep } from "../../utils/loadBeep"

type TaskContextProviderProps = {
    children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps){
    const [ state, dispatch ] = useReducer(taskReducer ,initialTaskState)
    const playBeep = useRef<() => void | null>(null)

    const worker = TimerWorkerManager.getInstance()

    worker.onmessage(e => {
        const countDownSeconds = e.data;
        console.log(countDownSeconds)

        if(countDownSeconds <= 0){
            if (playBeep.current){
                playBeep.current()
                playBeep.current = null
            }
            dispatch({ type: TaskActionTypes.COMPLETE_TASK })
            worker.terminate()
        }else{
            dispatch({ type: TaskActionTypes.COUNT_DOWN, payload: { secondsRemaining: countDownSeconds }})
        }
    })

    useEffect(() => {
        if(!state.activeTask){
            worker.terminate()
            console.log('Worker terminado por falta de activeTask');
        }
        worker.postMessage(state)
    }, [worker ,state])

    useEffect(() => {
        if(state.activeTask && playBeep.current === null){
            playBeep.current = loadBeep()
        }else {
            playBeep.current = null
        }
    }, [state.activeTask])

    return (
        <TaskContext.Provider value={{ state, dispatch }}> {children} </TaskContext.Provider>
    )
}