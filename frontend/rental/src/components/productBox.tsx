import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import image from '../assets/maleficent.webp';
import { Typography } from '@mui/material';
import styled from "styled-components";

const PriceContainer = styled.div`
  display: flex,
  flex-direction: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
`

export default function BoxComponent() {
  return (
    <Box component="span" sx={{
              // backgroundImage: path(${img}),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: 260,
              height: 360,
              backgroundColor: '#c7c7c7',
              '&:hover': {
                backgroundColor: '#d97d7d',
                opacity: [0.9, 0.8, 0.7],
              },
              margin: 2,
            }}>
      <img src={image} width='250' sizes='max-'></img>
      <Typography>Maleficient</Typography>
      <PriceContainer><Typography>99.99zł</Typography></PriceContainer>
    </Box>
  );
}