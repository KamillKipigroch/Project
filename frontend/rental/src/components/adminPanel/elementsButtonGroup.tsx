import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#DD5353",
    '&:hover': {
      backgroundColor: "#B73E3E",
    },
  }));

export default function ElementsButtonGroup() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <ColorButton variant="contained" href="http://localhost:3000/adminpanelcategories">Categories</ColorButton>
        <ColorButton variant="contained" href="http://localhost:3000/adminpanelconditions">Conditions</ColorButton>
        {/* <ColorButton variant="contained" href="http://localhost:3000/adminpanelopinions">Opinions</ColorButton> */}
        <ColorButton variant="contained" href="http://localhost:3000/adminpanelorderstatuses">Order statuses</ColorButton>
        <ColorButton variant="contained" href="http://localhost:3000/adminpanelproducts">Products</ColorButton>
        <ColorButton variant="contained" href="http://localhost:3000/adminpanelproducttypes">Product types</ColorButton>
        <ColorButton variant="contained" href="http://localhost:3000/adminpanelqualities">Qualities</ColorButton>
        <ColorButton variant="contained" href="http://localhost:3000/adminpanelsubcategories">Subcategory</ColorButton>
        <ColorButton variant="contained" href="http://localhost:3000/adminPanelOrders">Orders</ColorButton>
      </ButtonGroup>
    </Box>
  );
}