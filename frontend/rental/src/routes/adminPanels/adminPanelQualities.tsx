import styled from "styled-components";
import ButtonGroup from "../../components/adminPanel/ButtonGroup";
import QualitiesDataGrid from "../../components/adminPanel/qualitiesDataGrid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Div = styled.div`
    background-color: #EDDBC0;
    // height: 500px;
    display: flex;
    justify-content: flex-start;
    border-radius: 15px;
    margin: 10px;
`

export default function AdminPanelQualities() {
    return(
        <Container>
            <Div>
                <ButtonGroup />
            </Div>
            <Div>
                <QualitiesDataGrid />
            </Div>

        </Container>

    )
}