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
};

const ProductTypesDataGrid = () => {
  //get order status
  const { productTypeStore } = useStores();
  useEffect(() => {
    productTypeStore.fetchProductTypes();
  }, [productTypeStore]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "visible", headerName: "Visible", width: 90, editable: true },
  ];

  let display = [];
  for (let i = 0; i < productTypeStore.allProductTypes.length; i++) {
    display.push({
      id: productTypeStore.allProductTypes[i].id,
      name: productTypeStore.allProductTypes[i].code,
      visible: productTypeStore.allProductTypes[i].visible,
    });
  }

  // let display = [
  //   {
  //     id: 1,
  //     name: "namesss",
  //     visible: true
  //   },
  //   {
  //     id: 1,
  //     name: "namesss",
  //     visible: true
  //   }
  // ]

  return (
    <Box sx={{ height: 400, width: "100%" }}>
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
};

export default observer(ProductTypesDataGrid);
