import React from "react";  

import {  
    DashboardAnimation,
    DashboardTitle,
    DashboardText,
    SearchContainer,

    EdictWrapper,
    EdictItem,
    EdictItemTitle,
    EdictItemSubtitle,
    EdictItemContentImage,
    EdictItemImage,
    EdictItemDescription,
    EdictItemDate,

    FilterIcon,
    FilterButton,

    FullPage,
    ActionsContainer,
    ContentTitle,
    ContentText,
    ActionsEnd,
    ActionsContainerEnd
    
} from "./styled";

import ContainerAuthenticated from "containers/Authenticated";
import { Row, Col } from "reactstrap";
import Input from "components/Form/Input";
import Button from "components/Form/Button";
import { useHistory } from "react-router-dom";
import useController from "./controller";
import { parseStrapiImage } from "utils";
import { Load, LoadCenter } from "ui/styled";

export default function DashboardEdict(){  

    const history = useHistory(); 
    const navigate = to => history.push(`/${ to }`); 

    const { loading, register, id } = useController()

    return ( 
        <>
            <ContainerAuthenticated sided={"activities"}> 
                <Row>
                    <Col>
                        {
                            loading  ? 
                            <LoadCenter>
                                <Load /> 
                            </LoadCenter>
                                :
                            <FullPage>
                                <ActionsEnd>
                                    <ActionsContainerEnd>
                                        <Button primary nospace onClick={() => history.goBack()}>Voltar</Button>
                                    </ActionsContainerEnd>
                                </ActionsEnd>
                                <DashboardTitle centred>{ register?.title }</DashboardTitle>
                                <EdictWrapper>
                                    <EdictItem> 
                                        <EdictItemContentImage>
                                            <EdictItemImage />
                                        </EdictItemContentImage> 
                                    </EdictItem>
                                </EdictWrapper>
                                <ActionsContainer>
                                    <Button primary onClick={() => navigate(`activities/create/article/${ id }`)}>Enviar artigo</Button>
                                    { register?.file?.url ? <Button primary onClick={() => window.open( parseStrapiImage(register?.file?.url) , "download")}>Baixar edital</Button> : null }
                                </ActionsContainer>

                                <ContentTitle>Informações</ContentTitle>
                                <ContentText>
                                    <b>Sobre o edital</b><br />
                                    { register?.text }
                                </ContentText>
                            </FullPage>
                        }
                    </Col>
                </Row>
            </ContainerAuthenticated> 
        </>
    );
}