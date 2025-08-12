import './styles/theme.css'
import './styles/global.css'

import { Home } from './pages/Home'
//import { NotFound } from './pages/NotFound'
//import { AbountPomodoro } from './pages/AbountPomodoro'
import { TaskContextProvider } from './contexts/TaskContext'
import { MessagesContainer } from './components/MessagesContainer'

function App() {

  return (
    <TaskContextProvider>
      <MessagesContainer>
        <Home />
      </MessagesContainer>
    </TaskContextProvider>
  )
}

export default App
