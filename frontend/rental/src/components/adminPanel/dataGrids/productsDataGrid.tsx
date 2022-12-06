import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import moment from "moment";

const getUniqueNames = (names: string[]) => {
  let uniqueNames = names.filter((element, index) => {
    return names.indexOf(element) === index;
  });
  return uniqueNames;
};

const ProductsDataGrid = () => {
  //get productTypes
  const { productTypeStore } = useStores();
  useEffect(() => {
    productTypeStore
      .fetchProductTypes()
      .then(() => console.log(toJS(productTypeStore.allProductTypes)));
  }, [productTypeStore]);

  //get qualities
  const { qualityStore } = useStores();
  useEffect(() => {
    qualityStore
      .fetchQualities()
      .then(() => console.log(toJS(qualityStore.allQualities)));
  }, [qualityStore]);

  //get conditions
  const { conditionStore } = useStores();
  useEffect(() => {
    conditionStore
      .fetchConditions()
      .then(() => console.log(toJS(conditionStore.allConditions)));
  }, [conditionStore]);

  //get subcategory
  const { subCategoryStore } = useStores();
  useEffect(() => {
    subCategoryStore
      .fetchSubCategories()
      .then(() => console.log(toJS(subCategoryStore.allSubCategories)));
  }, [subCategoryStore]);

  //get products
  const { productStore } = useStores();
  useEffect(() => {
    productStore
      .fetchProducts()
      .then(() => console.log(toJS(productStore.allProducts)));
  }, [productStore]);

  //get unique productType names
  let productTypeNames: string[] = [];
  for (let i = 0; i < productTypeStore.allProductTypes.length; i++) {
    productTypeNames.push(productTypeStore.allProductTypes[i].code);
  }
  //uncomment
  let uniqueProductTypeNames = getUniqueNames(productTypeNames);
  //let uniqueProductTypeNames = ["productType1", "productType2"];

  //get unique quality names
  let qualityNames: string[] = [];
  for (let i = 0; i < qualityStore.allQualities.length; i++) {
    qualityNames.push(qualityStore.allQualities[i].code);
  }
  //uncomment
  let uniqueQualityNames = getUniqueNames(qualityNames);
  //let uniqueQualityNames = ["quality1", "quality2"];

  //get unique condition names
  let conditionNames: string[] = [];
  for (let i = 0; i < conditionStore.allConditions.length; i++) {
    conditionNames.push(conditionStore.allConditions[i].code);
  }
  //uncomment
  let uniqueConditionNames = getUniqueNames(conditionNames);
  //let uniqueConditionNames = ["condition1", "condition2"];

  //get unique subcategory names
  let subcategoryNames: string[] = [];
  for (let i = 0; i < subCategoryStore.allSubCategories.length; i++) {
    subcategoryNames.push(subCategoryStore.allSubCategories[i].code);
  }

  //uncomment
  let uniqueSubcategoryNames = getUniqueNames(subcategoryNames);
  //let uniqueSubcategoryNames = ["subcategory1", "subcategory2"];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "visible", headerName: "Visible", width: 90, editable: true },
    { field: "name", headerName: "Name", width: 150, editable: true },
    {
      field: "createDate",
      headerName: "Create Date",
      width: 150,
      editable: true,
      valueFormatter: (params) => moment(params?.value).format("DD-MM-YYYY HH:MM"),
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 110,
      editable: true,
    },
    { field: "hero", headerName: "Hero", width: 110, editable: true },
    {
      field: "productType",
      headerName: "Product Type",
      type: "singleSelect",
      width: 120,
      editable: true,
      valueOptions: uniqueProductTypeNames,
    },
    {
      field: "quality",
      headerName: "Quality",
      type: "singleSelect",
      width: 120,
      editable: true,
      valueOptions: uniqueQualityNames,
    },
    {
      field: "condition",
      headerName: "Condition",
      type: "singleSelect",
      width: 120,
      editable: true,
      valueOptions: uniqueConditionNames,
    },
    {
      field: "subcategory",
      headerName: "Subcategory",
      type: "singleSelect",
      width: 120,
      editable: true,
      valueOptions: uniqueSubcategoryNames,
    },
    //TODO opinions form
    { field: "opinions", headerName: "Opinions", width: 110, editable: true },
    //TODO make a button which opens image, can swithc it from your pc photo
    { field: "image", headerName: "Image", width: 110, editable: true },
  ];

  let display = [];
  for (let i = 0; i < productStore.allProducts.length; i++) {
    display.push({
      id: productStore.allProducts[i].id,
      businessKey: productStore.allProducts[i].businessKey,
      visible: productStore.allProducts[i].visible,
      name: productStore.allProducts[i].code,
      createDate: productStore.allProducts[i].createDate,
      description: productStore.allProducts[i].description,
      price: productStore.allProducts[i].price.toFixed(2),
      hero: productStore.allProducts[i].hero,
      productType: productStore.allProducts[i].productType.code,
      quality: productStore.allProducts[i].quality.code,
      condition: productStore.allProducts[i].condition.code,
      subcategory: productStore.allProducts[i].subcategory.code,
      // TODO opinions
      opinions: "",
      image: "",
    });
  }

  // let display = [
  //   {
  //     id: 1,
  //     businessKey: 123,
  //     visible: true,
  //     name: "nametest",
  //     createDate: "12.01.2022",
  //     description: "teruyesiuhsi",
  //     price: 123,
  //     hero: "aria",
  //     productType: "productType1",
  //     quality: "quality1",
  //     condition: "condition2",
  //     subcategory: "subcategory1",
  //     opinions: '',
  //     image: ''
  //   },
  //   {
  //     id: 2,
  //     businessKey: 1223,
  //     visible: true,
  //     name: "nametest",
  //     createDate: "13.01.2022",
  //     description: "teruyesiuhsi",
  //     price: 123,
  //     hero: "fsfsfs",
  //     productType: "productType test",
  //     quality: "good",
  //     condition: "condition test",
  //     subcategory: "testetses",
  //     opinions: '',
  //     image: ''

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

export default observer(ProductsDataGrid);
