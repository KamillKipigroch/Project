import styled from "styled-components";
import ElementsButtonGroup from "../../components/adminPanel/elementsButtonGroup";
import SubCategoriesDataGrid from "../../components/adminPanel/dataGrids/subcategoriesDataGrid";
import Popup from "../../components/adminPanel/popups/PopupSubCategory";

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

export default function AdminPanelSubCategories() {
    return(
        <Container>
            <Div>
                <ElementsButtonGroup />
            </Div>
            <Div>
                <Popup />
            </Div>
            <Div>
                <SubCategoriesDataGrid />
            </Div>
        </Container>

    )
}