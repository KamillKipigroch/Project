import styled from "styled-components";
import UserOrdersDataGrid from "../components/UserOrders/UserOrdersDataGrid";

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

const UserOrders = () => {
  return (
    <Container>
      <Div>
        <UserOrdersDataGrid />
      </Div>
    </Container>
  );
};

export default UserOrders;
