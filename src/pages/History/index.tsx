import { TrashIcon } from "lucide-react";
import { Conteiner } from "../../components/Conteine";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

import styles from './styles.module.css'
import { useTaskContext } from "../../hooks/TaskHook";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import { useState } from "react";

export function History() {
    const { state } = useTaskContext()
    const [ sortedTaksOptions, setSortedTaksOptions ] = useState<SortTasksOptions>(() => {
        return {
            tasks: sortTasks({ tasks: state.tasks }),
            field: 'startDate',
            direction: 'desc'
        }
    });
    const TaskTypeDic = {
        workTime: 'Foco',
        shortBreakTime: 'Descanso curto',
        longBreakTime:  'Descanso longo'
    }

    function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>){
        const newDirection = sortedTaksOptions.direction === 'desc' ? 'asc': 'desc'

        setSortedTaksOptions({
            tasks: sortTasks({
                tasks: sortedTaksOptions.tasks,
                direction: newDirection,
                field,
            }),
            direction: newDirection,
            field
        })
    }

    return (
        <MainTemplate>
            <Conteiner>
                <Heading>
                    <span> History </span>
                    <span className={styles.buttonContainer}>
                        <DefaultButton
                            icon={<TrashIcon />}
                            color="red"
                            aria-label="Apagar todo o histórico"
                            title="Apagar histórico"
                        />
                    </span>
                </Heading>
            </Conteiner>
            <Conteiner>
                <div className={styles.resposiveTable}>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSortTasks({ field: 'name' })} className={styles.thSort}>Tarefa ↕</th>
                                <th onClick={() => handleSortTasks({ field: 'duration' })} className={styles.thSort}>Duração ↕</th>
                                <th onClick={() => handleSortTasks({ field: 'startDate' })} className={styles.thSort}>Data ↕</th>
                                <th>Status</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTaksOptions.tasks.map((task) => {
                                return (
                                    <tr key={task.id}>
                                        <td>{task.name}</td>
                                        <td>{task.duration}min</td>
                                        <td>{formatDate(task.startDate)}</td>
                                        <td>{getTaskStatus(task, state.activeTask)}</td>
                                        <td>{TaskTypeDic[task.type]}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </Conteiner>
        </MainTemplate>
    )
}

