import styled from "styled-components";
import ButtonGroup from "../../components/adminPanel/ButtonGroup";
import ElementsButtonGroup from "../../components/adminPanel/elementsButtonGroup";
import OpinionsDataGrid from "../../components/adminPanel/dataGrids/opinionsDataGrid";

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

export default function AdminPanelOpinions() {
    return(
        <Container>
            <Div>
                <ElementsButtonGroup />
            </Div>
            <Div>
                <ButtonGroup />
            </Div>
            <Div>
                <OpinionsDataGrid />
            </Div>

        </Container>

    )
}