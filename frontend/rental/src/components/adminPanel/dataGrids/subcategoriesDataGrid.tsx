import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { IconButton, Tooltip } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import Constants from "../../../constants/Constants";
import { useTranslation } from "react-i18next";
import { ISubCategory } from "../../../models/SubCategoryModel";

const getUniqueNames = (names: string[]) => {
  let uniqueNames = names.filter((element, index) => {
    return names.indexOf(element) === index;
  });
  return uniqueNames;
};

const SubCategoriesDataGrid = () => {
  //get order status
  const { subCategoryStore } = useStores();
  const { t } = useTranslation();

  useEffect(() => {
    subCategoryStore.fetchSubCategories();
  }, [subCategoryStore]);

  //get order status
  const { categoryStore } = useStores();
  useEffect(() => {
    categoryStore.fetchCategories();
  }, [categoryStore]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", editable: false, flex: 1 },
    { field: "code", headerName: t("name")!, flex: 1 },
    {
      field: "category",
      headerName: t("category")!,
      flex: 1,
    },
    {
      field: "description",
      headerName: t("description")!,
    
      flex: 10,
    },
    { field: "visible", headerName: t("visibility")!, flex: 1 },
    {
      field: "actions",
      headerName: t("actions")!,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            {params.row.visible ? (
              <Tooltip title={t("hide")} arrow={true}>
                <IconButton
                  onClick={() => subCategoryStore.disableVisibility(params.row.id)}
                >
                  <CheckIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title={t("makeVisible")} arrow={true}>
                <IconButton onClick={() => {
                  let rowData = params.row;
                  rowData.visible = true;
                  subCategoryStore.updateSubCategory(rowData);
                }}>
                  <BlockIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title={t("edit")} arrow={true}>
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
      code: subCategoryStore.allSubCategories[i].code,
      category: subCategoryStore.allSubCategories[i].category.code,
      description: subCategoryStore.allSubCategories[i].description,
      visible: subCategoryStore.allSubCategories[i].visible,
    });
  }

  return (
    <Box className="list-Box">
      <DataGrid
        rows={display}
        columns={columns}
        pageSize={Constants.PAGE_SIZE}
        rowsPerPageOptions={[Constants.PAGE_SIZE]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default observer(SubCategoriesDataGrid);
