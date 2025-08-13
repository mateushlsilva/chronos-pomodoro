import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Home } from "../pages/Home";
import { AbountPomodoro } from "../pages/AbountPomodoro";
import { NotFound } from "../pages/NotFound";
import { useEffect } from "react";
import { History } from "../pages/History";


function ScrollToTop(){
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [pathname])
    return null
}

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/abount-pomodoro' element={<AbountPomodoro />} />
                <Route path='/history' element={<History />} />
                <Route path='*' element={<NotFound />} />

            </Routes>
            <ScrollToTop/>
        </BrowserRouter>
    )
}