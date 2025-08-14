import { useEffect } from "react"

type TitlePagesProps = {
    title: string | null
}

export function TitlePages({ title }: TitlePagesProps){
    useEffect(() => {
        if (title){
            document.title = `${title} - Chronos Pomodoro`
        }else{
            document.title = `Chronos Pomodoro`
        }
    },[title])
    
    return null
}