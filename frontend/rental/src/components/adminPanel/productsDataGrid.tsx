import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useStores } from "../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { EMPTY_ARRAY } from "mobx/dist/internal";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "visible", headerName: "Visible", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
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
  {
    field: "hero",
    headerName: "Hero",
    width: 110,
    editable: true,
  },
  {
    field: "productType",
    headerName: "Product Type",
    type: "singleSelect",
    width: 120,
    editable: true,
    //TODO
    //dynamiczne opcje wyboru - valueOptions
    valueOptions: ["Costumes", "junior"],
  },
  {
    field: "quality",
    headerName: "Quality",
    type: "singleSelect",
    width: 120,
    editable: true,
    //TODO
    //dynamiczne opcje wyboru - valueOptions
    valueOptions: ["Costumes", "junior"],
  },
  {
    field: "condition",
    headerName: "Condition",
    type: "singleSelect",
    width: 120,
    editable: true,
    //TODO
    //dynamiczne opcje wyboru - valueOptions
    valueOptions: ["Costumes", "junior"],
  },
  {
    //TODO
    //make a button which opens image, can swithc it from your pc photo
    field: "image",
    headerName: "Image",
    width: 110,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    name: "Spiderman costume",
    description: "full bodysuit",
    price: 100,
    hero: "big city hero",
  },
];

const ProductsDataGrid = () => {
  const { productStore } = useStores();
  const { productTypeStore } = useStores();

  useEffect(() => {
    productTypeStore.fetchProductTypes()
      .then(() => console.log(toJS(productTypeStore.allProductTypes)));
  }, [productTypeStore]);

  
  useEffect(() => {
    productStore.fetchProducts()
      .then(() => console.log(toJS(productStore.allProducts)));
  }, [productStore]);

  let productTypeNames = []
  for (let i = 0; i < productTypeStore.allProductTypes.length; i++) {
    

  }

  let displayProducts = []
  for (let i = 0; i < productStore.allProducts.length; i++) {
    displayProducts.push({
      id: i,
      visible: productStore.allProducts[i].visible,
      name: productStore.allProducts[i].code,
      description: productStore.allProducts[i].description,
      price: productStore.allProducts[i].price.toFixed(2),
      hero: productStore.allProducts[i].hero,
      productType: productStore.allProducts[i].productType.code,
      quality:  productStore.allProducts[i].quality.code,
      condition: productStore.allProducts[i].condition.code,
      image: EMPTY_ARRAY,
    });
  }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={displayProducts}
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

export default observer(ProductsDataGrid);
