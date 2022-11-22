import styled from "styled-components";
import ButtonGroup from "../components/adminPanel/ButtonGroup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ControlPanel = styled.div`
    display: flex;
    flex-direction: row;
`

export default function AdminPanel() {
    return(
        <Container>
            <div>
                <ButtonGroup />
            </div>
            <div>
                
            </div>

        </Container>

    )
}