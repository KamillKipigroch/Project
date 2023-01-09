import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {observer} from 'mobx-react-lite';
import {useStores} from '../stores/root.store';
import {useTheme} from "@mui/material";
import * as React from "react";

const mainTheme = createTheme({
    palette: {
        secondary: {
            main: '#333333'
        }
    }
});

function valuetext(value: number) {
    return `${value}°C`;
}

const RangeSlider = () => {
    const {productStore} = useStores();
    const theme = useTheme();

    return (
        <Box sx={{width: 200}}>
            <ThemeProvider theme={mainTheme}>
                <Slider
                    min={productStore.priceMin}
                    max={productStore.maxPriceValue}
                    getAriaLabel={() => 'Temperature range'}
                    value={productStore.priceValue}
                    onChange={productStore.handlePriceRangeFilterChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    color={theme.palette.mode === "light" ? (
                        "secondary"
                    ) : (
                        "primary"
                    )}
                />
            </ThemeProvider>
        </Box>
    );
}

export default observer(RangeSlider);
