import { Conteiner } from "../../components/Conteine";
import { CountDown } from "../../components/CountDown";
import { MainForm } from "../../components/MainForm";
import { TitlePages } from "../../components/TitlePages";
import { MainTemplate } from "../../templates/MainTemplate";

export function Home() {

    return (
        <MainTemplate>
            <TitlePages title={null}/>
            <Conteiner>
                <CountDown />
            </Conteiner>
            <Conteiner>
                <MainForm />
            </Conteiner>
        </MainTemplate>
    )
}

