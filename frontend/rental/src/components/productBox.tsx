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

type ImageDTO = {
  path: string;
  name: string;
  price: number;
}

// type ProductDTO = {
//   code: string;
//   price: number;
//   hero: string;
//   productType: IProductType;
//   images: any[];
//   condition: ICondition;
//   quality: IQuality;
// }

export default function BoxComponent({path, name, price}: ImageDTO) {
  return (
    <Box component="span" sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 260,
        height: 360,
        backgroundColor: '#DBC8AC',
        overflow: 'hidden',
        '&:hover': {
          backgroundColor: '#d97d7d',
          opacity: [0.9, 0.8, 0.7],
        },
        margin: 2,
      }}>
      <img src={path} width='250' sizes='max-' style={{width: "250px", height: "310px", objectFit: "cover"}}></img>
      <Typography>{name}</Typography>
      <PriceContainer><Typography>{price}zł</Typography></PriceContainer>
    </Box>
  );
}