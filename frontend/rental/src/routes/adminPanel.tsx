import styled from "styled-components";
import ButtonGroup from "../components/adminPanel/ButtonGroup";
import ProductsDataGrid from '../components/adminPanel/productsDataGrid';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ControlPanel = styled.div`
    display: flex;
    flex-direction: row;
`

const Div = styled.div`
    background-color: #EDDBC0;
    // height: 500px;
    display: flex;
    justify-content: flex-start;
    border-radius: 15px;
    margin: 10px;
`

export default function AdminPanel() {
    return(
        <Container>
            <Div>
                <ButtonGroup />
            </Div>
            <Div>
                <ProductsDataGrid />
            </Div>

        </Container>

    )
}