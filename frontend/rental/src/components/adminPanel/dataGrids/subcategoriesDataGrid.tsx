import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { IconButton, Tooltip } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

const getUniqueNames = (names: string[]) => {
  let uniqueNames = names.filter((element, index) => {
    return names.indexOf(element) === index;
  });
  return uniqueNames;
};

const SubCategoriesDataGrid = () => {
  //get order status
  const { subCategoryStore } = useStores();
  useEffect(() => {
    subCategoryStore.fetchSubCategories();
  }, [subCategoryStore]);

  //get order status
  const { categoryStore } = useStores();
  useEffect(() => {
    categoryStore.fetchCategories();
  }, [categoryStore]);

  //get unique category names
  let categoryNames: string[] = [];
  for (let i = 0; i < categoryStore.allCategories.length; i++) {
    categoryNames.push(categoryStore.allCategories[i].code);
  }
  //uncomment
  let uniqueCategoryNames = getUniqueNames(categoryNames);
  //let uniqueCategoryNames = ["category1", "category2"]

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", editable: false, flex: 1 },
    { field: "name", headerName: "Name", editable: true, flex: 1 },
    {
      field: "category",
      headerName: "Category",
      type: "singleSelect",
      flex: 1,
      editable: true,
      valueOptions: uniqueCategoryNames,
    },
    {
      field: "description",
      headerName: "Description",
      editable: true,
      flex: 10,
    },
    { field: "visible", headerName: "Visible", editable: true, flex: 1 },
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
                  onClick={() => subCategoryStore.disableVisibility(params.row.id)}
                >
                  <CheckIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Make visible" arrow={true}>
                <IconButton onClick={() => {
                  let rowData = params.row;
                  rowData.visible = true;
                  subCategoryStore.updateSubCategory(rowData);
                }}>
                  <BlockIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Edit" arrow={true}>
              <IconButton
                onClick={() => subCategoryStore.openPopup(params.row.id)}
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
  for (let i = 0; i < subCategoryStore.allSubCategories.length; i++) {
    display.push({
      id: subCategoryStore.allSubCategories[i].id,
      name: subCategoryStore.allSubCategories[i].code,
      category: subCategoryStore.allSubCategories[i].category.code,
      description: subCategoryStore.allSubCategories[i].description,
      visible: subCategoryStore.allSubCategories[i].visible,
    });
  }

  // let display = [
  //   {
  //     id: 1,
  //     name: "213131",
  //     category: "category1",
  //     description: "dadsdadas",
  //     visible: true
  //   },
  //   {
  //     id: 2,
  //     name: "222222131",
  //     category: "category2",
  //     description: "dadsdadas",
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

export default observer(SubCategoriesDataGrid);
