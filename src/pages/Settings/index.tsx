import { Conteiner } from "../../components/Conteine";
import { Heading } from "../../components/Heading";
import { SettingsForm } from "../../components/SettingsForm";
import { TitlePages } from "../../components/TitlePages";
import { MainTemplate } from "../../templates/MainTemplate";

export function Settings() {

    return (
        <MainTemplate>
            <TitlePages title={'Configurações'}/>
            <Conteiner>
                <Heading>Configurações</Heading>
            </Conteiner>
            <Conteiner>
                <p style={{ textAlign: 'center' }}>
                    Modifique as configurações para tempo de foco, descanso curso e
                    descanso longo.
                </p>
            </Conteiner>
            <Conteiner>
                <SettingsForm />
            </Conteiner>
        </MainTemplate>
    )
}

