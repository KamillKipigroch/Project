import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="category" control={<Radio />} label="Category" />
        <FormControlLabel value="condition" control={<Radio />} label="Condition" />
        <FormControlLabel value="orderStatus" control={<Radio />} label="OrderStatus" />
        <FormControlLabel value="product" control={<Radio />} label="Product" />
        <FormControlLabel value="productType" control={<Radio />} label="ProductType" />
        <FormControlLabel value="quality" control={<Radio />} label="Quality" />
        <FormControlLabel value="subcategory" control={<Radio />} label="Subcategory" />
      </RadioGroup>
    </FormControl>
  );
}