import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores/root.store';

const theme = createTheme({
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
  const { productStore } = useStores();

  return (
    <Box sx={{ width: 200 }}>
        <ThemeProvider theme={theme}>
            <Slider
                min={productStore.priceMin}
                max={productStore.maxPriceValue}
                getAriaLabel={() => 'Temperature range'}
                value={productStore.priceValue}
                onChange={productStore.handlePriceRangeFilterChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                color="secondary"
            />
        </ThemeProvider>
    </Box>
  );
}

export default observer(RangeSlider);