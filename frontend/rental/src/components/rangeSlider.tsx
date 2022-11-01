import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([0, 500]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: 200 }}>
        <ThemeProvider theme={theme}>
            <Slider
                min={0}
                max={500}
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                color="secondary"
            />
        </ThemeProvider>
    </Box>
  );
}
