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

export default function SubCategoriesDataGrid() {

  //get order status
  const { subCategoryStore } = useStores();
  useEffect(() => {
    subCategoryStore.fetchSubCategories()
      .then(() => console.log(toJS(subCategoryStore.allSubCategories)));
  }, [subCategoryStore]);

  //get order status
  const { categoryStore } = useStores();
  useEffect(() => {
    categoryStore.fetchCategories()
      .then(() => console.log(toJS(categoryStore.allCategories)));
  }, [categoryStore]);

  //get unique category names
  let categoryNames: string[] = []
  for (let i = 0; i < categoryStore.allCategories.length; i++) {
    categoryNames.push(categoryStore.allCategories[i].code)
  }
  //uncomment
  let uniqueCategoryNames = getUniqueNames(categoryNames);
  //let uniqueCategoryNames = ["category1", "category2"]

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, editable: false, },
    { field: "name", headerName: "Name", width: 90, editable: true, },
    { field: "category", headerName: "Category", type: "singleSelect", width: 120, editable: true, valueOptions: uniqueCategoryNames, },
    { field: "description", headerName: "Description", width: 90, editable: true, },
    { field: "visible", headerName: "Visible", width: 90, editable: true, },
  ];

  let display = []
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