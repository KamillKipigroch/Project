import styled from "styled-components";
import ButtonGroup from "../../components/adminPanel/ButtonGroup";
import CategoriesDataGrid from "../../components/adminPanel/dataGrids/categoriesDataGrid";
import ElementsButtonGroup from "../../components/adminPanel/elementsButtonGroup";

const Container = styled.div`
  background-color: #EDDBC0;
  display: flex;
  flex-direction: column;
`

const Div = styled.div`
    display: flex;
    justify-content: flex-start;
    border-radius: 15px;
    margin: 10px;
`

export default function AdminPanelCategories() {
    return(
        <Container>
            <Div>
                <ElementsButtonGroup />
            </Div>
            <Div>
                <ButtonGroup />
            </Div>
            <Div>
                <CategoriesDataGrid />
            </Div>

        </Container>

    )
}