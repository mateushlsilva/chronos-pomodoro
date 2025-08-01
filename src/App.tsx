import './styles/theme.css'
import './styles/global.css'
import { Conteiner } from './components/Conteine'
import { Logo } from './components/Logo'

function App() {

  return (
    <>
      <Conteiner>
        <Logo/>
      </Conteiner>
      <Conteiner>
        <section>
          Menu
        </section>
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
