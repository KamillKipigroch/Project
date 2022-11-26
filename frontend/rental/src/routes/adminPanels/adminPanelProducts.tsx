import styled from "styled-components";
import ButtonGroup from "../../components/adminPanel/ButtonGroup";
import ElementsButtonGroup from "../../components/adminPanel/elementsButtonGroup";
import ProductsDataGrid from '../../components/adminPanel/dataGrids/productsDataGrid';
import PopupProduct from "../../components/adminPanel/popups/PopupProduct";

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

export default function AdminPanelProducts() {
    return(
        <Container>
            <Div>
                <ElementsButtonGroup />
            </Div>
            <Div>
                <PopupProduct />
            </Div>
            <Div>
                <ProductsDataGrid />
            </Div>

        </Container>

    )
}