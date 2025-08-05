import styles from './styles.module.css'

type DefaultInputProps = {
    id: string
    label?: string
    input?: string
} & React.ComponentProps<'input'>

export function DefaultInput({ id, input, label, type, ...rest }: DefaultInputProps){
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <input className={styles.input} id={id} type={type} defaultValue={input} {...rest}/>
        </>
    )
}