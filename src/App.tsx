import './styles/theme.css'
import './styles/global.css'
import { Conteiner } from './components/Conteine'
import { Logo } from './components/Logo'
import { Menu } from './components/Menu'
import { CountDown } from './components/CountDown'
import { DefaultInput } from './components/DefaultInput'

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
        <CountDown/>
      </Conteiner>
      <Conteiner>
        <form action="" className="form">
          <div className="formRow">
            <DefaultInput id='input' label='task'  type='text' placeholder='Digite aqui...'/>
          </div>
          <div className="formRow">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="formRow">
            <p>0 0 0 0 0 0</p>
          </div>
          <div className="formRow">
            <button>Enviar</button>
          </div>
        </form>
      </Conteiner>
    </>
  )
}

export default App
