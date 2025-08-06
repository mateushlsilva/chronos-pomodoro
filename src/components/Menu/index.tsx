import { HouseIcon, HistoryIcon, SettingsIcon, SunIcon, MoonIcon } from 'lucide-react'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'

type AvailableThemes = 'dark' | 'light';

export function Menu(){
    const [ theme, setTheme ] = useState<AvailableThemes>(() => {
        const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark'
        return storageTheme
    });

    const handleThemeChange = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();        
        setTheme(prev => {
            const nextTheme = prev === 'dark' ? 'light' : 'dark';
            return nextTheme
        })
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
        return () => {}
    }, [theme])
    return (
        <nav className={styles.menu}> 
            <a className={styles.menuLink} href="#" aria-label='Ir para a Home' title='Ir para a Home'>
                <HouseIcon/>
            </a> 
            <a className={styles.menuLink} href="#" aria-label='Ver Histórico' title='Ver Histórico'>
                <HistoryIcon/>
            </a>
            <a className={styles.menuLink} href="#" aria-label='Configurações' title='Configurações'>
                <SettingsIcon/>
            </a>
            <a className={styles.menuLink} href="#" aria-label='Mudar Tema' title='Mudar Tema' onClick={handleThemeChange}>
                {theme === 'dark' ? <SunIcon/> : <MoonIcon/>}
            </a>
        </nav>
    )
}