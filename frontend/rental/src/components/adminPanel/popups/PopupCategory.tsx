import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from "styled-components";
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      secondary: {
        main: '#DD5353',
        dark: '#B73E3E',
        contrastText: 'white',
      }
    },
  })

const Div = styled.div`
    display: flex;
    justify-content: flex-start;
    border-radius: 15px;
    margin: 10px;
    flex-direction: column;
`

const Element = styled.div`
    margin: 10px;
`

export default function Popup() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
            <Button color="secondary" variant="contained" onClick={handleClickOpen} sx={{ml: 1}}>
                New element
            </Button>
            </ThemeProvider>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add category</DialogTitle>
                <DialogContent>
                    <Div>
                        <Element>
                            <TextField
                                required
                                id="outlined-required"
                                label="Name"
                            />
                        </Element>
                    </Div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}