export function formatSecondsToMinutes(secunds: number){
    const minutos = String(Math.floor(secunds / 60)).padStart(2, '0');
    const secundsMod = String(Math.floor(secunds % 60)).padStart(2, '0');
    return `${minutos}:${secundsMod}`
}