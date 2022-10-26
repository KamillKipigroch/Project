import styled from '@emotion/styled';

const container = {
    backgroundColor: "theme.palette.background.paper",
    padding: "theme.spacing(8, 0, 6)"
};

const buttons = styled.div`
    marginTop: 40px
`;

const cardGrid = styled.div`
    padding: '20px 0'
`;

const card = styled.div`
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
`;

const cardMedia = styled.div`
    paddingTop: '56.25%'
`;

const cardContent = styled.div`
    flexGrow: '1',
`;

export default { container, buttons, cardGrid, card, cardMedia, cardContent };