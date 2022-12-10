import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { IconButton, Tooltip } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

const StatusesDataDataGrid = () => {
  //get order status
  const { orderStatusStore } = useStores();
  useEffect(() => {
    orderStatusStore.fetchOrderStatuses();
  }, [orderStatusStore]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "name", headerName: "Name", width: 120, editable: true },
    { field: "visible", headerName: "Visible", width: 90, editable: true },
    { field: "level", headerName: "Level", width: 90, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            {params.row.visible ? (
              <Tooltip title="Hide" arrow={true}>
                <IconButton
                  onClick={() =>
                    orderStatusStore.disableVisibility(params.row.id)
                  }
                >
                  <CheckIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Make visible" arrow={true}>
                <IconButton>
                  <BlockIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Edit" arrow={true}>
              <IconButton
                onClick={() => orderStatusStore.openPopup(params.row.id)}
              >
                <EditIcon sx={{ color: "#4f70e8" }} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  let display = [];
  for (let i = 0; i < orderStatusStore.allOrderStatuses.length; i++) {
    display.push({
      id: orderStatusStore.allOrderStatuses[i].id,
      name: orderStatusStore.allOrderStatuses[i].code,
      visible: orderStatusStore.allOrderStatuses[i].visible,
      level: orderStatusStore.allOrderStatuses[i].level,
    });
  }

  // let display = [
  //   {
  //     id: 1,
  //     name: "test1",
  //     visible: true,
  //     field: "12131",
  //     level: 1
  //   },
  //   {
  //     id: 2,
  //     name: "test2",
  //     visible: true,
  //     field: "12222",
  //     level: 1
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

export default observer(StatusesDataDataGrid);
