import './styles/theme.css'
import './styles/global.css'
import { Conteiner } from './components/Conteine'
import { Logo } from './components/Logo'
import { Menu } from './components/Menu'

function App() {

  return (
    <>
      <Conteiner>
        <Logo/>
      </Conteiner>
      <Conteiner>
        <Menu/>
      </Conteiner>
      <Conteiner>
        <section>
          Form 
        </section>
      </Conteiner>
      <Conteiner>
        <section>
          Footer
        </section>
      </Conteiner>
    </>
  )
}

export default App
