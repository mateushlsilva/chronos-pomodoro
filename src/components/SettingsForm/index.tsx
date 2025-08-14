
import { SaveIcon } from 'lucide-react'
import { DefaultButton } from '../DefaultButton'
import { DefaultInput } from '../DefaultInput'
import styles from './styles.module.css'
import { useRef } from 'react'
import { useTaskContext } from '../../hooks/TaskHook'
import { showMessage } from '../../adapters/showMessage'
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions'


export function SettingsForm() {
    const { state, dispatch } = useTaskContext()
    const workTimeInputRef = useRef<HTMLInputElement>(null)
    const shortBreakTimeInputRef = useRef<HTMLInputElement>(null)
    const longBreakTimeInputRef = useRef<HTMLInputElement>(null)

    type validatedProps = {
        time: number,
        intervalo: {
            inicio: number,
            fim: number
        },
        frase: string
    }
    function validatedTimeInput({ time, intervalo, frase }: validatedProps) : boolean{
        if (time < intervalo.inicio || time > intervalo.fim) {
            showMessage.error(frase)
            return true
        }
        return false
    }

    function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const workTime = Number(workTimeInputRef.current?.value)
        const shortBreak = Number(shortBreakTimeInputRef.current?.value)
        const longBreakTime = Number(longBreakTimeInputRef.current?.value)

        if (isNaN(workTime) || isNaN(shortBreak) || isNaN(longBreakTime)) {
            showMessage.error('Digite apenas números para TODOS os campos.')
            return
        }
        if (
            validatedTimeInput({time: workTime, intervalo: { inicio: 1, fim: 99 }, frase: 'Digite valores entre 1 à 99 para foco.'}) ||
            validatedTimeInput({time: shortBreak, intervalo: { inicio: 1, fim: 30 }, frase: 'Digite valores entre 1 à 30 para descanso curto.'}) ||
            validatedTimeInput({time: longBreakTime, intervalo: { inicio: 1, fim: 60 }, frase: 'Digite valores entre 1 à 60 para descanso longo.'})
        ){
            return
        }
        dispatch({ type: TaskActionTypes.CHANGE_SETTINGS, payload: { workTime: workTime, longBreakTime: longBreakTime, shortBreakTime: shortBreak } })
        showMessage.success('Configurações Salvas.')
    }


    return (
        <form onSubmit={handleSaveSettings} action="" className={styles.form}>
            <div className={styles.formRow}>
                <DefaultInput id='workTime' label='Foco' ref={workTimeInputRef} defaultValue={state.config.workTime} type='number'/>
            </div>
            <div className={styles.formRow}>
                <DefaultInput id='shortBreakTime' label='Descanso curto' ref={shortBreakTimeInputRef} defaultValue={state.config.shortBreakTime} type='number' />
            </div>
            <div className={styles.formRow}>
                <DefaultInput id='longBreakTime' label='Descanso longo' ref={longBreakTimeInputRef} defaultValue={state.config.longBreakTime} type='number'/>
            </div>
            <div className={styles.formRow}>
                <DefaultButton
                    icon={<SaveIcon />}
                    aria-label='Salvar configurações'
                    title='Salvar configurações'
                />
            </div>
        </form>
    )
}