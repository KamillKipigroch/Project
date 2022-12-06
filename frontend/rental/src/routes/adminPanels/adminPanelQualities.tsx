import styled from "styled-components";
import ButtonGroup from "../../components/adminPanel/ButtonGroup";
import ElementsButtonGroup from "../../components/adminPanel/elementsButtonGroup";
import QualitiesDataGrid from "../../components/adminPanel/dataGrids/qualitiesDataGrid";
import Popup from "../../components/adminPanel/popups/PopupQuality";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Div = styled.div`
    display: flex;
    justify-content: flex-start;
    border-radius: 15px;
    margin: 10px;
`

export default function AdminPanelQualities() {
    return(
        <Container>
            <Div>
                <ElementsButtonGroup />
            </Div>
            <Div>
                {/* <ButtonGroup /> */}
                <Popup />
            </Div>
            <Div>
                <QualitiesDataGrid />
            </Div>

        </Container>

    )
}