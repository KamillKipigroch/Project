import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useStores } from "../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const getUniqueNames = (names: string[]) => {
  let uniqueNames = names.filter((element, index) => {
    return names.indexOf(element) === index;
  });
  return uniqueNames;
}

export default function QualitiesDataGrid() {

  //get order status
  const { qualityStore } = useStores();
  useEffect(() => {
    qualityStore.fetchQualities()
      .then(() => console.log(toJS(qualityStore.allQualities)));
  }, [qualityStore]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, editable: false, },
    { field: "name", headerName: "Name", width: 90, editable: true, },
    { field: "visible", headerName: "Visible", width: 90, editable: true, },
  ];

  let display = []
  for (let i = 0; i < qualityStore.allQualities.length; i++) {
    display.push({
      id: qualityStore.allQualities[i].id,
      name: qualityStore.allQualities[i].code,
      visible: qualityStore.allQualities[i].visible,
    });
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={display}
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