import Button from "@mui/material/Button";
import styled from "styled-components";
import ButtonGroup from "../../components/adminPanel/ButtonGroup";
import CategoriesDataGrid from "../../components/adminPanel/dataGrids/categoriesDataGrid";
import ElementsButtonGroup from "../../components/adminPanel/elementsButtonGroup";
import PopupCategory from "../../components/adminPanel/popups/PopupCategory";

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

export default function AdminPanelCategories() {
    return(
        <Container>
            <Div>
                <ElementsButtonGroup />
            </Div>
            <Div>
                <PopupCategory />
            </Div>
            <Div>
                <CategoriesDataGrid />
            </Div>
        </Container>

    )
}

function AlertDialogSlide() {
    throw new Error("Function not implemented.");
}
