import styled from "styled-components";
import UsersDataGrid from "../../components/adminPanel/dataGrids/UsersDataGrid";
import ElementsButtonGroup from "../../components/adminPanel/elementsButtonGroup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  border-radius: 15px;
  margin: 10px;
`;

const AdminPanelUsers = () => {
  return (
    <Container>
      <Div>
        <ElementsButtonGroup />
      </Div>
      <Div>
      </Div>
      <Div>
        <UsersDataGrid />
      </Div>
    </Container>
  );
};

export default AdminPanelUsers;
