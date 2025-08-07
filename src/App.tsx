import './styles/theme.css'
import './styles/global.css'

import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { AbountPomodoro } from './pages/AbountPomodoro'
import { TaskContextProvider } from './contexts/TaskContext'

function App() {

  return (
    <TaskContextProvider>
     <Home/> 
    </TaskContextProvider>
  )
}

export default App
