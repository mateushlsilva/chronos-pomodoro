import styles from './styles.module.css'; 

type ConteinerProps = {
    children: React.ReactNode;
}

export function Conteiner({ children }:ConteinerProps){
    
    return (
        <div className={ styles.conteiner }>
            <div className={ styles.content }>{ children }</div>
        </div>
    )
}