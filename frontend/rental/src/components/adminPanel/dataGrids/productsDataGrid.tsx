import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import moment from "moment";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import { IconButton, Tooltip } from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Constants from "../../../constants/Constants";
import { useTranslation } from "react-i18next";

const getUniqueNames = (names: string[]) => {
  let uniqueNames = names.filter((element, index) => {
    return names.indexOf(element) === index;
  });
  return uniqueNames;
};

const ProductsDataGrid = () => {
  const { t } = useTranslation();

  //get productTypes
  const { productTypeStore } = useStores();
  useEffect(() => {
    productTypeStore.fetchProductTypes();
  }, [productTypeStore]);

  //get qualities
  const { qualityStore } = useStores();
  useEffect(() => {
    qualityStore.fetchQualities();
  }, [qualityStore]);

  //get conditions
  const { conditionStore } = useStores();
  useEffect(() => {
    conditionStore.fetchConditions();
  }, [conditionStore]);

  //get subcategory
  const { subCategoryStore } = useStores();
  useEffect(() => {
    subCategoryStore.fetchSubCategories();
  }, [subCategoryStore]);

  //get products
  const { productStore } = useStores();
  useEffect(() => {
    productStore.fetchProducts();
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
    { field: "code", headerName: t("name")!, width: 150, editable: true },
    {
      field: "createDate",
      headerName: t("createDate")!,
      width: 150,
      editable: true,
      valueFormatter: (params) =>
        moment(params?.value).format("DD-MM-YYYY HH:MM"),
    },
    {
      field: "description",
      headerName: t("description")!,
      width: 150,
      editable: true,
    },
    { field: "size", headerName: t("size")!, width: 90, editable: false },
    {
      field: "price",
      headerName: t("price")!,
      type: "number",
      width: 110,
      editable: true,
    },
    { field: "hero", headerName: t("hero")!, width: 110, editable: true },
    {
      field: "productType",
      headerName: t("productType")!,
      type: "singleSelect",
      width: 120,
      editable: true,
      valueOptions: uniqueProductTypeNames,
      valueGetter: (params) => params.row.productType.code,
    },
    {
      field: "quality",
      headerName: t("quality")!,
      type: "singleSelect",
      width: 120,
      editable: true,
      valueOptions: uniqueQualityNames,
      valueGetter: (params) => params.row.quality.code,
    },
    {
      field: "condition",
      headerName: t("condition")!,
      type: "singleSelect",
      width: 120,
      editable: true,
      valueOptions: uniqueConditionNames,
      valueGetter: (params) => params.row.condition.code,
    },
    {
      field: "subcategory",
      headerName: t("subCategory")!,
      type: "singleSelect",
      width: 120,
      editable: true,
      valueOptions: uniqueSubcategoryNames,
      valueGetter: (params) => params.row.subcategory.code,
    },
    {
      field: "actions",
      headerName: t("actions")!,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            <Tooltip title={t("edit")} arrow={true}>
              <IconButton onClick={() => productStore.openPopup(params.row.id)}>
                <EditIcon sx={{ color: "#4f70e8" }} />
              </IconButton>
            </Tooltip>
            {params.row.visible ? (
              <Tooltip title={t("hide")} arrow={true}>
                <IconButton
                  onClick={() => productStore.disableVisibility(params.row.id)}
                >
                  <CheckIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title={t("makeVisible")} arrow={true}>
                <IconButton
                  onClick={() => {
                    let rowData = params.row;
                    rowData.visible = true;
                    productStore.updateProduct(rowData);
                  }}
                >
                  <BlockIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title={t("addPhoto")} arrow={true}>
              <IconButton
                onClick={() => {
                  productStore.openPhotoPopup(params.row.id);
                }}
              >
                <AddAPhotoOutlinedIcon sx={{ color: "darkSlateBlue" }} />
              </IconButton>
            </Tooltip>
            {params.row?.images?.length === 0 ? (
              <></>
            ) : (
              <Tooltip title={t("photos")} arrow={true}>
                <IconButton
                  onClick={() => {
                    productStore.openPhotoDetailsPopup(params.row.id);
                  }}
                >
                  <PhotoCameraOutlinedIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        );
      },
    },
    //TODO opinions form
    // { field: "opinions", headerName: "Opinions", width: 110, editable: true },
    //TODO make a button which opens image, can swithc it from your pc photo
    // { field: "image", headerName: "Image", width: 110, editable: true },
  ];

  // let display = [];
  // for (let i = 0; i < productStore.allProducts.length; i++) {
  //   display.push({
  //     id: productStore.allProducts[i].id,
  //     businessKey: productStore.allProducts[i].businessKey,
  //     visible: productStore.allProducts[i].visible,
  //     name: productStore.allProducts[i].code,
  //     createDate: productStore.allProducts[i].createDate,
  //     description: productStore.allProducts[i].description,
  //     price: productStore.allProducts[i].price.toFixed(2),
  //     hero: productStore.allProducts[i].hero,
  //     productType: productStore.allProducts[i].productType.code,
  //     quality: productStore.allProducts[i].quality.code,
  //     condition: productStore.allProducts[i].condition.code,
  //     subcategory: productStore.allProducts[i].subcategory.code,
  //     // TODO opinions
  //     opinions: "",
  //     image: "",
  //   });
  // }

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
    <Box className="list-Box">
      <DataGrid
        rows={productStore.allProducts}
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

export default observer(ProductsDataGrid);
