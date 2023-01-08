import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/root.store";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateOpinionPopup from "./Popup/CreateOpinionPopup";
import { tokens } from "../../theme";
import Constants from "../../constants/Constants";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";

const UserOrdersDataGrid = () => {
  const { orderStore, opinionStore, productStore } =
    useStores();
  const { t } = useTranslation();

  useEffect(() => {
    orderStore.getUserOrders();
    productStore.fetchProducts();
    opinionStore.fetchOpinions();
  }, [orderStore, productStore, opinionStore]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef[] = [
    {
      field: "lp",
      headerName: "Lp.",
      flex: 1,
    },
    {
      field: "statusCode",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "productName",
      headerName: t("productName")!,
      flex: 1,
    },
    {
      field: "dateStart",
      headerName: t("dateStart")!,
      flex: 1,
    },
    {
      field: "dateEnd",
      headerName: t("dateEnd")!,
      flex: 1,
    },
    {
      field: "price",
      headerName: t("price")!,
      flex: 1,
    },
    {
      field: "actions",
      headerName: t("actions")!,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            {opinionStore.checkIfOpinionCanBeAdded(params.row.productID) ? (
              <Tooltip title={t("addOpinion")} arrow={true}>
                <IconButton onClick={() => opinionStore.openPopup(params.row)}>
                  <AddIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title={t("editOpinion")} arrow={true}>
                <IconButton onClick={() => opinionStore.openPopup(params.row, params.row.id)}>
                  <EditIcon sx={{ color: "#4f70e8" }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      className="list-Box"
      sx={{
        "& .--Completed": {
          bgcolor: colors.realized[100] + "!important",
          "&:hover": {
            bgcolor: colors.realized[200] + "!important",
          },
        },
      }}
    >
      <DataGrid
        getRowClassName={(params: any) => `--${params.row.statusCode}`}
        // rows={orderStore.allOrders}
        rows={orderStore.allOrders.map((order, i) => ({ lp: i + 1, ...order }))}
        loading={orderStore.loading}
        columns={columns}
        pageSize={Constants.PAGE_SIZE}
        rowsPerPageOptions={[Constants.PAGE_SIZE]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />

      <CreateOpinionPopup />
    </Box>
  );
};

export default observer(UserOrdersDataGrid);
