import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const getUniqueNames = (names: string[]) => {
  let uniqueNames = names.filter((element, index) => {
    return names.indexOf(element) === index;
  });
  return uniqueNames;
}

const ConditionsDataGrid = () => {

  //get conditions
  const { conditionStore } = useStores();
  useEffect(() => {
    conditionStore.fetchConditions()
      .then(() => console.log(toJS(conditionStore.allConditions)));
  }, [conditionStore]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, editable: false, },
    { field: 'price', headerName: 'Price', width: 90, editable: true, },
    { field: 'visible', headerName: 'Visible', width: 90, editable: true, },
    { field: 'name', headerName: 'Name', width: 150, editable: true, },
  ];

  let display = []
  for (let i = 0; i < conditionStore.allConditions.length; i++) {
    display.push({
      id: conditionStore.allConditions[i].id,
      price: conditionStore.allConditions[i].price,
      visible: conditionStore.allConditions[i].visible,
      name: conditionStore.allConditions[i].code,
    });
  }

  // let display = [
  //   {
  //     id: 1,
  //     price: 100,
  //     visible: true,
  //     name: "test1"
  //   },
  //   {
  //     id: 2,
  //     price: 100,
  //     visible: true,
  //     name: "test2"
  //   }
  // ]

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

export default observer(ConditionsDataGrid);