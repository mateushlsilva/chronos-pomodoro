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
import { useEffect, useState } from "react";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { showMessage } from "../../adapters/showMessage";
import { TitlePages } from "../../components/TitlePages";

export function History() {
    const { state, dispatch } = useTaskContext()
    const hasTask = state.tasks.length > 0;
    const [confirmClearHistory, setConfirmClearHistory] = useState(false);
    const [sortedTaksOptions, setSortedTaksOptions] = useState<SortTasksOptions>(() => {
        return {
            tasks: sortTasks({ tasks: state.tasks }),
            field: 'startDate',
            direction: 'desc'
        }
    });
    const TaskTypeDic = {
        workTime: 'Foco',
        shortBreakTime: 'Descanso curto',
        longBreakTime: 'Descanso longo'
    }

    useEffect(() => {
        setSortedTaksOptions(prev => ({
            ...prev,
            tasks: sortTasks({
                tasks: state.tasks,
                direction: prev.direction,
                field: prev.field,
            }),
        }))
    }, [state.tasks])

    useEffect(() => {
        if (!confirmClearHistory) return;

        setConfirmClearHistory(false);

        dispatch({ type: TaskActionTypes.RESET_STATE });
    }, [confirmClearHistory, dispatch]);

    useEffect(() => {
        return () => {
            showMessage.dismiss()
        }
    },[])

    function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
        const newDirection = sortedTaksOptions.direction === 'desc' ? 'asc' : 'desc'

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

    function handleResetHistory() {
        showMessage.confirm('Tem certeza?', confirmation => {
            setConfirmClearHistory(confirmation);
        });
    }

    return (
        <MainTemplate>
            <TitlePages title={'Histórico'}/>
            <Conteiner>
                <Heading>
                    <span> History </span>
                    {hasTask && (
                        <span className={styles.buttonContainer}>
                            <DefaultButton
                                icon={<TrashIcon />}
                                color="red"
                                aria-label="Apagar todo o histórico"
                                title="Apagar histórico"
                                onClick={handleResetHistory}
                            />
                        </span>
                    )}
                </Heading>
            </Conteiner>
            <Conteiner>
                {hasTask && (
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
                )}
                {!hasTask && (
                    <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Ainda não existe tarefas criadas.</p>
                )}
            </Conteiner>
        </MainTemplate>
    )
}

