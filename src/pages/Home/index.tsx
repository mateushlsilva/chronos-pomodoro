import { Conteiner } from "../../components/Conteine";
import { CountDown } from "../../components/CountDown";
import { MainForm } from "../../components/MainForm";
import { MainTemplate } from "../../templates/MainTemplate";

export function Home() {

    return (
        <MainTemplate>
            <Conteiner>
                <CountDown />
            </Conteiner>
            <Conteiner>
                <MainForm />
            </Conteiner>
        </MainTemplate>
    )
}

