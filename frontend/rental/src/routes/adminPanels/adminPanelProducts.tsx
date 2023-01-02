import styled from "styled-components";
import ElementsButtonGroup from "../../components/adminPanel/elementsButtonGroup";
import ProductsDataGrid from '../../components/adminPanel/dataGrids/productsDataGrid';
import PopupProduct from "../../components/adminPanel/popups/PopupProduct";
import PopupProductPhoto from "../../components/adminPanel/popups/PopupProductPhoto";
import PopupProductPhotoDetails from "../../components/adminPanel/popups/PopupProductPhotoDetails";

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

export default function AdminPanelProducts() {
    return(
        <Container>
            <Div>
                <ElementsButtonGroup />
            </Div>
            <Div>
                <PopupProduct />
                <PopupProductPhoto />
                <PopupProductPhotoDetails />
            </Div>
            <Div>
                <ProductsDataGrid />
            </Div>

        </Container>

    )
}