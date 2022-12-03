import * as React from 'react';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from "styled-components";
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


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

    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
            <Button color="secondary" variant="contained" onClick={handleClickOpen}>
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
                        <Element>
                            <TextField
                                required
                                id="outlined-required"
                                label="Description"
                            />
                        </Element>
                        <Element>
                            <TextField
                                required
                                id="outlined-number"
                                label="Price"
                                type="number"
                            />
                        </Element>
                        <Element>
                            <TextField
                                required
                                id="outlined-required"
                                label="Hero"
                            />
                        </Element>
                        <Element>
                            <TextField
                                required
                                id="outlined-number"
                                label="Product type ID"
                                type="number"
                            />
                        </Element>
                        <Element>
                            <TextField
                                required
                                id="outlined-number"
                                label="Subcategory ID"
                                type="number"
                            />
                        </Element>
                        <Element>
                            <TextField
                                required
                                id="outlined-number"
                                label="Condition ID"
                                type="number"
                            />
                        </Element>
                        <Element>
                            <TextField
                                required
                                id="outlined-number"
                                label="Quality ID"
                                type="number"
                            />
                        </Element>
                        <Element>
                        <Button variant="contained" component="label">
                            Upload image
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>
                        </Element>
                    </Div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}