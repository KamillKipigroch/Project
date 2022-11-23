import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'visible', headerName: 'Visible', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'hero',
    headerName: 'Hero',
    width: 110,
    editable: true,
  },
  {
    field: 'productType',
    headerName: 'Product Type',
    type: 'singleSelect',
    width: 120,
    editable: true,
    //TODO
    //dynamiczne opcje wyboru - valueOptions
    valueOptions: ['EU-resident', 'junior']
  },
  {
    field: 'quality',
    headerName: 'Quality',
    type: 'singleSelect',
    width: 120,
    editable: true,
    //TODO
    //dynamiczne opcje wyboru - valueOptions
    valueOptions: ['EU-resident', 'junior']
  },
  {
    field: 'condition',
    headerName: 'Condition',
    type: 'singleSelect',
    width: 120,
    editable: true,
    //TODO
    //dynamiczne opcje wyboru - valueOptions
    valueOptions: ['EU-resident', 'junior']
  },
  {
    //TODO
    //make a button which opens image, can swithc it from your pc photo
    field: 'image',
    headerName: 'Image',
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, name: 'Spiderman costume', description: 'full bodysuit', price: 100, hero: 'big city hero' },
  { id: 1, name: 'Spiderman costume', description: 'full bodysuit', price: 100, hero: 'big city hero' },
  { id: 1, name: 'Spiderman costume', description: 'full bodysuit', price: 100, hero: 'big city hero' },
  { id: 1, name: 'Spiderman costume', description: 'full bodysuit', price: 100, hero: 'big city hero' },
  { id: 1, name: 'Spiderman costume', description: 'full bodysuit', price: 100, hero: 'big city hero' },
  { id: 1, name: 'Spiderman costume', description: 'full bodysuit', price: 100, hero: 'big city hero' },
  { id: 1, name: 'Spiderman costume', description: 'full bodysuit', price: 100, hero: 'big city hero' },
  { id: 1, name: 'Spiderman costume', description: 'full bodysuit', price: 100, hero: 'big city hero' },
];

export default function ProductsDataGrid() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}