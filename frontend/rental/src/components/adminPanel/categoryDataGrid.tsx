import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'visible', headerName: 'Visible', width: 90 },
  { field: 'name', headerName: 'Name', width: 150, editable: true, },
  //TODO options
  { field: 'productType', headerName: 'Product Type', type: 'singleSelect', width: 120, editable: true, valueOptions: ['EU-resident', 'junior'] },
];

const rows = [
  //TODO get rows
  { id: 1, name: 'Spiderman costume', description: 'full bodysuit', price: 100, hero: 'big city hero' },
];

export default function CategoryDataGrid() {
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