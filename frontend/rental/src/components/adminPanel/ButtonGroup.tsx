import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import AlertDialogSlide from './popups/PopupCategory';
import PopupCategory from './popups/PopupCategory';
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

export default function VariantButtonGroup() {
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
        {/* <ColorButton
          onClick={() => {
            AlertDialogSlide();
          }}>Save changes
        </ColorButton> */}
        <PopupCategory />
      </ButtonGroup>
    </Box>
  );
}