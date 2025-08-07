import { PlayCircleIcon, StopCircleIcon } from 'lucide-react'
import { Cycles } from '../Cycles'
import { DefaultButton } from '../DefaultButton'
import { DefaultInput } from '../DefaultInput'
import styles from './styles.module.css'
import { useState } from 'react'
import type { TaskModel } from '../../models/TaskModels'
import { useTaskContext } from '../../hooks/TaskHook'
import { getNextCycle } from '../../utils/getNextCycle'
import { getNextCycleType } from '../../utils/getNextCycleType'
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes'

export function MainForm() {
    const [taskName, setTaskName] = useState<string>("")
    const { state, setState } = useTaskContext()

    const nextCycle = getNextCycle(state.currentCycle)
    const nextCycleType = getNextCycleType(nextCycle)

    const handleCreateNewTask = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (taskName?.trim().length <= 0) {
            alert('Digite o nome da tarefa')
            return;
        }
        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName.trim(),
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType
        }

        const secondsRemaining = newTask.duration * 60;

        setState(prev => {
            return {
                ...prev,
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining,
                formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
                tasks: [...prev.tasks, newTask]
            }
        })
    }

    const handleInterruptTask = () => {
        setState(prev => {
            return {
                ...prev,
                activeTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: '00:00',
                tasks: prev.tasks.map(task => {
                    if (prev.activeTask && prev.activeTask.id === task.id){
                        return { ...task, interruptDate: Date.now() }
                    }
                    return task     
                })
            }
        })
    }
    return (
        <form onSubmit={handleCreateNewTask} action="" className={styles.form}>
            <div className={styles.formRow}>
                <DefaultInput id='input' label='task' type='text' placeholder='Digite aqui...' onChange={(e) => setTaskName(e.target.value)} value={taskName} disabled={!!state.activeTask} />
            </div>
            <div className={styles.formRow}>
                <p>Próximo intervalo é de {state.config[nextCycleType]} min</p>
            </div>
            {state.currentCycle > 0 && (
                <div className={styles.formRow}>
                    <Cycles />
                </div>
            )}

            <div className={styles.formRow}>
                {!state.activeTask && (
                    <DefaultButton aria-label='Iniciar nova tarefa' title='Iniciar nova tarefa' type='submit' icon={<PlayCircleIcon />} color='green' key={'submit_key'}/>
                )} 
                {!!state.activeTask && (
                    <DefaultButton aria-label='Parar tarefa' title='Parar tarefa' type='button' icon={<StopCircleIcon />} color='red' onClick={handleInterruptTask} key={'button_key'}/>
                )}
            </div>
        </form>
    )
}