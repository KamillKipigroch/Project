import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Constants from "../../../constants/Constants";

const OpinionsDataGrid = () => {
  const { opinionStore } = useStores();
  useEffect(() => {
    opinionStore.fetchOpinions();
  }, [opinionStore]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    {
      field: "productName",
      headerName: "ProductName",
      width: 90,
      editable: true,
    },
    { field: "value", headerName: "Value", width: 90, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 90,
      editable: true,
    },
    //TODO obrazki
    {
      field: "opinionImages",
      headerName: "OpinionImages",
      width: 90,
      editable: true,
    },
    { field: "productID", headerName: "ProductID", width: 90, editable: true },
    { field: "userEmail", headerName: "UserEmail", width: 150, editable: true },
  ];

  return (
    <Box className="list-Box">
      <DataGrid
        rows={opinionStore.allOpinions}
        columns={columns}
        pageSize={Constants.PAGE_SIZE}
        rowsPerPageOptions={[Constants.PAGE_SIZE]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}

export default observer(OpinionsDataGrid);