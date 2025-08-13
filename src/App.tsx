import './styles/theme.css'
import './styles/global.css'

import { TaskContextProvider } from './contexts/TaskContext'
import { MessagesContainer } from './components/MessagesContainer'
import { AppRoutes } from './routes'

function App() {

  return (
    <TaskContextProvider>
      <MessagesContainer>
        <AppRoutes/>
      </MessagesContainer>
    </TaskContextProvider>
  )
}

export default App
