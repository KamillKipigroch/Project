import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { IconButton, Tooltip } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from '@mui/icons-material/Check';

const getUniqueNames = (names: string[]) => {
  let uniqueNames = names.filter((element, index) => {
    return names.indexOf(element) === index;
  });
  return uniqueNames;
};

const QualitiesDataGrid = () => {
  //get order status
  const { qualityStore } = useStores();
  useEffect(() => {
    qualityStore.fetchQualities();
  }, [qualityStore]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "name", headerName: "Name", width: 90, editable: true },
    { field: "visible", headerName: "Visible", width: 90, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row: { id, visible } }) => {
        return (
          <Box>
            {visible ? (
              <Tooltip title="Hide" arrow={true}>
                <IconButton onClick={() => qualityStore.disableVisibility(id)}>
                  <CheckIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Make visible" arrow={true}>
                <IconButton >
                  <BlockIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        );
      },
    },
  ];

  let display = [];
  for (let i = 0; i < qualityStore.allQualities.length; i++) {
    display.push({
      id: qualityStore.allQualities[i].id,
      name: qualityStore.allQualities[i].code,
      visible: qualityStore.allQualities[i].visible,
    });
  }

  // let display = [
  //   {
  //     id: 1,
  //     name: "sdadasd",
  //     visible: true
  //   },
  //   {
  //     id: 1,
  //     name: "sdadasd",
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

export default observer(QualitiesDataGrid);
