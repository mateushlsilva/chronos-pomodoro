import { useTaskContext } from '../../hooks/TaskHook'
import styles from './styles.module.css'

export function CountDown(){
    const { state } = useTaskContext()
    return (
        <div className={styles.container}> 
            { state.formattedSecondsRemaining }
        </div>
    )
}