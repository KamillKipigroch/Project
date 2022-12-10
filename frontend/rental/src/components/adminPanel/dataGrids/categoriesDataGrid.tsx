import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { IconButton, Tooltip } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

const CategoriesDataGrid = () => {
  //get categories
  const { categoryStore } = useStores();
  useEffect(() => {
    categoryStore.fetchCategories();
  }, [categoryStore]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", editable: false },
    { field: "visible", headerName: "Visible" },
    { field: "code", headerName: "Name", editable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            {params.row.visible ? (
              <Tooltip title="Hide" arrow={true}>
                <IconButton onClick={() => categoryStore.disableVisibility(params.row.id)}>
                  <CheckIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Make visible" arrow={true}>
                <IconButton onClick={() => {
                  let rowData = params.row;
                  rowData.visible = true;
                  categoryStore.updateCategory(rowData);
                }}>
                  <BlockIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Edit" arrow={true}>
              <IconButton onClick={() => categoryStore.openPopup(params.row.id)}>
                <EditIcon sx={{ color: "#4f70e8" }} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  let display = [];
  for (let i = 0; i < categoryStore.allCategories.length; i++) {
    display.push({
      id: categoryStore.allCategories[i].id,
      visible: categoryStore.allCategories[i].visible,
      code: categoryStore.allCategories[i].code,
    });
  }

  // let display = [
  //   {
  //     id: 1,
  //     visible: true,
  //     name: "test1"
  //   },
  //   {
  //     id: 2,
  //     visible: true,
  //     name: "test2"
  //   }
  // ]

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
      }}
    >
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

export default observer(CategoriesDataGrid);
