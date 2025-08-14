import { useTaskContext } from '../../hooks/TaskHook'
import { getNextCycle } from '../../utils/getNextCycle'
import { getNextCycleType } from '../../utils/getNextCycleType'
import styles from './styles.module.css'

export function Cycles(){
    const { state } = useTaskContext()
    const cycleStep = Array.from({ length: state.currentCycle })

    const cycleDescriptionMap = {
        workTime: 'foco',
        shortBreakTime: 'descanso curto',
        longBreakTime: 'descanso longo'
    }
    return (
        <div className={styles.cycles}> 
            <span>Ciclos:</span>
            <div className={styles.cycleDots}>
                {cycleStep.map((_, index) => {
                    return (
                        <span
                            id={`${getNextCycle(index)}_${[getNextCycleType(getNextCycle(index))]}`} 
                            className={`${styles.cycleDot} ${styles[getNextCycleType(getNextCycle(index))]}`} 
                            aria-label={`Indicador de cliclo de ${cycleDescriptionMap[getNextCycleType(getNextCycle(index))]}`}
                            title={`Indicador de cliclo de ${cycleDescriptionMap[getNextCycleType(getNextCycle(index))]}`}
                        ></span> 
                    )
                })}
            </div>
        </div>
    )
}