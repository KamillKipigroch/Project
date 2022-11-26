import styled from "styled-components";
import ButtonGroup from "../../components/adminPanel/ButtonGroup";
import OrderStatusDataGrid from "../../components/adminPanel/orderStatusesDataGrid";

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

export default function AdminPanelOrderStatuses() {
    return(
        <Container>
            <Div>
                <ButtonGroup />
            </Div>
            <Div>
                <OrderStatusDataGrid />
            </Div>

        </Container>

    )
}